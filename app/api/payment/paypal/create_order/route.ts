import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

type Params = {
  order_price?: string;
  user_id?: string;
};

export const POST = async (req: Request, context: { params: Params }) => {
  if (!context.params.order_price || !context.params.user_id) {
    return NextResponse.json({
      success: false,
      message: "Please provide order_price and user ID"
    });
  }

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
            value: context.params.order_price
          }
        }
      ]
    });
    const response = await PaypalClient.execute(request);

    if (response.statusCode !== 201) {
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // Some code related to saving the order in the database

    return NextResponse.json(
      { success: true, orderID: response.result.id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
