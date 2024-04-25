"use client";

import { CreatorCompleteForm } from "@/components/auth/register/creator-complete-form";
import { CreatorDetailsForm } from "@/components/auth/register/creator-details-form";
import { GeneralDetailsForm } from "@/components/auth/register/general-details-form";
import { SelectAccountsForm } from "@/components/auth/register/select-accounts-form";
import { SelectMatchingForm } from "@/components/auth/register/select-matching-form";
import { UserCompleteForm } from "@/components/auth/register/user-complete-form";
import { SignedUpData } from "@/shared/types-user";
import { useState, useTransition } from "react";
import { AffiliateCompleteForm } from "@/components/auth/register/affiliate-complete-form";
import { RegisterCompleteForm } from "@/components/auth/register/register-complete-form";
import { Transition } from "@headlessui/react";
import { TransitionInOut } from "@/components/utils/transition-in-out";

const RegisterPage = () => {
  const [userData, setUserData] = useState<SignedUpData>({
    generalDetails: {
      username: "firstnamelastname",
      email: "firstname@org.com",
      password: "123456",
      firstname: "firstname",
      lastname: "lastname",
      phone1: "",
      phone2: "",
      address1: "address 1",
      address2: "address 2",
      city: "city",
      postal: "postal",
      country: "country"
    },
    selectedAccounts: {
      creator: false,
      user: false,
      affiliate: false
    },
    creatorDetails: {
      bio: "Description - Bio",
      typeOfUser: "Project Manager",
      companyName: "",
      companyCountry: "",
      companyWebsite: "",
      website1: "",
      website2: "",
      website3: "",
      website4: "",
      website5: ""
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
  const [isPending, startTransition] = useTransition();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const moveStepForward = () => {
    setStep(step + 1);
  };

  const moveStepBackward = () => {
    setStep(step - 1);
  };

  const isActive = () => {
    return !isDisabled && !isPending;
  };

  const isCreatorStep = () => {
    return userData.selectedAccounts.creator && step === 2;
  };

  const isMatchingStep = () => {
    return userData.selectedAccounts.creator && step === 3;
  };

  const isCreatorCompleteStep = () => {
    return userData.selectedAccounts.creator && step === 4;
  };

  const isUserStep = () => {
    let _step = 2;
    if (userData.selectedAccounts.creator) {
      _step += 3;
    }

    return userData.selectedAccounts.user && step === _step;
  };

  const isAffiliateStep = () => {
    let _step = 2;
    if (userData.selectedAccounts.creator) {
      _step += 3;
    }
    if (userData.selectedAccounts.user) {
      _step += 1;
    }

    return userData.selectedAccounts.affiliate && step === _step;
  };

  const isRegisterCompleteStep = () => {
    let _step = 2;
    if (userData.selectedAccounts.creator) {
      _step += 3;
    }
    if (userData.selectedAccounts.user) {
      _step += 1;
    }
    if (userData.selectedAccounts.affiliate) {
      _step += 1;
    }
    return step === _step;
  };

  return (
    <div className="w-[640px] flex flex-col pt-6">
      <TransitionInOut condition={step === 0}>
        <GeneralDetailsForm
          userData={userData}
          setUserData={setUserData}
          moveStepForward={moveStepForward}
        />
      </TransitionInOut>
      <TransitionInOut condition={step === 1}>
        <SelectAccountsForm
          userData={userData}
          setUserData={setUserData}
          moveStepForward={moveStepForward}
          moveStepBackward={moveStepBackward}
        />
      </TransitionInOut>
      <TransitionInOut condition={isCreatorStep()}>
        <CreatorDetailsForm
          userData={userData}
          setUserData={setUserData}
          moveStepForward={moveStepForward}
          moveStepBackward={moveStepBackward}
        />
      </TransitionInOut>
      <TransitionInOut condition={isMatchingStep()}>
        <SelectMatchingForm
          userData={userData}
          setUserData={setUserData}
          moveStepForward={moveStepForward}
          moveStepBackward={moveStepBackward}
        />
      </TransitionInOut>
      <TransitionInOut condition={isCreatorCompleteStep()}>
        <CreatorCompleteForm
          userData={userData}
          setUserData={setUserData}
          moveStepForward={moveStepForward}
          moveStepBackward={moveStepBackward}
        />
      </TransitionInOut>
      <TransitionInOut condition={isUserStep()}>
        <UserCompleteForm
          step={step}
          userData={userData}
          setUserData={setUserData}
          moveStepForward={moveStepForward}
          moveStepBackward={moveStepBackward}
        />
      </TransitionInOut>
      <TransitionInOut condition={isAffiliateStep()}>
        <AffiliateCompleteForm
          step={step}
          userData={userData}
          setUserData={setUserData}
          moveStepForward={moveStepForward}
          moveStepBackward={moveStepBackward}
        />
      </TransitionInOut>
      <TransitionInOut condition={isRegisterCompleteStep()}>
        <RegisterCompleteForm step={step} />
      </TransitionInOut>
    </div>
  );
};

export default RegisterPage;
