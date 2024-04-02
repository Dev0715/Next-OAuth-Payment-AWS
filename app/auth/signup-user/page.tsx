import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { Navbar } from "../_components/navbar";

export default function SignUpUser() {
	return (
		<main className="w-full h-full flex flex-col">
			<Navbar title="User Registration" content="Register as a user" />
		</main>
	);
}
