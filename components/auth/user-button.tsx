"use client";

import {
  ExitIcon,
  MixerHorizontalIcon,
  PersonIcon
} from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCartArrowDown,
  FaLayerGroup,
  FaToolbox,
  FaUser
} from "react-icons/fa";

import { LogoutButton } from "@/components/auth/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/data/user";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useLinkFromS3 } from "@/hooks/use-link-from-s3";
import { cartAtom } from "@/store/cart";
import { userAtom } from "@/store/user";

import { GradientButton } from "../utils/gradient-button";

export const UserButton = () => {
  const [user] = useAtom(userAtom);
  const userRole = useCurrentRole();
  const { getLinkFromS3 } = useLinkFromS3();

  const [avatarImage, setAvatarImage] = useState<string>("");
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    if (!user) return;

    if (!avatarImage) {
      if (user.image) {
        setAvatarImage(user.image);
      } else if (user.avatar) {
        getLinkFromS3(user.avatar).then((res) => {
          if (res.success) setAvatarImage(res.response as string);
        });
      }
    }

    if (!cart) {
      getUserById(user.userId).then((res) => {
        if (res) {
          setCart(res?.customer?.cart || []);
        }
      });
    }
  }, [user, avatarImage, cart, setCart, getLinkFromS3]);

  if (!user) {
    return (
      <div className="flex items-center gap-x-2">
        <GradientButton label="Signup" />
        <GradientButton label="Login" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-4">
      {user.customer && cart && cart.length ? (
        <Button asChild variant={"ghost"} className="p-0 rounded-full">
          <Link href={"/cart"}>
            <div className="relative w-10 h-10 flex items-center justify-center cursor-pointer">
              <FaCartArrowDown className="text-xl" />
              <span className="absolute -top-[2px] -right-[2px] w-5 h-5 flex items-center justify-center rounded-full bg-red-700 text-xs text-white">
                {cart.length}
              </span>
            </div>
          </Link>
        </Button>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="rounded-xl">
            <AvatarImage src={avatarImage} />
            <AvatarFallback className="bg-sky-500 rounded-xl">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          {userRole.isManager && (
            <>
              <Link href={`/admin`}>
                <DropdownMenuItem>
                  <FaToolbox className="h-4 w-4 mr-3" />
                  <span>Admin Panel</span>
                </DropdownMenuItem>
              </Link>
              <Separator />
            </>
          )}
          {userRole.isCreator && (
            <>
              <Link href={`/creator/${user.userId}`}>
                <DropdownMenuItem>
                  <PersonIcon className="h-4 w-4 mr-3" />
                  <span>Creator Profile</span>
                </DropdownMenuItem>
              </Link>
              <Separator />
            </>
          )}
          {userRole.isCustomer && (
            <>
              <Link href="/user">
                <DropdownMenuItem>
                  <MixerHorizontalIcon className="h-4 w-4 mr-3" />
                  <span>User Settings</span>
                </DropdownMenuItem>
              </Link>
              <Separator />
            </>
          )}
          <Link href="/bundles">
            <DropdownMenuItem>
              <FaLayerGroup className="h-4 w-4 mr-3" />
              <span>Bundles</span>
            </DropdownMenuItem>
          </Link>
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
