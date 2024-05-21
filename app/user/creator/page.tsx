"use client";

import { useAtom } from "jotai";
import { useState, useTransition } from "react";

import EditCreator from "@/components/profile/edit-creator";
import { SwitchBox } from "@/components/utils/switch-box";
import { updateCreatorData } from "@/data/user";
import { CreatorData, User } from "@/shared/types/user.type";
import { userAtom } from "@/store/user";

const CreatorSettings = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState<boolean>(
    user?.creator?.isCreator || false
  );

  const onSwitch = () => {
    if (isPending) return;

    const newState = !isChecked;
    let creatorData = user?.creator;

    if (newState && !creatorData) {
      creatorData = {
        creatorId: user?.userId as string,
        isCreator: true
      };
    }

    creatorData = {
      ...creatorData,
      isCreator: newState
    } as CreatorData;

    startTransition(() => {
      updateCreatorData({
        userId: user?.userId as string,
        creatorData
      }).then((res) => {
        if (res) {
          setIsChecked(newState);
          setUser({
            ...user,
            creator: creatorData
          } as User);
        }
      });
    });
  };

  return (
    <main className="w-full pl-8 pb-6 flex flex-col gap-y-6">
      <SwitchBox
        disabled={isPending}
        title="Creator's Profile"
        content="You can turn on or off your creator profile"
        isChecked={isChecked}
        onCheckedChange={onSwitch}
        alertTitle={
          isChecked
            ? "Are you sure to close creator account?"
            : "Are you sure to open creator account?"
        }
      />
      <EditCreator disabled={!isChecked || isPending} />
    </main>
  );
};

export default CreatorSettings;
