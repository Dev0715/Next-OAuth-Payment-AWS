"use client";

import { useState } from "react";

import { CreatorDetailsForm } from "@/components/auth/register/creator-details-form";
import { RegisterCompleteForm } from "@/components/auth/register/register-complete-form";
import { SelectAccountsForm } from "@/components/auth/register/select-accounts-form";
import { TransitionInOut } from "@/components/utils/transition-in-out";

import type { SignedUpData } from "@/shared/types/signup-data.type";

const OnboardingPage = () => {
  // affiliate, creator, user forms

  const [, setUserData] = useState<Omit<SignedUpData, "generalDetails">>({
    selectedAccounts: {
      creator: false,
      user: false,
      affiliate: false
    },
    creatorDetails: {
      bio: "",
      jobTitle: "",
      companyName: "",
      companyCountry: "",
      companyWebsite: ""
    },
    creatorMatchings: {
      env: false,
      beh: false,
      art: false,
      drb: false,
      cmk: false
    }
  });

  const [step, setStep] = useState<number>(0);

  const handleNext = () => {
    setStep((step) => step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleUpdateUserData = (data: Partial<SignedUpData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
    handleNext();
  };

  return (
    <div className="mt-16 w-[640px]">
      <TransitionInOut condition={step === 0}>
        <SelectAccountsForm onUpdate={handleUpdateUserData} />
      </TransitionInOut>
      <TransitionInOut condition={step === 1}>
        <CreatorDetailsForm
          onUpdate={handleUpdateUserData}
          onNext={handleNext}
          onBack={handleBack}
        />
      </TransitionInOut>
      <TransitionInOut condition={step === 2}>
        <RegisterCompleteForm />
      </TransitionInOut>
    </div>
  );
};

export default OnboardingPage;
