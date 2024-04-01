import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignupButton } from "@/components/auth/signup-button";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"]
});

export default function Home() {
	return (
		<main className="w-full h-full p-6">
			<header className="flex flex-col gap-y-2">
				<p className="text-3xl text-black font-medium drop-shadow-md">Settings</p>
				<p className="text-md text-gray-600">
					Manage your account settings set preferences.
				</p>
			</header>
		</main>
	);
}
