import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.NEXT_PAYMENT_SECRET_KEY);

export const POST = async (request: Request) => {
  try {
    const { price } = await request.json();

    console.log(price);

    const amount = parseInt(price * 100 + "");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,

      currency: "usd",

      payment_method_types: ["card"]
    });

    console.log(paymentIntent);

    // Correct the response format

    return NextResponse.json(
      { secret: paymentIntent.client_secret },

      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing payment intent:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
