"use server";

import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export const captureOrder = async (order_id: string) => {
  try {
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCaptureRequest(order_id);
    request.requestBody({}); // typescript issue
    const response = await PaypalClient.execute(request);
  } catch (error) {}
};
