"use client";

import { useState } from "react";

import { CreatorDetailsForm } from "@/components/auth/register/creator-details-form";
import { RegisterCompleteForm } from "@/components/auth/register/register-complete-form";
import { SelectAccountsForm } from "@/components/auth/register/select-accounts-form";
import { SelectMatchingForm } from "@/components/auth/register/select-matching-form";
import { TaxForm } from "@/components/auth/register/tax-form";
import { W9Form } from "@/components/auth/register/w9-form";
import { TransitionInOut } from "@/components/utils/transition-in-out";

import type { SignedUpData } from "@/shared/types/signup-data.type";

enum STEPS {
  INITIAL,
  KRE8TOR,
  MATCH,
  TAX,
  W9,
  W8,
  COMPLETE
}

const OnboardingPage = () => {
  // affiliate, creator, user forms

  const [userData, setUserData] = useState<
    Omit<SignedUpData, "generalDetails">
  >({
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
    },
    taxInformation: {
      usPerson: false
    },
    w9Details: {
      firstName: "",
      lastName: "",
      businessName: "",
      taxClassification: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      accountNumbers: "",
      taxIdType: "",
      taxIdNumber: ""
    }
  });

  const [step, setStep] = useState(STEPS.INITIAL);

  const isCreatorStep =
    userData.selectedAccounts.creator && step === STEPS.KRE8TOR;

  const isMatchingStep =
    userData.selectedAccounts.creator && step === STEPS.MATCH;

  const isTaxStep = () => {
    let _step = 1;
    if (userData.selectedAccounts.creator) {
      _step += 2;
    }

    return (
      step === _step &&
      (userData.selectedAccounts.creator || userData.selectedAccounts.affiliate)
    );
  };

  const isW9Step = () => {
    let _step = 1;
    if (userData.selectedAccounts.creator) {
      _step += 3;
    } else if (userData.selectedAccounts.affiliate) {
      _step += 1;
    }

    return step === _step && userData.taxInformation.usPerson;
  };

  const isCompleteStep = () => {
    let _step = 1;
    if (userData.selectedAccounts.creator) {
      _step += 4;
    } else if (userData.selectedAccounts.affiliate) {
      _step += 2;
    }
    return step === _step;
  };

  const handleNext = () => {
    setStep((step) => step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleUpdateUserData = (data: Partial<SignedUpData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="mt-16 mb-8 w-[640px]">
      <TransitionInOut
        title="Accounts you want to create"
        condition={step === STEPS.INITIAL}
      >
        <SelectAccountsForm
          data={userData.selectedAccounts}
          onUpdate={handleUpdateUserData}
          onNext={handleNext}
        />
      </TransitionInOut>
      <TransitionInOut title="Your KRE8TOR details" condition={isCreatorStep}>
        <CreatorDetailsForm
          data={userData.creatorDetails}
          onUpdate={handleUpdateUserData}
          onNext={handleNext}
          onBack={handleBack}
        />
      </TransitionInOut>
      <TransitionInOut
        title="Your accounts on other markets"
        condition={isMatchingStep}
      >
        <SelectMatchingForm
          data={userData.creatorMatchings}
          onUpdate={handleUpdateUserData}
          onNext={handleNext}
          onBack={handleBack}
        />
      </TransitionInOut>
      <TransitionInOut title="Your tax information" condition={isTaxStep()}>
        <TaxForm
          onUpdate={handleUpdateUserData}
          onNext={handleNext}
          onBack={handleBack}
        />
      </TransitionInOut>
      <TransitionInOut title="Your tax information" condition={isW9Step()}>
        <W9Form onBack={handleBack} onUpdate={handleUpdateUserData} />
      </TransitionInOut>
      <TransitionInOut title="Congratulations!" condition={isCompleteStep()}>
        <RegisterCompleteForm />
      </TransitionInOut>
    </div>
  );
};

export default OnboardingPage;
