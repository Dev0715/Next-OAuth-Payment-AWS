"use client";

import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { SignedUpData, User } from "@/shared/types-user";
import { v4 as uuidv4 } from "uuid";
import { register } from "@/actions/auth/register/register";

type Props = {
  step: number;
  userData: SignedUpData;
  setUserData: Dispatch<SetStateAction<SignedUpData>>;
  moveStepForward: () => void;
  moveStepBackward: () => void;
};

export const AffiliateCompleteForm = ({
  step,
  userData,
  setUserData,
  moveStepForward,
  moveStepBackward
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmTitle, setConfirmTitle] = useState<string>("");
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const onContinue = () => {
    if (userData.selectedAccounts.creator || userData.selectedAccounts.user) {
      setConfirmOpen(true);
      setConfirmTitle("Success");
      setConfirmMessage("A new affiliate was newly registerd!");
      moveStepForward();
    } else {
      startTransition(() => {
        const user: User = {
          userId: userData.generalDetails.username,
          username: userData.generalDetails.username,
          email: userData.generalDetails.email,
          password: userData.generalDetails.password,
          firstname: userData.generalDetails.firstname,
          lastname: userData.generalDetails.lastname,
          phone1: userData.generalDetails.phone1,
          phone2: userData.generalDetails.phone2,
          address: {
            address1: userData.generalDetails.address1,
            address2: userData.generalDetails.address2,
            city: userData.generalDetails.city,
            postal: userData.generalDetails.postal,
            country: userData.generalDetails.country
          },

          affiliate: {
            isAffiliate: true,
            affiliateId: uuidv4()
          }
        };
        register(user).then((res) => {
          setConfirmOpen(true);
          if (res.success) {
            setConfirmTitle("Success");
            setConfirmMessage("A new affiliate was newly registerd!");
            moveStepForward();
          } else {
            setConfirmTitle("Error");
            setConfirmMessage(res.error as string);
          }
        });
      });
    }
  };

  const onBack = () => {
    if (!userData.selectedAccounts.creator && userData.selectedAccounts.user) {
      setConfirmOpen(true);
      setConfirmTitle("Warning");
      setConfirmMessage(
        "You can't go backward since you already registered a user!"
      );
    } else {
      moveStepBackward();
    }
  };

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
          disabled={isPending}
          variant={"outline"}
          className="w-64 flex gap-x-4 border-red-700"
          onClick={onBack}
        >
          <FaArrowLeft />
          Back
        </Button>
        <Button
          disabled={isPending}
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
