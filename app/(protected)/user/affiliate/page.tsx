"use client";

import { Separator } from "@/components/ui/separator";
import { Header } from "../_components/header";

const Affiliate = () => {
  return (
    <main className="w-full pl-8 flex flex-col gap-y-5">
      <Header title="Affiliate" content="Select how this site you want to serve you" />
      <Separator />
    </main>
  )
};

export default Affiliate;
