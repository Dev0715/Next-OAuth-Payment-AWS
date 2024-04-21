"use client";

import { GeneralDetailsForm } from "@/components/auth/register/general-details-form";
import { SelectAccounts } from "@/components/auth/register/select-accounts";
import { GeneralDetailsSchema } from "@/schemas/auth/register";
import { useState } from "react";
import { z } from "zod";

const RegisterPage = () => {
  const [userData, setUserData] = useState<any>({});
  const [step, setStep] = useState<number>(0);

  const onGeneralDetailsContinue = (
    values: z.infer<typeof GeneralDetailsSchema>
  ) => {
    setUserData((prev: any) => ({
      ...prev,
      ...values
    }));
  };

  return (
    <div className="w-[640px] flex flex-col pt-6 gap-y-12">
      <p className="text-4xl font-semibold">Let's get you started</p>
      {step === 0 && (
        <GeneralDetailsForm
          defaultValue={userData}
          onContinue={onGeneralDetailsContinue}
        />
      )}
      {step === 1 && (
        <SelectAccounts
          onContinue={() => setStep((prev) => prev + 1)}
          onBack={() => setStep((prev) => prev - 1)}
        />
      )}
    </div>
  );
};

export default RegisterPage;
