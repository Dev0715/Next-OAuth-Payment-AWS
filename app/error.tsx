"use client";

import { useEffect } from "react";

import { GradientButton } from "@/components/utils/gradient-button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <p>Something went wrong!</p>
          <p>You can check console tab for more details.</p>
        </div>
        <GradientButton variant={"link"} onClick={reset} className="text-md">
          Try again
        </GradientButton>
      </div>
    </div>
  );
}
