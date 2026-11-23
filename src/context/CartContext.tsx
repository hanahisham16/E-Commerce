"use client";
import { getLoggedUserCart } from "@/actions/cart.actions";
import { CartDataI } from "@/types/cart.type";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

type CartContexttype = {
  noOfCartItems: number;
  setNoOfCartItems: React.Dispatch<React.SetStateAction<number>>;
  handelCart: () => void;
};

export const CartContext = createContext<CartContexttype | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const { status } = useSession();

  async function handelCart() {
    try {
      const response: CartDataI = await getLoggedUserCart();
      const noOfItems = response.data.products.reduce(
        (acc, product) => acc + product.count,
        0,
      );
      setNoOfCartItems(noOfItems);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      handelCart();
    }
  }, [status]);

  return (
    <CartContext.Provider
      value={{ noOfCartItems, setNoOfCartItems, handelCart }}
    >
      {children}
    </CartContext.Provider>
  );
}