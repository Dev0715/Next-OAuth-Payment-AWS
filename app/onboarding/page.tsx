"use client";

import { useState } from "react";

import { CreatorDetailsForm } from "@/components/auth/register/creator-details-form";
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

  // const isCreatorStep = () => {
  //   return userData.selectedAccounts.creator && step === 2;
  // };

  // const isMatchingStep = () => {
  //   return userData.selectedAccounts.creator && step === 3;
  // };

  // const isCreatorCompleteStep = () => {
  //   return userData.selectedAccounts.creator && step === 4;
  // };

  // const isUserStep = () => {
  //   let _step = 2;
  //   if (userData.selectedAccounts.creator) {
  //     _step += 3;
  //   }

  //   return userData.selectedAccounts.user && step === _step;
  // };

  // const isAffiliateStep = () => {
  //   let _step = 2;
  //   if (userData.selectedAccounts.creator) {
  //     _step += 3;
  //   }
  //   if (userData.selectedAccounts.user) {
  //     _step += 1;
  //   }

  //   return userData.selectedAccounts.affiliate && step === _step;
  // };

  // const isRegisterCompleteStep = () => {
  //   let _step = 2;
  //   if (userData.selectedAccounts.creator) {
  //     _step += 3;
  //   }
  //   if (userData.selectedAccounts.user) {
  //     _step += 1;
  //   }
  //   if (userData.selectedAccounts.affiliate) {
  //     _step += 1;
  //   }
  //   return step === _step;
  // };

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
    </div>
  );
};

export default OnboardingPage;
