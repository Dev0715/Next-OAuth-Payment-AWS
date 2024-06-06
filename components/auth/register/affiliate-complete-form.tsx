"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { register } from "@/actions/auth/register/register";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { GradientButton } from "@/components/utils/gradient-button";

import { getUserFromGeneralDetails } from "@/shared/functions/user-from-signup";
import { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  step: number;
  userData: SignedUpData;
  setUserData: Dispatch<SetStateAction<SignedUpData>>;
  handleNext: () => void;
  handleBack: () => void;
};

export const AffiliateCompleteForm = ({
  step,
  userData,
  handleNext,
  handleBack
}: Props) => {
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmTitle, setConfirmTitle] = useState<string>("");
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const processUserData = async () => {
    const user = await getUserFromGeneralDetails(userData.generalDetails);
    user.affiliate = {
      isAffiliate: true,
      affiliateId: uuidv4()
    };

    try {
      const response = await register(user);
      setConfirmOpen(true);
      if (response.success) {
        setConfirmTitle("Success");
        setConfirmMessage("A new affiliate was newly registered!");
      } else {
        setConfirmTitle("Error");
        setConfirmMessage(response.error as string);
      }
    } catch (error) {
      setConfirmOpen(true);
      setConfirmTitle("Error");
      setConfirmMessage("Internal Server Error!");
    }
  };

  const onContinue = () => {
    if (userData.selectedAccounts.creator || userData.selectedAccounts.user) {
      setConfirmOpen(true);
      setConfirmTitle("Success");
      setConfirmMessage("A new affiliate was newly registered!");
    } else {
      setDisabled(true);
      processUserData().then(() => {
        setDisabled(false);
      });
    }
  };

  const onBack = () => {
    if (!userData.selectedAccounts.creator || userData.selectedAccounts.user) {
      setConfirmOpen(true);
      setConfirmTitle("Warning");
      setConfirmMessage(
        "You can't go backward since you are already registered!"
      );
    } else {
      handleBack();
    }
  };

  const onConfirmed = () => {
    setConfirmOpen(false);
    if (confirmTitle === "Success") {
      handleNext();
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={isConfirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onOK={onConfirmed}
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
        <GradientButton
          disabled={isDisabled}
          variant={"destructive"}
          className="w-64 flex gap-x-4 border-red-700"
          onClick={onBack}
        >
          <FaArrowLeft />
          Back
        </GradientButton>
        <GradientButton
          disabled={isDisabled}
          className="w-64 flex gap-x-4"
          onClick={onContinue}
        >
          <FaUser />
          Complete
        </GradientButton>
      </div>
    </div>
  );
};
