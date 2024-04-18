"use client"

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { ProductItem } from "@/components/product/product-item";
import { Navbar } from "./_components/navbar";
import { useEffect, useState } from "react";
import { Product } from "@/shared/product-interface";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function Cart() {
  const user = useCurrentUser();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

  }, []);

  return (
    <main className="w-full flex flex-col pt-6">
      <Navbar title="Your Cart" content="Here are products in your cart" />
      <div className="w-full flex flex-wrap py-6">

      </div>
    </main>
  );
}
