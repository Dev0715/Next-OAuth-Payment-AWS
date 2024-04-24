"use client";

import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { SignedUpData } from "@/shared/types-user";

type Props = {
  userData: SignedUpData;
  setUserData: Dispatch<SetStateAction<SignedUpData>>;
  moveStepForward: () => void;
  moveStepBackward: () => void;
};

export const UserCompleteForm = ({
  userData,
  setUserData,
  moveStepForward,
  moveStepBackward
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const onContinue = () => {
    if (userData.selectedAccounts.creator) {
      setConfirmOpen(true);
      setConfirmTitle("Success");
      setConfirmMessage("A new user was newly registerd!");
      setStep((prev) => prev + 1);
    } else {
      startTransition(() => {
        const user: any = { ...userData.generalDetails, userRoleId: uuidv4() };
        if (userData.selectedAccounts.affiliate) {
          user["affiliateId"] = uuidv4();
        }

        register(user).then((res) => {
          setConfirmOpen(true);
          setIsDisabled(false);
          if (res.success) {
            setConfirmTitle("Success");
            setConfirmMessage("A new user was newly registerd!");
            setStep((prev) => prev + 1);
          } else {
            setConfirmTitle("Error");
            setConfirmMessage(res.error as string);
          }
        });
      });
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
        {step + 1}. Complete registration for a user.
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
