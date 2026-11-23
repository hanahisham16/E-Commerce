"use client";
import { getLoggedUserWishlist } from "@/actions/wishlist.actions";
import { WishlistI} from "@/types/wishlist.type";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

type WishlistContexttype = { noOfWishlistItems: number; handelWishlist: () => void };
export const WishlistContext = createContext<WishlistContexttype | null>(null);

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noOfWishlistItems, setNoOfWishlistItems] = useState(0);
  const { status } = useSession();

  async function handelWishlist() {
    try {
      const response: WishlistI = await getLoggedUserWishlist();
      console.log(response.data.length);
      
      setNoOfWishlistItems(response.data.length);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (status === "authenticated") {
      handelWishlist();
    }
  }, [status]);
  return (
    <>
      <WishlistContext.Provider value={{ noOfWishlistItems, handelWishlist }}>
        {children}
      </WishlistContext.Provider>
    </>
  );
}
