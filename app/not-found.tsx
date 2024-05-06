import React from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";

const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1>404 - Not Found</h1>
      <Button variant={"link"}>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
