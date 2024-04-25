"use client";

import Link from "next/link";
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import {
  ExitIcon,
  MixerHorizontalIcon,
  PersonIcon
} from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { LoginButton } from "./login-button";
import { SignupButton } from "./signup-button";
import { useEffect, useState } from "react";
import { getS3ImageLink } from "@/actions/s3/image-link";
import { useAtom } from "jotai";
import { cartAtom } from "@/store/cart";
import { getUserById } from "@/data/user/user-by-id";
import { Button } from "../ui/button";

export const UserButton = () => {
  const user = useCurrentUser();

  const [avatarImage, setAvatarImage] = useState<string>("");
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    if (!user) return;

    if (user.image) {
      setAvatarImage(user.image);
    } else if (user.avatar) {
      getS3ImageLink(user.avatar).then((res) => {
        if (res.success) setAvatarImage(res.response as string);
      });
    }

    if (!cart) {
      getUserById(user.userId).then((res) => {
        if (res) {
          setCart(res?.cart || []);
        }
      });
    }
  }, [user]);

  if (!user)
    return (
      <div className="flex items-center gap-x-2">
        <LoginButton>
          {/* <WrappedButton variant="default" size="lg"> */}
          <p className="text-md font-medium">Log in</p>
          {/* </WrappedButton> */}
        </LoginButton>
        <p className="text-gray-400">|</p>
        <SignupButton>
          <p className="text-md font-medium">Sign up</p>
        </SignupButton>
      </div>
    );

  return (
    <div className="flex items-center gap-x-4">
      <Button asChild variant={"ghost"} className="p-0 rounded-full">
        <Link href={"/cart"}>
          <div className="relative w-10 h-10 flex items-center justify-center cursor-pointer">
            <FaCartArrowDown className="text-xl" />
            {cart && cart.length ? (
              <span className="absolute -top-[2px] -right-[2px] w-5 h-5 flex items-center justify-center rounded-full bg-red-700 text-xs text-white">
                {cart.length}
              </span>
            ) : null}
          </div>
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="rounded-xl">
            <AvatarImage src={avatarImage} />
            <AvatarFallback className="bg-sky-500 rounded-xl">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          {user.creator && (
            <Link href={`/profile/creator/${user.userId}`}>
              <DropdownMenuItem>
                <PersonIcon className="h-4 w-4 mr-3" />
                <span>Creator Profile</span>
              </DropdownMenuItem>
            </Link>
          )}
          {user.customer && (
            <Link href="/user">
              <DropdownMenuItem>
                <MixerHorizontalIcon className="h-4 w-4 mr-3" />
                <span>User Settings</span>
              </DropdownMenuItem>
            </Link>
          )}
          <Link href="/cart">
            <DropdownMenuItem>
              <FaCartArrowDown className="h-4 w-4 mr-3" />
              <span>Your Cart</span>
            </DropdownMenuItem>
          </Link>
          <LogoutButton>
            <DropdownMenuItem>
              <ExitIcon className="h-4 w-4 mr-3" />
              <span>Logout</span>
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
