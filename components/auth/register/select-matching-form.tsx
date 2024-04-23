"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { SignedUpData } from "@/shared/types-user";
import { Evanto } from "./matching-sites/evanto";
import { Behance } from "./matching-sites/behance";
import { ArtStation } from "./matching-sites/artstation";
import { Dribble } from "./matching-sites/dribble";
import { CreativeMarket } from "./matching-sites/creative-market";

type Props = {
  defaultData: SignedUpData["creatorMatchings"];
  onContinue: (values: SignedUpData["creatorMatchings"]) => void;
  onBack: (values: SignedUpData["creatorMatchings"]) => void;
};

export const SelectMatchingForm = ({
  defaultData,
  onContinue,
  onBack
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("");
  const [matchings, setMatchings] = useState<SignedUpData["creatorMatchings"]>({
    ...defaultData
  });

  const onContinueClicked = () => {
    onContinue(matchings);
  };

  const onBackClicked = () => {
    onBack(matchings);
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
        4. Please confirm your accounts on other creative markets.
      </p>
    </div>
  );
};
