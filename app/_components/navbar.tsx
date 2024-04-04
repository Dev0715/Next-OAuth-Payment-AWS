"use client";

import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaSignal } from "react-icons/fa";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react";

export const Navbar = () => {
  return (
    <nav className="w-full pb-6 flex items-end bg-gray-50 sticky top-6 box-border z-50">
      <div className="w-full flex">
        <div className="w-full flex items-end gap-4">
          <Avatar className="w-16 h-16 rounded-xl">
            <AvatarImage src="/logo.svg" />
            <AvatarFallback className="bg-sky-500">
              <FaSignal className="text-white" />
            </AvatarFallback>
          </Avatar>

          <Link href="/">
            <p className="text-4xl font-semibold text-black drop-shadow-md">Kre8tive</p>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/manage" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Manage
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <UserButton />
    </nav>
  );
};
