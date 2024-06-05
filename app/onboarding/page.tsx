"use client";

import { useState } from "react";

import { TransitionInOut } from "@/components/utils/transition-in-out";
import { SignedUpData } from "@/shared/types/signup-data.type";

import { SelectAccountsForm } from "./form/select-accounts-form";

const OnboardingPage = () => {
  // affiliate, creator, user forms

  const [userData, setUserData] = useState<SignedUpData>({
    generalDetails: {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: ""
    },
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

  const moveStepForward = () => {
    setStep(step + 1);
  };

  const moveStepBackward = () => {
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

  return (
    <div className="w-[640px]">
      <TransitionInOut condition={step === 1}>
        <SelectAccountsForm
          userData={userData}
          setUserData={setUserData}
          moveStepForward={moveStepForward}
          moveStepBackward={moveStepBackward}
        />
      </TransitionInOut>
    </div>
  );
};

export default OnboardingPage;
