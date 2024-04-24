"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import { PRODCUT_TYPES } from "@/assets/product-types";

export const Navbar = () => {
  const productTypes = PRODCUT_TYPES;

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
          {productTypes.map((category, index) => (
            <NavigationMenuItem key={index}>
              <Link
                href={`/products/category/${category.key}`}
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {category.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
