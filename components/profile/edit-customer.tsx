"use client";

import { FaCcStripe, FaPaypal } from "react-icons/fa";

import { GradientButton } from "../utils/gradient-button";
import { GradientParagraph } from "../utils/gradient-paragraph";

export default function EditCustomer({
  disabled = false
}: {
  disabled?: boolean;
}) {
  return (
    <main className="w-full flex justify-between gap-x-6">
      <div className="w-2/5 flex flex-col gap-y-6 font-firs">
        <GradientParagraph className="text-xl font-medium">
          For First CUSTOMERs!
        </GradientParagraph>
        <div>
          <p>
            Be the earliest users to get the latest updates and news from us!
          </p>
          <p>
            Early subscribers will get exclusive access to our new features and
            various benefits.
          </p>
          <p>We will also give a number of bonuses like $10 off.</p>
          <p>
            You will have free Launch Package that will have a bundle of free
            fonts, images, ...
          </p>
          <p>
            Join the Discord and follow notifications and news on our channel
          </p>
        </div>
        <GradientParagraph className="text-xl font-medium">
          SUBSCRIBE NOW!
        </GradientParagraph>
        <div className="w-3/4 flex flex-col gap-y-6">
          <GradientButton
            variant="outline"
            disabled={disabled}
            className="flex gap-x-2 border-green-700"
          >
            <FaPaypal />
            Subscribe with Paypal
          </GradientButton>
          <GradientButton
            variant="outline"
            disabled={disabled}
            className="flex gap-x-2 border-blue-700"
          >
            <FaCcStripe />
            Subscribe with Stripe
          </GradientButton>
        </div>
      </div>
    </main>
  );
}
