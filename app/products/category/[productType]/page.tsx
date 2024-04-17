"use client"

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { ProductItem } from "@/components/product/product-item";
import { Navbar } from "../../_components/navbar";
import { useEffect, useState } from "react";
import { Product } from "@/shared/product-interface";
import { getAllProducts } from "@/data/products/all-products";
import { getProductsByType } from "@/data/products/products-by-type";

type ParamsType = {
  params: {
    productType: string;
  }
}

export default function Products({ params }: ParamsType) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsByType(params.productType).then(res => {
      console.log(res);
      setProducts(res.items);
    })
  }, []);

  return (
    <main className="w-full flex flex-col pt-6">

    </main>
  );
}
