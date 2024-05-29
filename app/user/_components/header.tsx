"use client";

type HeaderParams = {
  title: string;
  content: string;
};

export const Header = ({ title, content }: HeaderParams) => {
  return (
    <header className="flex flex-col gap-y-1">
      <p className="text-xl text-black font-medium drop-shadow-md">{title}</p>
      <p className="text-sm text-gray-600">{content}</p>
    </header>
  );
};
