"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { Separator } from "@/components/ui/separator";

export const Sdiebar = () => {
	const pathName = usePathname();

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
			{sidebarItems.map((item) =>
				pathName === item.path ? (
					<div key={item.name} className="w-full flex text-left">
						<Link href={item.path} className="font-semibold">
							{item.name}
						</Link>
					</div>
				) : (
					<Button key={item.name} asChild variant="link">
						<Link href={item.path} className="font-semibold">{item.name}</Link>
					</Button>
				))
			}
		</section >
	);
};
