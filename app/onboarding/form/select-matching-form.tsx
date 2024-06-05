"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { ArtStation } from "@/components/auth/register/matching-sites/artstation";
import { Behance } from "@/components/auth/register/matching-sites/behance";
import { CreativeMarket } from "@/components/auth/register/matching-sites/creative-market";
import { Dribble } from "@/components/auth/register/matching-sites/dribble";
import { Evanto } from "@/components/auth/register/matching-sites/evanto";

import { Button } from "@/components/ui/button";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  userData: SignedUpData;
  setUserData: Dispatch<SetStateAction<SignedUpData>>;
  moveStepForward: () => void;
  moveStepBackward: () => void;
};

export const SelectMatchingForm = ({
  userData,
  setUserData,
  moveStepForward,
  moveStepBackward
}: Props) => {
  const [matchings, setMatchings] = useState<SignedUpData["creatorMatchings"]>({
    ...userData.creatorMatchings
  });

  const onContinueClicked = () => {
    setUserData({ ...userData, creatorMatchings: matchings });
    moveStepForward();
  };

  const onBackClicked = () => {
    setUserData({ ...userData, creatorMatchings: matchings });
    moveStepBackward();
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
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