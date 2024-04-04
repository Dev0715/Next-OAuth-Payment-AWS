"use server";

import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export const createOrder = async () => {
  try {
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (100).toFixed(2) // order_price
          }
        }
      ]
    });
    const response = await PaypalClient.execute(request);

    if (response.statusCode !== 201) {
      return { success: false };
    }

    // Some code related to saving the order in the database

    return { success: true, result: response.result };
  } catch (error) {
    return { success: false };
  }
};
