"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { SignedUpData, User } from "@/shared/types-user";
import { v4 as uuidv4 } from "uuid";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { register } from "@/actions/auth/register/register";

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

  const onContinue = () => {
    startTransition(() => {
      setDisabled(true);
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
          setDisabled(false);
          if (res.success) {
            setConfirmTitle("Success");
            setConfirmMessage("A new creator was newly registerd!");
            moveStepForward();
          } else {
            setConfirmTitle("Error");
            setConfirmMessage(res.error as string);
          }
        });
      });
    });
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
