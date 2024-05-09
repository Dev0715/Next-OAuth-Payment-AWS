"use client";

import { useState } from "react";
import { SwitchBox } from "@/components/utils/switch-box";

const AffiliateSettings = () => {
  const [isChecked] = useState<boolean>(false);

  return (
    <main className="w-full pl-8 flex flex-col gap-y-5">
      <SwitchBox
        title="Start an Affiliate's life"
        content="You can join as an affiliate and get an extra benefits"
        isChecked={isChecked}
      />
    </main>
  );
};

export default AffiliateSettings;
