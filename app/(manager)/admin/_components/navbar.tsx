"use client";

import { Separator } from "@/components/ui/separator";
import { GradientParagraph } from "@/components/utils/gradient-paragraph";

interface PropsParams {
  title: string;
  content: string;
}

export const Navbar = ({ title, content }: PropsParams) => {
  return (
    <nav className="w-full flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2 font-firs">
        <GradientParagraph className="text-2xl text-black font-firs font-medium drop-shadow-md">
          {title}
        </GradientParagraph>
        <p className="text-md text-gray-600">{content}</p>
      </div>
      <Separator className="h-[1px]" />
    </nav>
  );
};
