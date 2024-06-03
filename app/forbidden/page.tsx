import Link from "next/link";
import React from "react";

import { GradientButton } from "@/components/utils/gradient-button";

const NotFound = () => {
  return (
    <div className="w-full h-full pt-12 flex flex-col items-center justify-center">
      <h2 className="font-semibold">You are forbidden to access this page.</h2>
      <GradientButton variant={"link"}>
        <Link href="/">Go back home</Link>
      </GradientButton>
    </div>
  );
};

export default NotFound;
