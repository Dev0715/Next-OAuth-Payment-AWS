"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

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
      <div className="flex flex-col gap-y-2">
        <p>Something went wrong!</p>
        <p>You can check console tab for more details.</p>
      </div>
      <Button variant={"link"} onClick={reset} className="text-md">
        Try again
      </Button>
    </div>
  );
}
