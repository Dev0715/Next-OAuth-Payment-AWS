"use client"

import { Navbar } from "./_components/navbar";
import { useEffect, useState, useTransition } from "react";
import { CartProduct, Product } from "@/shared/types-product";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUserById } from "@/data/user/user-by-id";
import { getProductById } from "@/data/products/product-by-id";
import { CartItem } from "./_components/cart-item";
import { removeProductFromCart } from "@/actions/user/remove-product-from-cart";
import { ConfirmAlert } from "@/components/utils/confirm-alert";

type ProductInfo = {
  productType: string;
  productId: string;
}

export default function Cart() {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<CartItemType[]>([]);

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

  const onSelected = (index: number, checked: boolean) => {
    const newList = [...products];
    newList[index].selected = checked;
    setProducts(newList);
  }

  const onRemoveItem = (index: number) => {
    startTransition(() => {
      removeProductFromCart({
        userId: user?.id as string,
        product: {
          productType: products[index].productType,
          productId: products[index].productId
        }
      }).then(res => {
        if (res.success) {
          const newList = [...products];
          newList.splice(index, 1);
          setProducts(newList);
        }
      })
    })
  }

  const onCheckout = () => {

  }

  return (
    <main className="w-full flex flex-col pt-6">
      <Navbar isPending={isPending} title="Your Cart" content="Here are products in your cart" onCheckout={onCheckout} />
      <div className="w-full flex flex-wrap py-6">
        {products.map((product, index) => (
          <div key={index} className="w-1/2 p-2">
            <CartItem
              isPending={isPending}
              product={product}
              onSelected={(checked: boolean) => onSelected(index, checked)}
              onRemoveItem={() => onRemoveItem(index)}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
