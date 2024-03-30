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
    <main className="flex h-full flex-col p-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="w-full flex">
        <div className="w-full flex items-end gap-4">
          <img src="./logo.svg" width="60" height="60" />
          <p className="text-4xl font-semibold text-white drop-shadow-md">Kre8tive Logo</p>
        </div>
      </div>
      <div className="w-full h-full flex justify-center pt-64">
        <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-4xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          ⌛ Coming Soon
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <p className="text-white text-lg">A simple authentication service</p>
        <div>
          <SignupButton>
            <Button variant="secondary" size="lg">
              Sign-Up Now
            </Button>
          </SignupButton>
        </div>
      </div>
      </div>
    </main>
  );
}
