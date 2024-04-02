import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { Navbar } from "../_components/navbar";

export default function SignUpCreator() {
	return (
		<main className="flex h-full flex-col">
			<Navbar title="Creator Registration" content="Register as a creator" />
		</main>
	);
}
