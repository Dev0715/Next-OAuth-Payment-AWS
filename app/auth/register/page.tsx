"use client";

import { GeneralDetailsForm } from "@/components/auth/register/general-details-form";
import { SelectAccounts } from "@/components/auth/register/select-accounts";
import { useState } from "react";

const RegisterPage = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <div className="w-[640px] flex flex-col pt-6 gap-y-12">
      <p className="text-4xl font-semibold">Let's get you started</p>
      {step === 0 && (
        <GeneralDetailsForm onContinue={() => setStep((prev) => prev + 1)} />
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
