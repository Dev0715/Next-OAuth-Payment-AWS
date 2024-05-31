import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="w-full h-full pt-12 flex flex-col items-center justify-center">
      <h2 className="font-semibold">You are forbidden to access this page.</h2>
      <Button variant={"link"}>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
