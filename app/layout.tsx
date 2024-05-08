import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider } from "jotai";

import { auth } from "@/auth";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "./_components/header";
import LoadUser from "./_components/user-load";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <JotaiProvider>
        <html lang="en">
          <Toaster />
          <body
            className={`${inter.className} w-full h-full flex flex-col items-center`}
          >
            <Header />
            {children}
            <LoadUser />
          </body>
        </html>
      </JotaiProvider>
    </SessionProvider>
  );
}
