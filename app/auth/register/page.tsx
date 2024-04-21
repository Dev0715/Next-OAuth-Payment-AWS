"use client";

import { GeneralDetailsForm } from "@/components/auth/register/general-details-form";
import { useState } from "react";

const RegisterPage = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <div className="w-[640px] flex flex-col pt-6 gap-y-12">
      <p className="text-4xl font-semibold">Let's get you started</p>
      <GeneralDetailsForm onContinue={() => setStep((prev) => prev + 1)} />
    </div>
  );
};

export default RegisterPage;
