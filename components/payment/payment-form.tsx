import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { MdCancel } from "react-icons/md";
import { AiFillCreditCard } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { useState, useTransition } from "react";
import { createOrder as createPaypalOrder } from "@/actions/paypal/create-order";
import { usePathname } from "next/navigation";
import { createOrder as createStripeOrder } from "@/actions/stripe/create-order";
import { useAtom } from "jotai";
import { orderListAtom } from "@/store/orderList";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getLinkFromS3 } from "@/actions/s3/link-from-s3";

export const PaymentForm = ({ onCancel }: { onCancel: () => void }) => {
  const Option_Paypal = "option-paypal";
  const Option_Stripe = "option-stripe";

  const currentPath = usePathname();
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();
  const [paymentMethod, setPaymentMethod] = useState(Option_Paypal);
  const [orderList] = useAtom(orderListAtom);

  const getTotalPrice = () => {
    return orderList.reduce((total, product) => total + product.price, 0);
  };

  const onPurchase = async () => {
    startTransition(async () => {
      // # CHECK FIRST
      // # Whether this product is already purchased

      if (paymentMethod === Option_Paypal) {
        const createdResponse = await createPaypalOrder({
          redirectUrl: currentPath,
          amount: getTotalPrice()
        });
        if (createdResponse.success) {
          window.location.href = createdResponse.result.links[1].href;
        }
      } else {
        const product = orderList[0];
        const res = await getLinkFromS3(product.previewList[0]);
        const imageLink = res.success ? res.response : "";

        const response = await createStripeOrder({
          redirectUrl: currentPath,
          userEmail: user?.email as string,
          product: {
            name: orderList.length === 1 ? product.title : "Products",
            description:
              orderList.length === 1 ? product.description : "Muiple products",
            images: [imageLink as string]
          },
          amount: getTotalPrice()
        });
        if (response.success) {
          window.location.href = response.payment?.url ?? "";
        }
      }
    });
  };

  return (
    <Card className="w-[480px]">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Select the payment method you prefer</CardDescription>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-y-6">
        <RadioGroup
          defaultValue={Option_Paypal}
          onValueChange={setPaymentMethod}
          className="w-full flex justify-between"
        >
          <div className="flex items-center gap-x-4 cursor-pointer">
            <RadioGroupItem value={Option_Stripe} id={Option_Stripe} />
            <Label
              htmlFor={Option_Stripe}
              className="flex items-center gap-x-4 text-5xl cursor-pointer"
            >
              <FaCcVisa className="text-emerald-700" />
              <FaCcMastercard className="text-emerald-700" />
              <p className="text-lg">Stripe</p>
            </Label>
          </div>
          <div className="flex items-center gap-x-4 cursor-pointer">
            <RadioGroupItem value={Option_Paypal} id={Option_Paypal} />
            <Label
              htmlFor={Option_Paypal}
              className="flex items-center gap-x-4 text-5xl cursor-pointer"
            >
              <FaCcPaypal className="text-sky-700" />
              <p className="text-lg">Paypal</p>
            </Label>
          </div>
        </RadioGroup>
        <Table className="w-full flex flex-col">
          {/* <TableCaption>Table Name</TableCaption> */}
          <TableHeader className="w-full">
            <TableRow className="w-full flex">
              <TableHead className="w-1/4">Product Title</TableHead>
              <TableHead className="w-7/12">Product Description</TableHead>
              <TableHead className="w-1/6 text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {orderList.map((product) => (
              <TableRow className="w-full flex">
                <TableCell className="w-1/4 truncate font-medium">
                  {product.title}
                </TableCell>
                <TableCell className="w-7/12 truncate">
                  {product.description}sdafsadfdsafsdafdsaf
                </TableCell>
                <TableCell className="w-1/6 truncate text-right">
                  ${product.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="w-full">
            <TableRow className="w-full flex">
              <TableCell className="w-5/6" colSpan={2}>
                Total
              </TableCell>
              <TableCell className="w-1/6 text-right">
                ${getTotalPrice()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="w-full flex justify-between">
          <Button
            disabled={isPending}
            onClick={onCancel}
            variant="destructive"
            className="flex gap-x-2"
          >
            <MdCancel /> Cancel {/** Not Working Now */}
          </Button>
          <Button
            className="flex gap-x-2"
            disabled={isPending}
            onClick={onPurchase}
          >
            <AiFillCreditCard />
            Purchase
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
