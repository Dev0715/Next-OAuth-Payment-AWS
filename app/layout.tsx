import { Provider as JotaiProvider } from "jotai";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

import { Header } from "./_components/header";
import LoadUser from "./_components/user-load";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to Kre8tive.io",
  description:
    "Kre8tive.io | Premier Digital Asset Marketplace | by 2Advanced Studios"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full h-auto p-12 flex flex-col items-center`}
      >
        <SessionProvider session={session}>
          <JotaiProvider>
            <Toaster />
            <LoadUser>
              <Header />
              {children}
            </LoadUser>
          </JotaiProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
