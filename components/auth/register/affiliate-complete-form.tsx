"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";

type Props = {
  pending: boolean;
  step: number;
  onContinue: () => void;
  onBack: () => void;
};

export const AffiliateCompleteForm = ({
  pending,
  step,
  onContinue,
  onBack
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  return (
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={isConfirmOpen}
        title="Error"
        message={confirmMessage}
        onOK={() => setConfirmOpen(false)}
      />
      <p className="text-xl text-green-700">
        {step + 1}. Complete registration for an affiliate.
      </p>
      <div className="flex flex-col">
        <p>Congratulations!</p>
        <p className="text-base text-gray-500">
          You are ready to participate as an affiliate!
        </p>
      </div>
      <p>** You will be notified on the date of the site launch.</p>
      <p>
        ** Affiliates have multiple opportunities to earn commissions: We will
        be tracking Affiliate Sales (or their contribution to sales) for
        everyone who signs up for a Subscription, For every product or bundle
        that they plugged, and also tagging statistics for everyone that they
        referred (but no purchases were made).
      </p>
      <p>
        ** We intend for this affiliate program to be one of the most complete
        and complex programs available (almost on the order of the Affiliate WP
        Plugin), and therefore, we want to make sure we are tracking. At the
        start of signup, they will only be able to set up a general affiliate
        reference link, but later (when the site is live), they will be able to
        establish individual product links.
      </p>
      <div className="w-full flex items-center justify-between mt-4">
        <Button
          disabled={pending}
          variant={"outline"}
          className="w-64 flex gap-x-4 border-red-700"
          onClick={onBack}
        >
          <FaArrowLeft />
          Back
        </Button>
        <Button
          disabled={pending}
          className="w-64 flex gap-x-4"
          onClick={onContinue}
        >
          <FaUser />
          Complete
        </Button>
      </div>
    </div>
  );
};
