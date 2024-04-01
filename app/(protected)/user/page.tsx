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

		</main>
	);
}
