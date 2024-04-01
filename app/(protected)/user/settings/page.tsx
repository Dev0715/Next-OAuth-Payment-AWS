"use client";

import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <main className="w-full h-full pl-8 flex flex-col gap-y-5">
      <header className="flex flex-col gap-y-1">
        <p className="text-xl text-black font-medium drop-shadow-md">Settings</p>
        <p className="text-sm text-gray-600">
          Select how this site you want to serve you
        </p>
      </header>
      <Separator />
    </main>
  )
};

export default Settings;
