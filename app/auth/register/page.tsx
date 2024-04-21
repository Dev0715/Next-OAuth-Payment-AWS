"use client";

import { CreatorDetailsForm } from "@/components/auth/register/creator-details-form";
import { GeneralDetailsForm } from "@/components/auth/register/general-details-form";
import { SelectAccounts } from "@/components/auth/register/select-accounts-form";
import {
  GeneralDetailsSchema,
  SelectAccountsSchema
} from "@/schemas/auth/register";
import { SingedUpData } from "@/shared/types-user";
import { useState } from "react";
import { z } from "zod";

const RegisterPage = () => {
  const [userData, setUserData] = useState<SingedUpData>({
    generalDetails: {
      username: "andreicasian1",
      firstname: "andrei",
      lastname: "caisan",
      address1: "str Vasile Lupy 64/4",
      address2: "",
      city: "Chisinau",
      postal: "MD-2012",
      country: "Moldova",
      phone1: "",
      phone2: "",
      email: "andrei.devcasian1@gmail.com",
      password: "123456"
    },
    selectedAccounts: {
      creator: false,
      user: false,
      affiliate: false
    }
  });
  const [step, setStep] = useState<number>(0);

  const isCreatorStep = () => {
    return userData.selectedAccounts.creator && step === 2;
  };

  const isUserStep = () => {
    if (
      userData.selectedAccounts.user &&
      userData.selectedAccounts.creator &&
      step === 3
    ) {
      return true;
    } else if (
      userData.selectedAccounts.user &&
      !userData.selectedAccounts.creator &&
      step === 2
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isAffiliateStep = () => {
    if (
      userData.selectedAccounts.affiliate &&
      userData.selectedAccounts.creator &&
      userData.selectedAccounts.user &&
      step === 4
    ) {
      return true;
    } else if (
      userData.selectedAccounts.affiliate &&
      userData.selectedAccounts.creator &&
      !userData.selectedAccounts.user &&
      step === 3
    ) {
      return true;
    } else if (
      userData.selectedAccounts.affiliate &&
      !userData.selectedAccounts.creator &&
      userData.selectedAccounts.user &&
      step === 3
    ) {
      return true;
    } else if (
      userData.selectedAccounts.affiliate &&
      !userData.selectedAccounts.creator &&
      !userData.selectedAccounts.user &&
      step === 2
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onGeneralDetailsContinue = (
    values: z.infer<typeof GeneralDetailsSchema>
  ) => {
    setUserData((prev) => ({ ...prev, generalDetails: values }));
    setStep((prev) => prev + 1);
  };

  const onSelectAccountsContinue = (
    values: z.infer<typeof SelectAccountsSchema>
  ) => {
    setUserData((prev) => ({ ...prev, selectedAccounts: values }));
    setStep((prev) => prev + 1);
  };

  const onSelectAccountsBack = (
    values: z.infer<typeof SelectAccountsSchema>
  ) => {
    setUserData((prev) => ({ ...prev, selectedAccounts: values }));
    setStep((prev) => prev - 1);
  };

  return (
    <div className="w-[640px] flex flex-col pt-6 gap-y-12">
      <p className="text-4xl font-semibold">Let's get you started</p>
      {step === 0 && (
        <GeneralDetailsForm
          defaultData={userData}
          onContinue={onGeneralDetailsContinue}
        />
      )}
      {step === 1 && (
        <SelectAccounts
          defaultData={userData}
          onContinue={onSelectAccountsContinue}
          onBack={onSelectAccountsBack}
        />
      )}
      {isCreatorStep() && (
        <CreatorDetailsForm
          step={step}
          defaultData={userData}
          onContinue={onGeneralDetailsContinue}
        />
      )}
    </div>
  );
};

export default RegisterPage;
