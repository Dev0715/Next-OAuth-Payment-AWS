"use client";

import { Separator } from "@/components/ui/separator";
import { Header } from "../_components/header";

const Creator = () => {
  return (
    <main className="w-full h-full pl-8 flex flex-col gap-y-5">
      <Header title="Creator" content="Select how this site you want to serve you" />
      <Separator />
    </main>
  )
};

export default Creator;
