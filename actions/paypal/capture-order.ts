"use server";

import paypalClient from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

type OrderType = {
  paymentId: string;
};

export const captureOrder = async (params: OrderType) => {
  try {
    const PaypalClient = paypalClient();
    const request = new paypal.orders.OrdersCaptureRequest(params.paymentId);
    request.requestBody({}); // typescript issue
    const response = await PaypalClient.execute(request);

    // Doing something related to the transaction

    return {
      success: true,
      response
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};
