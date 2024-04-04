"use client";

import { Separator } from "@/components/ui/separator";

interface PropsParams {
    title: string;
    content: string
}

export const Navbar = ({ title, content }: PropsParams) => {
    return (
        <nav className="w-full flex flex-col gap-y-6 sticky top-28 z-50 bg-gray-50">
            <div className="flex flex-col gap-y-2">
                <p className="text-3xl text-black font-medium drop-shadow-md">{title}</p>
                <p className="text-md text-gray-600">{content}</p>
            </div>
            <Separator className="h-[1px]" />
        </nav >
    );
};
