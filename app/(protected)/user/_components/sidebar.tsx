"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { Separator } from "@/components/ui/separator";

export const Sdiebar = () => {
	const pathname = usePathname();
	console.log(pathname);

	const sidebarItems = [
		{
			name: "Profile",
			path: "/user/profile"
		},
		{
			name: "Account",
			path: "/user/account"
		},
		{
			name: "Settings",
			path: "/user/settings"
		}
	];

	return (
		<section className="w-96 h-full flex flex-col gap-y-2 items-start">
			{sidebarItems.map((item) => (
				<Button asChild variant="link">
					<Link href="/login">Login</Link>
				</Button>
			))}
		</section>
	);
};
