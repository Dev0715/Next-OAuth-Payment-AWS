"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { SignedUpData } from "@/shared/types/signup-data.type";
import { v4 as uuidv4 } from "uuid";
import { register } from "@/actions/auth/register/register";
import { getUserFromGeneralDetails } from "@/shared/functions/user-from-signup";
import { uploadImage } from "@/shared/functions/upload-image";

type Props = {
  userData: SignedUpData;
  setUserData: Dispatch<SetStateAction<SignedUpData>>;
  moveStepForward: () => void;
  moveStepBackward: () => void;
};

export const CreatorCompleteForm = ({
  userData,
  setUserData,
  moveStepForward,
  moveStepBackward
}: Props) => {
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmTitle, setConfirmTitle] = useState<string>("");
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const processUserData = async () => {
    // # Scraped Data #

    const user = await getUserFromGeneralDetails(userData.generalDetails);
    user.creator = {
      isCreator: true,
      creatorId: uuidv4(),
      bio: userData.creatorDetails.bio,
      jobTitle: userData.creatorDetails.jobTitle,
      websites: []
    };

    if (userData.creatorDetails.cover) {
      const keyName = `${userData.generalDetails.username}/${uuidv4()}`;
      if (await uploadImage(userData.creatorDetails.cover, keyName)) {
        if (user.creator) user.creator.cover = keyName;
      }
    }

    if (user.creator && userData.creatorDetails.companyName) {
      user.creator["company"] = {
        name: userData.creatorDetails.companyName,
        country: userData.creatorDetails.companyCountry,
        website: userData.creatorDetails.companyWebsite
      };
    }

    // if (user.creator?.websites) {
    //   if (userData.creatorDetails.website1)
    //     user.creator.websites.push(userData.creatorDetails.website1);
    //   if (userData.creatorDetails.website2)
    //     user.creator.websites.push(userData.creatorDetails.website2);
    //   if (userData.creatorDetails.website3)
    //     user.creator.websites.push(userData.creatorDetails.website3);
    //   if (userData.creatorDetails.website4)
    //     user.creator.websites.push(userData.creatorDetails.website4);
    //   if (userData.creatorDetails.website5)
    //     user.creator.websites.push(userData.creatorDetails.website5);
    // }

    if (userData.selectedAccounts.user) {
      user.customer = {
        isCustomer: true,
        customerId: uuidv4()
      };
    }

    if (userData.selectedAccounts.affiliate) {
      user.affiliate = {
        isAffiliate: true,
        affiliateId: uuidv4()
      };
    }

    const response = await register(user);
    setConfirmOpen(true);
    if (response.success) {
      setConfirmTitle("Success");
      setConfirmMessage("A new creator was newly registerd!");
    } else {
      setConfirmTitle("Error");
      setConfirmMessage(response.error as string);
    }
  };

  const onContinue = () => {
    setDisabled(true);
    processUserData().then(() => {
      setDisabled(false);
    });
  };

  const onConfimred = () => {
    setConfirmOpen(false);
    if (confirmTitle === "Success") {
      moveStepForward();
    }
  };

  const onBack = () => {
    moveStepBackward();
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={isConfirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onOK={onConfimred}
      />
      <p className="text-xl text-green-700">
        5. Complete registration for a creator.
      </p>
      <div className="flex flex-col">
        <p>Congratulations!</p>
        <p className="text-base text-gray-500">
          You are ready to participate as a creator!
        </p>
      </div>
      <p>
        ** Creators will be given all of the necessary screens to allow them to
        effective Define new Products, Create, Read, Update and Delete.
      </p>
      <p>
        ** You will ideally spend a great amount of time uploading products and
        prepping them for launch time.
      </p>
      <p>
        ** Each product uploaded by a Creator needs to be submitted to an
        Approval Queue on the Management side, whereby the Kre8tive Staff or
        Admins can go into the products, make edits, add files like Licensing
        Data.
      </p>
      <div className="w-full flex items-center justify-between mt-4">
        <Button
          disabled={isDisabled}
          variant={"outline"}
          className="w-64 flex gap-x-4 border-red-700"
          onClick={onBack}
        >
          <FaArrowLeft />
          Back
        </Button>
        <Button
          disabled={isDisabled}
          className="w-64 flex gap-x-4"
          onClick={onContinue}
        >
          <FaUser />
          Complete
        </Button>
      </div>
    </div>
  );
};
