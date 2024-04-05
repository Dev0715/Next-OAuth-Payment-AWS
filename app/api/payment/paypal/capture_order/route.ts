import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

type Params = {
  order_id?: string;
};

export const POST = async (req: Request) => {
  const order_id = await req.json();

  if (!order_id) {
    return NextResponse.json(
      { success: false, message: "Please provide order ID" },
      { status: 400 }
    );
  }

  console.log("________HERE__________11", order_id);

  const orderId = order_id;
  const PaypalClient = client();
  const request = new paypal.orders.OrdersCaptureRequest(orderId);

  console.log("________HERE__________22", order_id);

  request.requestBody({}); // typescript issue

  console.log("________HERE__________33", order_id);

  const response = await PaypalClient.execute(request);

  console.log("________HERE__________44", order_id);

  if (!response) {
    return NextResponse.json(
      { success: false, message: "Some Error occured" },
      { status: 500 }
    );
  }

  // Your custom code to update order status

  return NextResponse.json({ success: true });
};
