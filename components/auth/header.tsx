import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import { GradientParagraph } from "../utils/gradient-paragraph";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1
        className={cn(
          "flex items-center gap-x-2 text-3xl font-firs font-semibold",
          font.className
        )}
      >
        🔐
        <GradientParagraph className="font-firs">Auth</GradientParagraph>
      </h1>
      <p className="text-muted-foreground text-sm font-firs">{label}</p>
    </div>
  );
};
