"use client";

import { SwitchBox } from "@/components/utils/switch-box";
import EditCustomer from "@/components/profile/edit-customer";
import { useState, useTransition } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/user";
import { CustomerData, User } from "@/shared/types/user.type";
import { updateCustomerData } from "@/data/user";

const CustomerSettings = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState<boolean>(
    user?.customer?.isCustomer || false
  );

  const onSwitch = () => {
    if (isPending) return;

    const newState = !isChecked;
    let customerData = user?.customer;

    if (newState && !customerData) {
      customerData = {
        customerId: user?.userId as string,
        isCustomer: true
      };
    }

    customerData = {
      ...customerData,
      isCustomer: newState
    } as CustomerData;

    startTransition(() => {
      updateCustomerData({
        userId: user?.userId as string,
        customerData
      }).then((res) => {
        if (res) {
          setIsChecked(newState);
          setUser({
            ...user,
            customer: customerData
          } as User);
        }
      });
    });
  };

  return (
    <main className="w-full pl-8 pb-6 flex flex-col gap-y-6">
      <SwitchBox
        disabled={isPending}
        title="Customer Profile"
        content="you can turn on or off your creator profile"
        isChecked={isChecked}
        onCheckedChange={onSwitch}
        alertTitle={
          isChecked
            ? "Are you sure to close customer account?"
            : "Are you sure to create customer account?"
        }
      />
      <EditCustomer disabled={!isChecked} />
    </main>
  );
};

export default CustomerSettings;
