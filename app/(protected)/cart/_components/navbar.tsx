"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaArrowRight } from "react-icons/fa";

interface PropsParams {
  title: string;
  content: string;
  onCheckout: () => void;
}

export const Navbar = ({ title, content, onCheckout }: PropsParams) => {
  return (
    <nav className="w-full flex flex-col gap-y-6 top-28">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-y-2">
          <p className="text-3xl text-black font-medium drop-shadow-md">{title}</p>
          <p className="text-md text-gray-600">{content}</p>
        </div>
        <Button variant="outline" className="flex items-center gap-x-2 border-green-700">
          <FaArrowRight />
          Go to Checkout
        </Button>
      </div>
      <Separator className="h-[1px]" />
    </nav >
  );
};
