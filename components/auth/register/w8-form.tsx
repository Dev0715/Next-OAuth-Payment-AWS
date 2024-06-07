"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const W8Form = () => {
  return (
    <div className="w-full">
      <p className="t-body -size-m mb-8">
        As you have indicated that you are are not a US person, please complete
        the Form W-8 below which will be stored securely.
      </p>

      <RadioGroup>
        <div className="flex items-center gap-x-4 cursor-pointer">
          <RadioGroupItem value="true" id="us" />
          <Label htmlFor="individual" className="cursor-pointer">
            An individual
          </Label>
        </div>
        <div className="flex items-center gap-x-4 cursor-pointer">
          <RadioGroupItem value="false" id="notUs" />
          <Label htmlFor="corporation" className="cursor-pointer">
            A Corporation
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
