import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { Navbar } from "../_components/navbar";

export default function Dashboard() {
	return (
		<main className="w-full flex pt-6">
			Dashboard Page - You can check various features here
		</main>
	);
}
