"use client";

import Link from "next/link";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { PRODUCT_TYPE_DISPLAY_TEXT } from "@/shared/constants/product.constant";

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
          {Object.entries(PRODUCT_TYPE_DISPLAY_TEXT).map(
            ([productType, text]) => (
              <NavigationMenuItem key={productType}>
                <Link href={`/products/${productType}`} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {text}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
