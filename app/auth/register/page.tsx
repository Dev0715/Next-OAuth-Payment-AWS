"use client";

import { useState } from "react";

import { register } from "@/actions/auth/register/register";
import { GeneralDetailsForm } from "@/components/auth/register/general-details-form";
import { RegisterCompleteForm } from "@/components/auth/register/register-complete-form";
import { TransitionInOut } from "@/components/utils/transition-in-out";
import { SignedUpData } from "@/shared/types/signup-data.type";
import { getUserFromGeneralDetails } from "@/shared/functions/user-from-signup";

const RegisterPage = () => {
  const [step, setStep] = useState<number>(0);

  const handleSubmit = async (details: SignedUpData["generalDetails"]) => {
    const user = await getUserFromGeneralDetails(details);

    const response = await register(user);
    if (response.success) {
      setStep(1);
    } else {
      // TODO: handle error
    }
  };

  return (
    <div className="w-[640px] flex flex-col pt-6">
      <TransitionInOut condition={step === 0}>
        <GeneralDetailsForm onSubmit={handleSubmit} />
      </TransitionInOut>
      <TransitionInOut condition={step === 1}>
        <RegisterCompleteForm step={step} />
      </TransitionInOut>
    </div>
  );
};

export default RegisterPage;
