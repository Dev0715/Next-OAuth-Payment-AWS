"use client";

import React, { useEffect } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import authConfig from "@/auth.config";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const Home = () => {
  // const tempImagePath = ["/profile-back-example.jpg", "/product-example.jpg", "/product-example-2.jpg"];

  // const imagesPosition = [
  //   "top-12 left-16 rotate-[6deg]",
  //   "top-64 left-6 rotate-[-12deg]",
  //   "top-[480px] left-16 rotate-[6deg]",
  //   "top-12 right-16 rotate-[-6deg]",
  //   "top-64 right-6 rotate-[12deg]",
  //   "top-[480px] right-16 rotate-[-6deg]",
  // ]

  const user = useCurrentUser();

  const onClick = () => {
    console.log(user);
  };

  return (
    <main className="relative w-full flex justify-center pt-24 pb-6">
      <Button onClick={onClick}> sadfsdaf </Button>
      {/* {imagesPosition.map(_style => (
        <Avatar className={`absolute w-96 h-56 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 blur-sm ${_style}`}>
          <AvatarImage
            src={tempImagePath[Math.floor(Math.random() * 100) % 3]}
            className="object-fill aspect-auto"
          />
          <AvatarFallback className="bg-sky-500">
            <div className="w-full h-full bg-green-700"></div>
          </AvatarFallback>
        </Avatar>
      ))} */}
      <div className="w-1/2 flex flex-col items-center gap-y-24 text-center">
        <h1
          className={cn(
            "text-7xl font-semibold text-green-700 drop-shadow-md",
            font.className
          )}
        >
          Bring your creative ideas to life!
        </h1>
        <div className="w-full space-y-4 text-left text-black text-lg">
          <p>
            /** This site is scheduled to launch officially on May 15th! - [
            Need to be updated ]
          </p>
          <p>
            You can bring creative features coming and Opt In to those programs.
            - [ Need to be updated ]
          </p>
          <p>
            You can pre-register as a customer and will get big benefits by
            being a early subscriber! **/
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-2xl font-bold">
            You can sign-up now as either a Seller or a User!
          </p>
          <Button
            className="w-1/2 animate-pulse"
            variant="default"
            asChild
            size="lg"
          >
            <Link href="/auth/register">Sign-Up Now</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
