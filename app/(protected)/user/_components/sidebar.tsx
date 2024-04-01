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
			path: "/user"
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
		<section className="w-72 h-full flex flex-col gap-y-2 items-start">
			{sidebarItems.map((item) =>
				pathName === item.path ? (
					<Button key={item.name} asChild variant="secondary" className="w-full justify-start bg-gray-200 hover:bg-gray-200">
						<Link href={item.path} className="text-base">{item.name}</Link>
					</Button>
				) : (
					<Button key={item.name} asChild variant="link" className="w-full justify-start">
						<Link href={item.path} className="text-base">{item.name}</Link>
					</Button>
				))
			}
		</section >
	);
};
