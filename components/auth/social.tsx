"use client";

import { signIn } from "next-auth/react";
import { FcAddressBook } from "react-icons/fc";
import { FaGithub, FaDiscord, FaApple, FaArtstation } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "adobe" | "github" | "discord" | "epicgames") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          onClick("adobe");
        }}
      >
        <FcAddressBook className="h-5 w-4" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          onClick("github");
        }}
      >
        <FaGithub className="h-5 w-4" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          onClick("discord");
        }}
      >
        <FaDiscord className="h-5 w-4" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          onClick("epicgames");
        }}
      >
        <FaArtstation className="h-5 w-4" />
      </Button>
    </div>
  );
};
