import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    // If SMTP is configured, send email
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"YellowLAB3D Contact" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: email,
        subject: `📨 Contact: ${subject || "Sans sujet"} — ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #FFD600;">Nouveau message de contact</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Sujet :</strong> ${subject || "Non précisé"}</p>
            <hr style="border-color: #333; margin: 20px 0;" />
            <p style="white-space: pre-wrap; color: #333;">${message}</p>
          </div>
        `,
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from: `"YellowLAB3D" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "✅ Votre message a bien été reçu — YellowLAB3D",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; background: #0a0a0a; color: #f5f5f0; padding: 40px;">
            <div style="background: #FFD600; padding: 20px; margin-bottom: 30px;">
              <h1 style="color: #0a0a0a; margin: 0; font-size: 24px; text-transform: uppercase;">YellowLAB3D</h1>
            </div>
            <h2 style="color: #FFD600;">Merci ${name} !</h2>
            <p style="color: #aaa;">Nous avons bien reçu votre message et vous répondrons dans les 2h ouvrées.</p>
            <div style="border: 1px solid #222; padding: 15px; margin: 20px 0; color: #888; font-size: 13px;">
              <strong style="color: #FFD600;">Votre message :</strong><br/><br/>
              ${message}
            </div>
            <p style="color: #888; font-size: 12px;">
              © ${new Date().getFullYear()} YellowLAB3D · <a href="mailto:contact@yellowlab3d.fr" style="color: #FFD600;">contact@yellowlab3d.fr</a>
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}
