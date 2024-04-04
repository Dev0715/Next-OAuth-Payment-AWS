import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: NextRequest) => {
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "pr_1234",
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${req.nextUrl.basePath}/?success=true`,
      cancel_url: `${req.nextUrl.basePath}/?canceled=true`
    });
    return NextResponse.redirect(session.url, { status: 303 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
