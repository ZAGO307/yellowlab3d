import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { form, files, total, subtotal, deliveryPrice } = body;

    if (!form || total === undefined) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `Impression 3D — ${form.technology.toUpperCase()}`,
            description: `Matériau: ${form.material} | Remplissage: ${form.infill} | Qté: ${form.quantity} | Poids estimé: ${form.weight}g${files?.length ? ` | Fichiers: ${files.join(", ")}` : ""}`,
            metadata: {
              technology: form.technology,
              material: form.material,
              infill: form.infill,
              quantity: String(form.quantity),
              weight: String(form.weight),
            },
          },
          unit_amount: Math.round(subtotal * 100),
        },
        quantity: 1,
      },
    ];

    if (deliveryPrice > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Livraison",
            description: form.delivery === "express" ? "Chronopost Express 24h" : "Colissimo Standard 48-72h",
          },
          unit_amount: Math.round(deliveryPrice * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order`,
      customer_email: form.email,
      metadata: {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone || "",
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
        notes: form.notes || "",
        addons: form.addons.join(","),
        files: files?.join(",") || "",
      },
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "CA"],
      },
      invoice_creation: {
        enabled: true,
      },
      locale: "fr",
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: unknown) {
    console.error("Stripe error:", err);
    const message = err instanceof Error ? err.message : "Erreur interne";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
