"use client";

import Link from "next/link";

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
import { ListItem } from "@/components/utils/list-item";
import { PRODCUT_TYPES } from "@/shared/product-info";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="w-full flex items-end py-2 top-6 box-border border-b-[1px]">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-wrap justify-start gap-y-1">
          <NavigationMenuItem>
            <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                All
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {PRODCUT_TYPES.map((menuItem, index) => (
            <NavigationMenuItem key={index}>
              <Link href={`/products/category/${menuItem}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {menuItem}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

