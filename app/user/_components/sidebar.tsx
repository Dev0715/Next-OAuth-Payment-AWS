"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  const pathName = usePathname();

  const sidebarItems = [
    {
      name: "Profile",
      path: "/user"
    },
    {
      name: "Account",
      path: "/user/account"
    },
    {
      name: "Creator Settings",
      path: "/user/creator"
    },
    {
      name: "Customer Settings",
      path: "/user/customer"
    },
    {
      name: "Affiliate Settings",
      path: "/user/affiliate"
    },
    {
      name: "Subscription",
      path: "/user/subscription"
    }
  ];

  return (
    <div className="w-72 flex flex-col gap-y-2 items-start font-firs">
      {sidebarItems.map((item) =>
        pathName === item.path ? (
          <Button
            key={item.name}
            asChild
            variant="secondary"
            className="w-full justify-start bg-gray-200 hover:bg-gray-200"
          >
            <Link href={item.path}>{item.name}</Link>
          </Button>
        ) : (
          <Button
            key={item.name}
            asChild
            variant="link"
            className="w-full justify-start"
          >
            <Link href={item.path}>{item.name}</Link>
          </Button>
        )
      )}
    </div>
  );
};
