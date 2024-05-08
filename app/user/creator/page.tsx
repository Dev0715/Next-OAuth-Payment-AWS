"use client";

import { useState } from "react";
import { SwitchBox } from "@/components/utils/switch-box";
import EditCreator from "@/components/profile/edit-creator";
import { useAtom } from "jotai";
import { userAtom } from "@/store/user";
import { CreatorData } from "@/shared/types/user.type";
import { updateCreatorData } from "@/data/user";

const CreatorSettings = () => {
  const [user] = useAtom(userAtom);
  const [isChecked, setIsChecked] = useState<boolean>(
    user?.creator?.isCreator || false
  );

  const onSwitch = () => {
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

    updateCreatorData({
      userId: user?.userId as string,
      creatorData
    }).then((res) => {
      if (res) {
        setIsChecked(newState);
      }
    });
  };

  return (
    <main className="w-full pl-8 pb-6 flex flex-col gap-y-6">
      <SwitchBox
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
      <EditCreator disabled={!isChecked} />
    </main>
  );
};

export default CreatorSettings;
