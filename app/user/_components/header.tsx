"use client";

import { GradientParagraph } from "@/components/utils/gradient-paragraph";

type HeaderParams = {
  title: string;
  content: string;
};

export const Header = ({ title, content }: HeaderParams) => {
  return (
    <header className="flex flex-col gap-y-1">
      <GradientParagraph className="text-xl text-black font-firs font-medium drop-shadow-md">
        {title}
      </GradientParagraph>
      <p className="font-firs text-sm text-gray-600">{content}</p>
    </header>
  );
};
