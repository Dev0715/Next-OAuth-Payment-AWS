"use client";

import { GeneralDetailsForm } from "@/components/auth/register/general-details-form";
import { SelectAccounts } from "@/components/auth/register/select-accounts-form";
import {
  GeneralDetailsSchema,
  SelectAccountsSchema
} from "@/schemas/auth/register";
import { useState } from "react";
import { z } from "zod";

const RegisterPage = () => {
  const [userData, setUserData] = useState<any>({
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
    password: "123456",
    creator: false,
    user: false,
    affiliate: false
  });
  const [step, setStep] = useState<number>(0);

  const isCreatorStep = () => {
    return userData.creator && step === 2;
  };

  const isUserStep = () => {
    if (userData.user && userData.creator && step === 3) {
      return true;
    } else if (userData.user && !userData.creator && step === 2) {
      return true;
    } else {
      return false;
    }
  };

  const isAffiliateStep = () => {
    if (userData.affiliate && userData.creator && userData.user && step === 4) {
      return true;
    } else if (
      userData.affiliate &&
      userData.creator &&
      !userData.user &&
      step === 3
    ) {
      return true;
    } else if (
      userData.affiliate &&
      !userData.creator &&
      userData.user &&
      step === 3
    ) {
      return true;
    } else if (
      userData.affiliate &&
      !userData.creator &&
      !userData.user &&
      step === 2
    ) {
      return true;
    } else {
      return false;
    }
  };

  const updateUserData = (values: any) => {
    setUserData((prev: any) => ({
      ...prev,
      ...values
    }));
  };

  const onGeneralDetailsContinue = (
    values: z.infer<typeof GeneralDetailsSchema>
  ) => {
    updateUserData(values);
    setStep((prev) => prev + 1);
  };

  const onSelectAccountsContinue = (
    values: z.infer<typeof SelectAccountsSchema>
  ) => {
    updateUserData(values);
    setStep((prev) => prev + 1);
  };

  const onSelectAccountsBack = (
    values: z.infer<typeof SelectAccountsSchema>
  ) => {
    updateUserData(values);
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
    </div>
  );
};

export default RegisterPage;
