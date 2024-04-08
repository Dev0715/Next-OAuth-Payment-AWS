"use client";

import { SwitchBox } from "@/components/utils/switch-box";
import EditCustomer from "@/components/profile/edit-customer";
import { useState } from "react";

const CustomerSettings = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onSwitch = () => {
    setIsChecked(!isChecked);
  }

  return (
    <main className="w-full pl-8 pb-6 flex flex-col gap-y-6">
      <SwitchBox
        title="Join as a Customer"
        content="You can join as a customer and expore millions of creative works"
        isChecked={isChecked}
        onCheckedChange={onSwitch}
        alertTitle={isChecked ?
          "Are you sure to close customer account?" :
          "Are you sure to create customer account?"
        }
      />
      <EditCustomer disabled={!isChecked} />
    </main>
  )
};

export default CustomerSettings;
