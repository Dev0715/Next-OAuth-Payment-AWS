import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

type Params = {
  order_id?: string;
};

export const POST = async (req: Request, context: { params: Params }) => {
  if (!context.params.order_id) {
    return NextResponse.json(
      { success: false, message: "Please provide order ID" },
      { status: 400 }
    );
  }

  const orderId = context.params.order_id;
  const PaypalClient = client();
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({}); // typescript issue
  const response = await PaypalClient.execute(request);
  if (!response) {
    return NextResponse.json(
      { success: false, message: "Some Error occured" },
      { status: 500 }
    );
  }

  // Your custom code to update order status

  return NextResponse.json({ success: true });
};
