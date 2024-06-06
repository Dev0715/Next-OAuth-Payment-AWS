"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import { ArtStation } from "./matching-sites/artstation";
import { Behance } from "./matching-sites/behance";
import { CreativeMarket } from "./matching-sites/creative-market";
import { Dribble } from "./matching-sites/dribble";
import { Evanto } from "./matching-sites/evanto";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  data: SignedUpData["creatorMatchings"];
  onUpdate: (data: Partial<SignedUpData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const SelectMatchingForm = ({
  data,
  onUpdate,
  onNext,
  onBack
}: Props) => {
  const [matchings, setMatchings] =
    useState<SignedUpData["creatorMatchings"]>(data);

  const onContinueClicked = () => {
    onUpdate({ creatorMatchings: matchings });
    onNext();
  };

  const onBackClicked = () => {
    onUpdate({ creatorMatchings: matchings });
    onBack();
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <p className="text-xl text-green-700">
        Please confirm your accounts on other creative markets.
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
          variant={"outline"}
          className="w-64 flex gap-x-4 border-red-700"
          onClick={onBackClicked}
        >
          <FaArrowLeft />
          Back
        </Button>
        <Button className="w-64 flex gap-x-4" onClick={onContinueClicked}>
          <FaArrowRight />
          Next
        </Button>
      </div>
    </div>
  );
};
