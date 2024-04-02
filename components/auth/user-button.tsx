"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";

export const UserButton = () => {
  const user = useCurrentUser();

  if (!user) return (
    <Button asChild variant="default">
      <Link href="/auth/login">
        Login
      </Link>
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-16 h-16 rounded-xl">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <Link href="/user">
          <DropdownMenuItem>
            <PersonIcon className="h-4 w-4 mr-2" />
            <span>User Settings</span>
          </DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
