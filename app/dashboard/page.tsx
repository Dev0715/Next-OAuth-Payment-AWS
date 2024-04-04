import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { Navbar } from "../_components/navbar";

export default function Manage() {
	return (
		<main className="w-full flex pt-6">
			Management Page - You can manage products here
		</main>
	);
}
