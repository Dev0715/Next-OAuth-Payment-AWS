"use client";

import { useState, useTransition } from "react";
import { SwitchBox } from "@/components/utils/switch-box";
import { useAtom } from "jotai";
import { userAtom } from "@/store/user";
import { AffiliateData, User } from "@/shared/types/user.type";

const AffiliateSettings = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState<boolean>(
    user?.customer?.isCustomer || false
  );

  const onSwitch = () => {
    if (isPending) return;

    const newState = !isChecked;
    let affiliateData = user?.affiliate;

    if (newState && !affiliateData) {
      affiliateData = {
        affiliateId: user?.userId as string,
        isAffiliate: true
      };
    }

    affiliateData = {
      ...affiliateData,
      isAffiliate: newState
    } as AffiliateData;

    startTransition(() => {
      updateAffiliateData({
        userId: user?.userId as string,
        affiliateData
      }).then((res) => {
        if (res) {
          setIsChecked(newState);
          setUser({
            ...user,
            affiliate: affiliateData
          } as User);
        }
      });
    });
  };

  return (
    <main className="w-full pl-8 flex flex-col gap-y-5">
      <SwitchBox
        disabled={isPending}
        title="Affiliate Profile"
        content="you can turn on or off your affiliate profile"
        isChecked={isChecked}
        onCheckedChange={onSwitch}
        alertTitle={
          isChecked
            ? "Are you sure to close customer account?"
            : "Are you sure to create customer account?"
        }
      />
    </main>
  );
};

export default AffiliateSettings;
