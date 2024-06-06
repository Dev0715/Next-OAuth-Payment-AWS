"use client";

import { useState } from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { GradientButton } from "@/components/utils/gradient-button";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  onUpdate: (data: Partial<SignedUpData>) => void;
  onBack: () => void;
};

export const TaxForm = ({ onUpdate, onBack }: Props) => {
  const [usPerson, setUsPerson] = useState("");

  const onNextClicked = () => {
    onUpdate({
      usPerson: usPerson
    });
  };

  const onBackClicked = () => {
    onBack();
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <p className="mb-4">
          US federal tax law requires Kre8tive to collect US Author tax
          information through an IRS Form W-9 and report on income paid.
        </p>

        <strong>If you are a U.S. Person</strong>
        <p className="mb-4">
          No matter where you are worldwide you can submit a Form W-9 to
          Kre8tive to satisfy your filing requirement. Typically there will be
          no withholding of taxes on any of your Kre8tive income. If you do not
          submit a valid Form W-9, Kre8tive will be required to deduct 24%
          withholding tax from sales proceeds and remit these directly to the
          Internal Revenue Service. If you have any questions, please check our
          W-9 articles.
        </p>

        <strong>If you are not a U.S. Person</strong>
        <p className="mb-4">
          You will need to submit a Form W-8. If you are a resident of a country
          that has a tax treaty with the U.S., you will benefit from the reduced
          or zero withholding rate that is specified in your country`s tax
          treaty. If you are a resident of a country that does not have a tax
          treaty with the U.S., then your U.S. source income from Kre8tive will
          be subject to a 30% withholding tax. If you have any questions, please
          check our W-8 articles.
        </p>

        <p className="">
          While Kre8tive cannot give tax and/or legal advice, we will do our
          best to provide you with the information you need to make your own
          decision about how to comply with applicable U.S. tax laws. If you
          still have questions after reviewing the information provided by the
          IRS, please contact your legal and/or tax advisor.
        </p>

        <p className="">
          Please indicate whether you are a US Person and we will direct you to
          the correct Forms.
        </p>
        <ul className="mt-4 ml-4 list-disc">
          <li>
            An individual who is a US citizen or US resident alien, or who
            satisfies the substantial presence test.
          </li>
          <li>
            A partnership, corporation, company, or association created or
            organized in the United States or under the laws of the United
            States.
          </li>
          <li>An estate (other than a foreign estate), or</li>
          <li>A domestic trust (as defined in US tax regulations).</li>
        </ul>
      </div>

      <RadioGroup
        defaultValue={usPerson}
        onValueChange={setUsPerson}
        className="w-full flex flex-col"
      >
        <div className="flex items-center gap-x-4 cursor-pointer">
          <RadioGroupItem value={"us"} id={"us"} />
          <Label
            htmlFor={"I am a US person"}
            className="flex items-center gap-x-4 text-5xl cursor-pointer"
          >
            <p className="text-lg">I am a US person</p>
          </Label>
        </div>
        <div className="flex items-center gap-x-4 cursor-pointer">
          <RadioGroupItem value={"notUs"} id={"notUs"} />
          <Label
            htmlFor={"I am not a US person"}
            className="flex items-center gap-x-4 text-5xl cursor-pointer"
          >
            <p className="text-lg">I am not a US person</p>
          </Label>
        </div>
      </RadioGroup>

      <div className="w-full col-span-2 flex items-center justify-between mt-4">
        <GradientButton
          variant="destructive"
          className="flex gap-x-4 border-red-700"
          onClick={onBackClicked}
        >
          <FaArrowLeft />
          Back
        </GradientButton>
        <GradientButton
          onClick={onNextClicked}
          disabled={usPerson === ""}
          className="flex gap-x-4"
        >
          <FaArrowRight />
          Next
        </GradientButton>
      </div>
    </div>
  );
};
