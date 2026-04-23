import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function sendEmails(session: Stripe.Checkout.Session) {
  if (!process.env.SMTP_HOST) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const m = session.metadata || {};
  const orderNum = session.id.slice(-8).toUpperCase();
  const total = ((session.amount_total || 0) / 100).toFixed(2);

  const fileUrls: string[] = m.fileUrls ? m.fileUrls.split(",").filter(Boolean) : [];
  const fileNames: string[] = m.fileNames ? m.fileNames.split(",").filter(Boolean) : [];

  const filesHtml = fileUrls.length > 0
    ? fileUrls.map((url, i) => `<a href="${url}" style="display:block;color:#FFD600;margin:4px 0;font-size:13px;">📎 ${fileNames[i] || "Fichier " + (i + 1)}</a>`).join("")
    : "<p style='color:#888;font-size:13px;'>Aucun fichier uploadé</p>";

  const row = (label: string, value: string) =>
    `<tr><td style="color:#888;font-size:12px;padding:6px 0;border-bottom:1px solid #222;text-transform:uppercase;width:140px;">${label}</td><td style="color:#fff;font-size:13px;padding:6px 0;border-bottom:1px solid #222;">${value}</td></tr>`;

  const detailsHtml = `
    <table style="width:100%;border-collapse:collapse;">
      ${row("Numéro", "#" + orderNum)}
      ${row("Client", m.firstName + " " + m.lastName)}
      ${row("Email", session.customer_email || "—")}
      ${row("Téléphone", m.phone || "—")}
      ${row("Adresse", m.address + ", " + m.postalCode + " " + m.city + ", " + m.country)}
      ${row("Technologie", m.technology)}
      ${row("Matériau", m.material)}
      ${row("Remplissage", m.infill)}
      ${row("Quantité", m.quantity)}
      ${row("Poids estimé", m.weight + " g")}
      ${row("Livraison", m.delivery)}
      ${m.notes ? row("Notes", m.notes) : ""}
      <tr><td style="color:#FFD600;font-size:14px;padding:10px 0;font-weight:bold;text-transform:uppercase;">Total payé</td><td style="color:#FFD600;font-size:18px;padding:10px 0;font-weight:bold;">${total} CHF</td></tr>
    </table>
  `;

  // Email au studio
  await transporter.sendMail({
    from: `"YellowLAB3D System" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER!,
    subject: `🔔 Nouvelle commande #${orderNum} — ${total} CHF — ${m.firstName} ${m.lastName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto;background:#0a0a0a;color:#f5f5f0;padding:40px;">
        <div style="background:#FFD600;padding:16px 20px;margin-bottom:30px;">
          <h1 style="color:#0a0a0a;margin:0;font-size:22px;text-transform:uppercase;letter-spacing:2px;">YellowLAB3D — Nouvelle commande</h1>
        </div>
        <h2 style="color:#FFD600;text-transform:uppercase;letter-spacing:1px;margin-top:0;">Commande #${orderNum}</h2>
        ${detailsHtml}
        <div style="border:1px solid #333;padding:16px;margin-top:24px;background:#111;">
          <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;">Fichiers 3D à imprimer</p>
          ${filesHtml}
        </div>
        <div style="margin-top:20px;padding:12px;background:#111;border-left:3px solid #FFD600;">
          <p style="color:#888;font-size:11px;margin:0;">Session Stripe : ${session.id}</p>
        </div>
      </div>
    `,
  });

  // Email au client
  if (session.customer_email) {
    await transporter.sendMail({
      from: `"YellowLAB3D" <${process.env.SMTP_USER}>`,
      to: session.customer_email,
      subject: `✅ Commande confirmée #${orderNum} — YellowLAB3D`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5f5f0;padding:40px;">
          <div style="background:#FFD600;padding:20px;margin-bottom:30px;">
            <h1 style="color:#0a0a0a;margin:0;font-size:28px;text-transform:uppercase;letter-spacing:2px;">YellowLAB3D</h1>
            <p style="color:#0a0a0a;margin:5px 0 0;font-size:14px;">Commande confirmée</p>
          </div>
          <h2 style="color:#FFD600;text-transform:uppercase;letter-spacing:1px;">Merci ${m.firstName} !</h2>
          <p style="color:#aaa;line-height:1.6;">Votre commande a bien été reçue et le paiement validé. Notre équipe va analyser votre fichier et démarrer l'impression dans les plus brefs délais.</p>
          ${detailsHtml}
          <p style="color:#888;font-size:12px;margin-top:24px;">Une question ? <a href="mailto:contactyellowlab3d@gmail.com" style="color:#FFD600;">contactyellowlab3d@gmail.com</a> · <a href="tel:+41794603165" style="color:#FFD600;">+41 79 460 31 65</a></p>
          <div style="border-top:1px solid #222;margin-top:30px;padding-top:20px;text-align:center;">
            <p style="color:#444;font-size:11px;">© ${new Date().getFullYear()} YellowLAB3D · Genève, Suisse</p>
          </div>
        </div>
      `,
    });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try { await sendEmails(session); } catch (e) { console.error("Email error:", e); }
  }

  return NextResponse.json({ received: true });
}
