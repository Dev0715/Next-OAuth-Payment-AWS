"use client";

import { useEffect, useState } from "react";
import { SwitchBox } from "@/components/utils/switch-box";
import EditCreator from "@/components/profile/edit-creator";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUserById } from "@/data/user";
import { CreatorInterface } from "@/shared/user";

const CreatorSettings = () => {
  const user = useCurrentUser();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [creator, setCreator] = useState<CreatorInterface>();

  const onSwitch = () => {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    if (user) {
      getUserById(user.id).then(data => {
        setCreator(data);
      });
    }
  }, []);

  return (
    <main className="w-full pl-8 pb-6 flex flex-col gap-y-6">
      <SwitchBox
        title="Start Creator's Journey"
        content="You can start creator's journey here by making your profile"
        isChecked={isChecked}
        onCheckedChange={onSwitch}
        alertTitle={isChecked ?
          "Are you sure to close creator account?" :
          "Are you sure to create creator account?"
        }
      />
      <EditCreator disabled={!isChecked} />
    </main>
  )
};

export default CreatorSettings;
