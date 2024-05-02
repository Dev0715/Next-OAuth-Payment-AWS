"use client";

import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { PRODUCT_TYPE_DISPLAY_TEXT } from "@/assets/product-types";

import type { ProductType } from "@/shared/types/product.type";

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
          {Object.keys(PRODUCT_TYPE_DISPLAY_TEXT).map((productType) => (
            <NavigationMenuItem key={productType}>
              <Link href={`/products/${productType}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {PRODUCT_TYPE_DISPLAY_TEXT[productType as ProductType]}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
