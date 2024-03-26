"use client"

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaDiscord, FaApple } from "react-icons/fa";
import { Button } from '@/components/ui/button';

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => { }}
      >
        <FcGoogle className="h-5 w-4"/>
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => { }}
      >
        <FaGithub className="h-5 w-4"/>
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => { }}
      >
        <FaDiscord className="h-5 w-4"/>
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => { }}
      >
        <FaApple className="h-5 w-4"/>
      </Button>
    </div>
  )
}