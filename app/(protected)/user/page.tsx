import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignupButton } from "@/components/auth/signup-button";
import { Separator } from "@/components/ui/separator";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"]
});

export default function Home() {
	return (
		<main className="w-full h-full px-8 flex flex-col gap-y-5">
			<header className="flex flex-col gap-y-1">
				<p className="text-xl text-black font-medium drop-shadow-md">Profile</p>
				<p className="text-sm text-gray-600">
					This is how others will see you on the site
				</p>
			</header>
			<Separator />
		</main>
	);
}
