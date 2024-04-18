"use server";

import paypalClient from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

type OrderType = {
  redirectUrl: string;
  amount: number;
};

export const createOrder = async (params: OrderType) => {
  try {
    const PaypalClient = paypalClient();
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: params.amount.toFixed(2) // order_price
          }
        }
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}${params.redirectUrl}?gateway=paypal&history_id=history_id`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}${params.redirectUrl}?gateway=cancelled`
      }
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
