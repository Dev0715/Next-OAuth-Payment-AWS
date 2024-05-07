"use client";

import { useState } from "react";
import { SwitchBox } from "@/components/utils/switch-box";
import EditCreator from "@/components/profile/edit-creator";

const CreatorSettings = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onSwitch = () => {
    // if (isChecked === false) {

    // }
    setIsChecked((prevState) => !prevState);
  };

  return (
    <main className="w-full pl-8 pb-6 flex flex-col gap-y-6">
      <SwitchBox
        title="Start Creator's Journey"
        content="You can start creator's journey here by making your profile"
        isChecked={isChecked}
        onCheckedChange={onSwitch}
        alertTitle={
          isChecked
            ? "Are you sure to close creator account?"
            : "Are you sure to create creator account?"
        }
      />
      <EditCreator disabled={!isChecked} />
    </main>
  );
};

export default CreatorSettings;
