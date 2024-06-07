"use client";

import { useAtom } from "jotai";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { userAtom } from "@/store/user";

import { W8CorporationForm } from "./w8-corporation-form";
import { W8IndividualForm } from "./w8-individual-form";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  onUpdate: (data: Partial<SignedUpData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const W8Form = (props: Props) => {
  const [user] = useAtom(userAtom);

  console.log(user);

  const [registerType, setRegisterType] = useState("");

  return (
    <div className="w-full">
      <p className="t-body -size-m mb-8">
        As you have indicated that you are are not a US person, please complete
        the Form W-8 below which will be stored securely.
      </p>

      <div className="w-full flex">
        <p className="mb-2 mr-4">Registered as:</p>
        <RadioGroup
          className="mt-1"
          defaultValue={registerType}
          onValueChange={setRegisterType}
        >
          <div className="flex items-center gap-x-4 cursor-pointer">
            <RadioGroupItem value="individual" id="individual" />
            <Label htmlFor="individual" className="cursor-pointer">
              An individual
            </Label>
          </div>
          <div className="flex items-center gap-x-4 cursor-pointer">
            <RadioGroupItem value="corporation" id="corporation" />
            <Label htmlFor="corporation" className="cursor-pointer">
              A Corporation
            </Label>
          </div>
        </RadioGroup>
      </div>

      {registerType === "individual" && <W8IndividualForm {...props} />}
      {registerType === "corporation" && <W8CorporationForm {...props} />}
    </div>
  );
};
