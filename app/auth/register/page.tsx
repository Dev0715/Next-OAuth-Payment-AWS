"use client";

import { register } from "@/actions/auth/register/register";
import { CreatorCompleteForm } from "@/components/auth/register/creator-complete-form";
import { CreatorDetailsForm } from "@/components/auth/register/creator-details-form";
import { GeneralDetailsForm } from "@/components/auth/register/general-details-form";
import { SelectAccountsForm } from "@/components/auth/register/select-accounts-form";
import { SelectMatchingForm } from "@/components/auth/register/select-matching-form";
import { UserCompleteForm } from "@/components/auth/register/user-complete-form";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { axiosClient, axiosConfig } from "@/lib/axios";
import {
  CreatorDetailsSchema,
  GeneralDetailsSchema,
  SelectAccountsSchema
} from "@/schemas/auth/register";
import { SignedUpData } from "@/shared/types-user";
import { useState, useTransition } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { AffiliateCompleteForm } from "@/components/auth/register/affiliate-complete-form";
import { RegisterCompleteForm } from "@/components/auth/register/register-complete-form";

const RegisterPage = () => {
  const [userData, setUserData] = useState<SignedUpData>({
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
    },
    creatorDetails: {
      bio: "description",
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

  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmTitle, setConfirmTitle] = useState<string>("");
  const [confirmMessage, setConfirmMessage] = useState<string>("");

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

  const onCreatorDetailsContinue = (
    values: z.infer<typeof CreatorDetailsSchema>
  ) => {
    setUserData((prev) => ({ ...prev, creatorDetails: values }));
    setStep((prev) => prev + 1);
  };

  const onCreatorDetailsBack = (
    values: z.infer<typeof CreatorDetailsSchema>
  ) => {
    setUserData((prev) => ({ ...prev, creatorDetails: values }));
    setStep((prev) => prev - 1);
  };

  const onSelectMatchingContinue = (
    values: SignedUpData["creatorMatchings"]
  ) => {
    setUserData((prev) => ({ ...prev, creatorMatchings: values }));
    setStep((prev) => prev + 1);
  };

  const onSelectMatchingBack = (values: SignedUpData["creatorMatchings"]) => {
    setUserData((prev) => ({ ...prev, creatorMatchings: values }));
    setStep((prev) => prev - 1);
  };

  const uploadImages = async () => {
    const formData = new FormData();
    if (userData.creatorDetails.avatar)
      formData.append("file1", userData.creatorDetails.avatar);
    if (userData.creatorDetails.cover)
      formData.append("file2", userData.creatorDetails.cover);

    if (userData.creatorDetails.avatar || userData.creatorDetails.cover) {
      try {
        const response = await axiosClient.post(
          "/multi-upload",
          formData,
          axiosConfig
        );
        const data = response.data;

        if (data.success) {
          return data.pathList;
        } else {
          return [];
        }
      } catch (error) {
        return [];
      }
    } else {
      return [];
    }
  };

  const getCreatorData = () => {
    const scraped: any = {};
    if (userData.creatorMatchings.env) {
      scraped["env"] = {};
    } else if (userData.creatorMatchings.beh) {
      scraped["beh"] = {};
    } else if (userData.creatorMatchings.art) {
      scraped["art"] = {};
    } else if (userData.creatorMatchings.drb) {
      scraped["drb"] = {};
    } else if (userData.creatorMatchings.cmk) {
      scraped["cmk"] = {};
    }

    const creator: any = {
      ...userData.generalDetails,
      creator: {
        ...userData.creatorDetails
      },
      scraped
    };

    if (userData.selectedAccounts.user) {
      creator["userRoleId"] = uuidv4();
    }

    if (userData.selectedAccounts.affiliate) {
      creator["affiliateId"] = uuidv4();
    }

    return creator;
  };

  const onCreatorCompleteContinue = () => {
    startTransition(() => {
      setIsDisabled(true);
      const creator = getCreatorData();

      uploadImages().then((pathList) => {
        if (userData.creatorDetails.avatar) {
          if (pathList.length > 0) {
            creator.creator.avatar = pathList[0];
          } else {
            delete creator.creator.avatar;
          }

          if (userData.creatorDetails.cover) {
            if (pathList.length > 1) {
              creator.creator.cover = pathList[1];
            } else {
              delete creator.creator.cover;
            }
          }
        } else if (userData.creatorDetails.cover) {
          if (pathList.length > 0) {
            creator.creator.cover = pathList[0];
          } else {
            delete creator.creator.cover;
          }
        }

        register(creator).then((res) => {
          setConfirmOpen(true);
          setIsDisabled(false);
          if (res.success) {
            setConfirmTitle("Success");
            setConfirmMessage("A new creator was newly registerd!");
            setStep((prev) => prev + 1);
          } else {
            setConfirmTitle("Error");
            setConfirmMessage(res.error as string);
          }
        });
      });
    });
  };

  const onCreatorCompleteBack = () => {
    setStep((prev) => prev - 1);
  };

  const onUserCompleteContinue = () => {
    if (userData.selectedAccounts.creator) {
      setConfirmOpen(true);
      setConfirmTitle("Success");
      setConfirmMessage("A new user was newly registerd!");
      setStep((prev) => prev + 1);
    } else {
      startTransition(() => {
        const user: any = { ...userData.generalDetails, userRoleId: uuidv4() };
        if (userData.selectedAccounts.affiliate) {
          user["affiliateId"] = uuidv4();
        }

        register(user).then((res) => {
          setConfirmOpen(true);
          setIsDisabled(false);
          if (res.success) {
            setConfirmTitle("Success");
            setConfirmMessage("A new user was newly registerd!");
            setStep((prev) => prev + 1);
          } else {
            setConfirmTitle("Error");
            setConfirmMessage(res.error as string);
          }
        });
      });
    }
  };

  const onUserCompleteBack = () => {
    if (userData.selectedAccounts.creator) {
      setConfirmOpen(true);
      setConfirmTitle("Warning");
      setConfirmMessage(
        "You can't go backward since you already registered a creator!"
      );
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const onAffiliateCompleteContinue = () => {
    if (userData.selectedAccounts.creator || userData.selectedAccounts.user) {
      setConfirmOpen(true);
      setConfirmTitle("Success");
      setConfirmMessage("A new affiliate was newly registerd!");
      setStep((prev) => prev + 1);
    } else {
      startTransition(() => {
        register({ ...userData.generalDetails, affiliateId: uuidv4() }).then(
          (res) => {
            setConfirmOpen(true);
            setIsDisabled(false);
            if (res.success) {
              setConfirmTitle("Success");
              setConfirmMessage("A new affiliate was newly registerd!");
              setStep((prev) => prev + 1);
            } else {
              setConfirmTitle("Error");
              setConfirmMessage(res.error as string);
            }
          }
        );
      });
    }
  };

  const onAffiliateCompleteBack = () => {
    if (!userData.selectedAccounts.creator && userData.selectedAccounts.user) {
      setConfirmOpen(true);
      setConfirmTitle("Warning");
      setConfirmMessage(
        "You can't go backward since you already registered a user!"
      );
    } else {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-[640px] flex flex-col pt-6 gap-y-12">
      <ConfirmAlert
        open={isConfirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onOK={() => setConfirmOpen(false)}
      />
      <p className="text-4xl font-semibold">Let's get you started</p>
      {step === 0 && (
        <GeneralDetailsForm
          userData={userData}
          setUserData={setUserData}
          onContinue={onGeneralDetailsContinue}
        />
      )}
      {step === 1 && (
        <SelectAccountsForm
          defaultData={userData.selectedAccounts}
          onContinue={onSelectAccountsContinue}
          onBack={onSelectAccountsBack}
        />
      )}
      {isCreatorStep() && (
        <CreatorDetailsForm
          defaultData={userData.creatorDetails}
          onContinue={onCreatorDetailsContinue}
          onBack={onCreatorDetailsBack}
        />
      )}
      {isMatchingStep() && (
        <SelectMatchingForm
          defaultData={userData.creatorMatchings}
          onContinue={onSelectMatchingContinue}
          onBack={onSelectMatchingBack}
        />
      )}
      {isCreatorCompleteStep() && (
        <CreatorCompleteForm
          pending={!isActive()}
          onContinue={onCreatorCompleteContinue}
          onBack={onCreatorCompleteBack}
        />
      )}
      {isUserStep() && (
        <UserCompleteForm
          pending={!isActive()}
          step={step}
          onContinue={onUserCompleteContinue}
          onBack={onUserCompleteBack}
        />
      )}
      {isAffiliateStep() && (
        <AffiliateCompleteForm
          pending={!isActive()}
          step={step}
          onContinue={onAffiliateCompleteContinue}
          onBack={onAffiliateCompleteBack}
        />
      )}
      {isRegisterCompleteStep() && <RegisterCompleteForm step={step} />}
    </div>
  );
};

export default RegisterPage;
