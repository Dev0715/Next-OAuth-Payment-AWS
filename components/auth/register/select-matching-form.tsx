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
      <Evanto
        value={matchings.env}
        setValue={(value) => setMatchings({ ...matchings, env: value })}
      />
      <Behance
        value={matchings.beh}
        setValue={(value) => setMatchings({ ...matchings, beh: value })}
      />
      <ArtStation
        value={matchings.art}
        setValue={(value) => setMatchings({ ...matchings, art: value })}
      />
      <Dribble
        value={matchings.drb}
        setValue={(value) => setMatchings({ ...matchings, drb: value })}
      />
      <CreativeMarket
        value={matchings.cmk}
        setValue={(value) => setMatchings({ ...matchings, cmk: value })}
      />
      <div className="w-full flex items-center justify-between mt-4">
        <Button
          disabled={isPending}
          variant={"outline"}
          className="w-64 flex gap-x-4 border-red-700"
          onClick={onBackClicked}
        >
          <FaArrowLeft />
          Back
        </Button>
        <Button
          disabled={isPending}
          className="w-64 flex gap-x-4"
          onClick={onContinueClicked}
        >
          <FaArrowRight />
          Next
        </Button>
      </div>
    </div>
  );
};
