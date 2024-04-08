import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { Navbar } from "../../app/profile/_components/navbar";

export default function EditAffiliate() {
  return (
    <main className="w-full flex flex-col">
      <Navbar title="Affiliate Registration" content="Register as an affiliate" />
    </main>
  );
}
