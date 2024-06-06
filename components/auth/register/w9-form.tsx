"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { GradientButton } from "@/components/utils/gradient-button";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export const W9Form = ({ onNext, onBack }: Props) => {
  const onNextClicked = () => {
    onNext();
  };

  const onBackClicked = () => {
    onBack();
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <p className="text-xl text-green-700">Tax Information.</p>

      <div className="w-full col-span-2 flex items-center justify-between mt-4">
        <GradientButton
          variant="destructive"
          className="flex gap-x-4 border-red-700"
          onClick={onBackClicked}
        >
          <FaArrowLeft />
          Back
        </GradientButton>
        <GradientButton onClick={onNextClicked} className="flex gap-x-4">
          <FaArrowRight />
          Next
        </GradientButton>
      </div>
    </div>
  );
};
