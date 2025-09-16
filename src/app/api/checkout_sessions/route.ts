import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { user_id } = await req.json();
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "One-time Payment Example",
            },
            unit_amount: 10000,
          },
          quantity: 1,
        },
      ],
      metadata: { user_id },
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/login`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/login`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
