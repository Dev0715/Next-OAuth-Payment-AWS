import Link from "next/link";
import React from "react";

import { GradientButton } from "@/components/utils/gradient-button";

const NotFound = () => {
  return (
    <div className="w-full h-full pt-24 flex flex-col items-center justify-center gap-y-2">
      <h2 className="font-semibold">404 - Not Found</h2>
      <GradientButton variant={"link"}>
        <Link href="/">Go back home</Link>
      </GradientButton>
    </div>
  );
};

export default NotFound;
