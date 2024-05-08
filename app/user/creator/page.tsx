"use client";

import { useState } from "react";
import { SwitchBox } from "@/components/utils/switch-box";
import EditCreator from "@/components/profile/edit-creator";
import { useAtom } from "jotai";
import { userAtom } from "@/store/user";

const CreatorSettings = () => {
  const [user] = useAtom(userAtom);
  const [isChecked, setIsChecked] = useState<boolean>(
    user?.creator?.isCreator || false
  );

  const onSwitch = () => {
    setIsChecked((prevState) => !prevState);
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
