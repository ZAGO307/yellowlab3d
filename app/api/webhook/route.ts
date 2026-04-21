import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function sendConfirmationEmail(session: Stripe.Checkout.Session) {
  if (!process.env.SMTP_HOST || !session.customer_email) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const { firstName, lastName, notes } = session.metadata || {};

  await transporter.sendMail({
    from: `"YellowLAB3D" <${process.env.SMTP_USER}>`,
    to: session.customer_email,
    subject: `✅ Commande confirmée — YellowLAB3D #${session.id.slice(-8).toUpperCase()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f0; padding: 40px;">
        <div style="background: #FFD600; padding: 20px; margin-bottom: 30px;">
          <h1 style="color: #0a0a0a; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">YellowLAB3D</h1>
          <p style="color: #0a0a0a; margin: 5px 0 0; font-size: 14px;">Commande confirmée</p>
        </div>
        <h2 style="color: #FFD600; text-transform: uppercase; letter-spacing: 1px;">Merci ${firstName || ""} !</h2>
        <p style="color: #aaa; line-height: 1.6;">Votre commande a bien été reçue et le paiement validé. Notre équipe va analyser votre fichier et démarrer l'impression dans les plus brefs délais.</p>
        <div style="border: 1px solid #222; padding: 20px; margin: 20px 0;">
          <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Détails de la commande</p>
          <p style="color: #fff; margin: 5px 0;"><strong>Numéro :</strong> #${session.id.slice(-8).toUpperCase()}</p>
          <p style="color: #fff; margin: 5px 0;"><strong>Montant :</strong> ${((session.amount_total || 0) / 100).toFixed(2)} €</p>
          ${notes ? `<p style="color: #fff; margin: 5px 0;"><strong>Notes :</strong> ${notes}</p>` : ""}
        </div>
        <p style="color: #888; font-size: 12px;">Vous recevrez un email de suivi une fois votre colis expédié. En cas de question : <a href="mailto:contact@yellowlab3d.fr" style="color: #FFD600;">contact@yellowlab3d.fr</a></p>
        <div style="border-top: 1px solid #222; margin-top: 30px; padding-top: 20px; text-align: center;">
          <p style="color: #444; font-size: 11px;">© ${new Date().getFullYear()} YellowLAB3D · 12 Rue de la Fabrication, 75011 Paris</p>
        </div>
      </div>
    `,
  });

  // Also notify the studio
  await transporter.sendMail({
    from: `"YellowLAB3D System" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER!,
    subject: `🔔 Nouvelle commande #${session.id.slice(-8).toUpperCase()} — ${((session.amount_total || 0) / 100).toFixed(2)} €`,
    html: `
      <h2>Nouvelle commande reçue</h2>
      <p><strong>Client :</strong> ${firstName} ${lastName} (${session.customer_email})</p>
      <p><strong>Montant :</strong> ${((session.amount_total || 0) / 100).toFixed(2)} €</p>
      <p><strong>Session Stripe :</strong> ${session.id}</p>
      <pre>${JSON.stringify(session.metadata, null, 2)}</pre>
    `,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(`✅ Payment completed: ${session.id} — ${session.customer_email}`);
    try {
      await sendConfirmationEmail(session);
    } catch (e) {
      console.error("Email error:", e);
    }
  }

  return NextResponse.json({ received: true });
}
