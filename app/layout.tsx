import { Provider as JotaiProvider } from "jotai";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

import "./globals.css";
import "../styles/fonts.css";

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
    <SessionProvider session={session}>
      <JotaiProvider>
        <html lang="en">
          <Toaster />
          <body
            className={`${inter.className} w-full h-auto p-12 pb-6 flex flex-col items-center bg-[linear-gradient(90deg,rgba(86,63,121,0.4)_0%,rgba(49,131,207,0.4)_26%,rgba(204,155,201,0.4)_67%,rgba(92,68,101,0.4)_100%)]`}
          >
            <LoadUser>
              <Header />
              {children}
            </LoadUser>
          </body>
        </html>
      </JotaiProvider>
    </SessionProvider>
  );
}
