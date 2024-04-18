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
import { getUserById } from "@/data/user/user-by-id";
import { getProductById } from "@/data/products/product-by-id";
import { CartItem } from "./_components/cart-item";

type ProductInfo = {
  productType: string;
  productId: string;
}

interface CartItem extends Product {
  selected: boolean
}

export default function Cart() {
  const user = useCurrentUser();
  const [products, setProducts] = useState<CartItem[]>([]);

  useEffect(() => {
    let ignore = false;
    getUserById(user?.id as string).then(user => {
      if (!ignore && user && user.cart) {
        user.cart.map((product: ProductInfo) => {
          getProductById(product.productType, product.productId).then(res => {
            if (res) {
              setProducts(prev => [...prev, { ...res, selected: false }]);
            }
          })
        })
      }
    })
    return () => {
      ignore = true;
    }
  }, []);

  return (
    <main className="w-full flex flex-col pt-6">
      <Navbar title="Your Cart" content="Here are products in your cart" />
      <div className="w-full flex flex-wrap py-6">
        {products.map((product, index) => (
          <div key={index} className="w-1/2 p-2">
            <CartItem product={product} />
          </div>
        ))}
      </div>
    </main>
  );
}
