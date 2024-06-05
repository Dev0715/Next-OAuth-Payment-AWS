"use client";

import { useState } from "react";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { register } from "@/actions/auth/register/register";
import { Button } from "@/components/ui/button";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { getUserFromGeneralDetails } from "@/shared/functions/user-from-signup";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  userData: SignedUpData;
  handleNext: () => void;
  handleBack: () => void;
};

export const UserCompleteForm = ({
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
    user.customer = {
      isCustomer: true,
      customerId: uuidv4()
    };

    if (userData.selectedAccounts.affiliate) {
      user.affiliate = {
        isAffiliate: true,
        affiliateId: uuidv4()
      };
    }

    try {
      const response = await register(user);
      setConfirmOpen(true);
      if (response.success) {
        setConfirmTitle("Success");
        setConfirmMessage("A new user was newly registered!");
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
    if (userData.selectedAccounts.creator) {
      setConfirmOpen(true);
      setConfirmTitle("Success");
      setConfirmMessage("A new user was newly registered!");
    } else {
      setDisabled(true);
      processUserData().then(() => {
        setDisabled(false);
      });
    }
  };

  const OnBack = () => {
    if (userData.selectedAccounts.creator) {
      setConfirmOpen(true);
      setConfirmTitle("Warning");
      setConfirmMessage(
        "You can't go backward since you already registered a creator!"
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
        2. Complete registration for a user.
      </p>
      <div className="flex flex-col">
        <p>Congratulations!</p>
        <p className="text-base text-gray-500">
          You are ready to participate as a user!
        </p>
      </div>
      <p>** You will be notified on the date of the site launch.</p>
      <p>
        ** You will also be given a number of bonuses like $10 off on their
        first order and a free Launch Package that will have a bundle of free
        fonts, images, Figma files, etc.
      </p>
      <p>
        ** You will be invited to join the 2Advanced Discord Community, a
        special offer only for site registrants, like a private bundle.
      </p>
      <div className="w-full flex items-center justify-between mt-4">
        <Button
          disabled={isDisabled}
          variant={"outline"}
          className="w-64 flex gap-x-4 border-red-700"
          onClick={OnBack}
        >
          <FaArrowLeft />
          Back
        </Button>
        <Button
          disabled={isDisabled}
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
