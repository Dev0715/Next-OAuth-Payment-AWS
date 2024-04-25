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
    // const scraped: any = {};

    const user: User = {
      userId: userData.generalDetails.username,
      username: userData.generalDetails.username,
      email: userData.generalDetails.email,
      password: userData.generalDetails.password,
      firstname: userData.generalDetails.firstname,
      lastname: userData.generalDetails.lastname,
      phone1: userData.generalDetails.phone1,
      phone2: userData.generalDetails.phone2,
      address: {
        address1: userData.generalDetails.address1,
        address2: userData.generalDetails.address2,
        city: userData.generalDetails.city,
        postal: userData.generalDetails.postal,
        country: userData.generalDetails.country
      },

      creator: {
        isCreator: true,
        creatorId: uuidv4(),
        bio: userData.creatorDetails.bio,
        typeOfUser: userData.creatorDetails.typeOfUser,
        websites: []
      }
    };

    if (user.creator && userData.creatorDetails.companyName) {
      user.creator["company"] = {
        name: userData.creatorDetails.companyName,
        country: userData.creatorDetails.companyCountry,
        website: userData.creatorDetails.companyWebsite
      };
    }

    if (user.creator?.websites) {
      if (userData.creatorDetails.website1)
        user.creator.websites.push(userData.creatorDetails.website1);
      if (userData.creatorDetails.website2)
        user.creator.websites.push(userData.creatorDetails.website2);
      if (userData.creatorDetails.website3)
        user.creator.websites.push(userData.creatorDetails.website3);
      if (userData.creatorDetails.website4)
        user.creator.websites.push(userData.creatorDetails.website4);
      if (userData.creatorDetails.website5)
        user.creator.websites.push(userData.creatorDetails.website5);
    }

    return user;
  };

  const onContinue = () => {
    setDisabled(true);
    const user = getCreatorData();

    uploadImages().then((pathList) => {
      if (userData.creatorDetails.avatar) {
        if (pathList.length > 0) {
          user.avatar = pathList[0];
        }
        if (userData.creatorDetails.cover) {
          if (pathList.length > 1 && user.creator) {
            user.creator.cover = pathList[1];
          }
        }
      } else if (userData.creatorDetails.cover) {
        if (pathList.length > 0 && user.creator) {
          user.creator.cover = pathList[0];
        }
      }

      register(user)
        .then((res) => {
          setDisabled(false);
          setConfirmOpen(true);
          if (res.success) {
            setConfirmTitle("Success");
            setConfirmMessage("A new creator was newly registerd!");
          } else {
            setConfirmTitle("Error");
            setConfirmMessage(res.error as string);
          }
        })
        .catch((error) => {
          setConfirmOpen(true);
          setConfirmTitle("Error");
          setConfirmMessage("Internal Server Error!");
        });
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
