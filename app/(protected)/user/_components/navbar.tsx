"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/user/server" ? "default" : "outline"}
        >
          <Link href="/user/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/user/client" ? "default" : "outline"}
        >
          <Link href="/user/client">Client</Link>
        </Button>
        <Button asChild variant={pathname === "/user/admin" ? "default" : "outline"}>
          <Link href="/user/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/user/settings" ? "default" : "outline"}
        >
          <Link href="/user/settings">Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
