"use client";

import { Navbar } from "./_components/navbar";
import { useEffect, useState, useTransition } from "react";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import { getUserById } from "@/data/user";
import { getProductById } from "@/data/product";
import { CartItem } from "./_components/cart-item";
import { removeProductFromCart } from "@/actions/user/remove-product-from-cart";
import { ConfirmAlert } from "@/components/utils/confirm-alert";

import type { CartProduct } from "@/shared/types/product.type";

type ProductInfo = {
  productType: string;
  productId: string;
};

export default function Cart() {
  const [user] = useAtom(userAtom);
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [confirmingTitle, setConfirmingTitle] = useState<string>("");
  const [confirmingMessage, setConfirmingMessage] = useState<string>("");

  useEffect(() => {
    let ignore = false;
    getUserById(user?.userId as string).then((user) => {
      if (!ignore && user && user.customer?.cart) {
        user.customer.cart.map((product: ProductInfo) => {
          getProductById(product.productType, product.productId).then((res) => {
            if (res) {
              setProducts((prev) => [...prev, { ...res, selected: false }]);
            }
          });
        });
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const onSelected = (index: number, checked: boolean) => {
    const newList = [...products];
    newList[index].selected = checked;
    setProducts(newList);
  };

  const setRemoveConfirming = (success: boolean) => {
    setConfirming(true);
    if (success) {
      setConfirmingTitle("Success");
      setConfirmingMessage("1 product was removed successfully from your cart");
    } else {
      setConfirmingTitle("Failure");
      setConfirmingMessage(
        "An error occurred while removing product from cart"
      );
    }
  };

  const onRemoveItem = (index: number) => {
    startTransition(() => {
      removeProductFromCart({
        userId: user?.userId as string,
        product: {
          productType: products[index].productType,
          productId: products[index].productId
        }
      })
        .then((res) => {
          if (res.success) {
            const newList = [...products];
            newList.splice(index, 1);
            setProducts(newList);
            setRemoveConfirming(true);
          } else {
            setRemoveConfirming(false);
          }
        })
        .catch(() => {
          setRemoveConfirming(false);
        });
    });
  };

  const onCheckout = () => {
    // @ CHECK FIRST
    // Whether one of these products is already purchased
  };

  return (
    <main className="w-full p-6 flex flex-col">
      <ConfirmAlert
        open={isConfirming}
        title={confirmingTitle}
        message={confirmingMessage}
        onOK={() => setConfirming(false)}
      />
      <Navbar
        isPending={isPending}
        title="Your Cart"
        content="Here are products in your cart"
        onCheckout={onCheckout}
      />
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
