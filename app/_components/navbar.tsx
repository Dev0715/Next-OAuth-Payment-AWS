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
import { ListItem } from "@/components/list-item";

type MenuItem = {
  title: string;
  href: string;
};

export const Navbar = () => {
  const menuList: MenuItem[] = [
    {
      title: "Fonts",
      href: "/product/Fonts"
    },
    {
      title: "PNGs",
      href: "/product/PNGs"
    },
    {
      title: "Graphics",
      href: "/product/Graphics"
    },
    {
      title: "3D",
      href: "/product/3D"
    },
    {
      title: "Spark",
      href: "/product/Spark"
    },
    {
      title: "Crafts",
      href: "/product/Crafts"
    },
    {
      title: "Templates",
      href: "/product/Templates"
    },
    {
      title: "Themes",
      href: "/product/Themes"
    },
    {
      title: "Illustrations",
      href: "/product/Illustrations"
    },
    {
      title: "Mockups",
      href: "/product/Mockups"
    },
    {
      title: "Videos",
      href: "/product/Videos"
    },
  ]
  return (
    <nav className="w-full flex items-end py-2 sticky top-6 z-50 box-border border-b-[1px]">
      <NavigationMenu>
        <NavigationMenuList>
          {menuList.map((menuItem, index) => (
            <NavigationMenuItem key={menuItem.title}>
              <NavigationMenuTrigger>{menuItem.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

