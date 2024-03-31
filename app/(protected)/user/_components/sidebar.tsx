"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { Separator } from "@/components/ui/separator";

export const Sdiebar = () => {
	const pathname = usePathname();

	return (
		<nav className="bg-secondary w-96 h-full">

		</nav>
	);
};
