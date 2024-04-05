"use server";

import stripe from "@/lib/stripe";

type OrderType = {
  paymentId: string;
};

export const captureOrder = async (params: OrderType) => {
  try {
    let payment = await stripe.checkout.sessions.retrieve(params.paymentId);

    let lineItems = await stripe.checkout.sessions.listLineItems(
      params.paymentId,
      {
        limit: 1
      }
    );
    let transaction = await stripe.paymentIntents.retrieve(
      payment.payment_intent as string
    );

    // Doing something related to the transaction

    return {
      success: true,
      payment
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};
