"use client";

import { Input } from "@/components/ui/input";
import { Navbar } from "../../_components/navbar";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const NewBundlePage = () => {
  const [title, setTitle] = useState<string>("");

  const onCreateBundle = () => {
    console.log("Create bundle");
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <Navbar title="New Bundle" content="Create a new bundle" />
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <p className="text-xl">Title for bundle</p>
          <Input className="w-96" placeholder="Enter title" />
        </div>
        <Button
          className="w-48 flex gap-x-2 rounded-none"
          onClick={onCreateBundle}
        >
          <FaArrowRight />
          Create
        </Button>
      </div>
    </div>
  );
};

export default NewBundlePage;
