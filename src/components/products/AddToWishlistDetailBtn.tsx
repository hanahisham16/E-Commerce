"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import addProductToWishlist, {
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "@/actions/wishlist.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { WishlistContext } from "@/context/WishlistContext";

function extractWishlistIds(data: unknown): string[] {
  if (!Array.isArray(data)) return [];
  return data
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const obj = item as { _id?: string; id?: string };
        return obj._id || obj.id || "";
      }
      return "";
    })
    .filter(Boolean);
}

export default function AddToWishlistDetailBtn({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const { handelWishlist } = useContext(WishlistContext)!;
  

  const syncWishlistStatus = useCallback(async () => {
    if (!productId) return;
    try {
      const res = await getLoggedUserWishlist();
      const ids = extractWishlistIds(res?.data);
      setIsWishlisted(ids.includes(productId));
      handelWishlist()
    } catch(error) {
      console.log(error);
      
    }
  }, [productId]);

  useEffect(() => {
    syncWishlistStatus();
  }, [syncWishlistStatus]);

  async function handleToggleWishlist() {
    if (!productId || isLoading) return;

    setIsLoading(true);
    try {
      if (isWishlisted) {
        const response = await removeProductFromWishlist(productId);
        const updatedIds = extractWishlistIds(response?.data);
        setIsWishlisted(
          response?.data ? updatedIds.includes(productId) : false
        );
        toast.success(response?.message || "Removed from your wishlist");
        handelWishlist()
      } else {
        const response = await addProductToWishlist(productId);
        const updatedIds = extractWishlistIds(response?.data);
        setIsWishlisted(
          response?.data ? updatedIds.includes(productId) : true
        );
        toast.success(response?.message || "Added to your wishlist");
        handelWishlist()
      }
      router.refresh();
    } catch (error:any) {
      console.error("Wishlist error:", error);
      toast.error(
        isWishlisted
          ? "Failed to remove from your wishlist"
          : "Product Failed To Add To Your Wishlist"
      );
        toast.error(error.message);
      router.push("/login")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isLoading || !productId}
      aria-pressed={isWishlisted}
      onClick={handleToggleWishlist}
      className={`h-12 flex-1 gap-2 transition ${
        isWishlisted
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
          : ""
      }`}
    >
      {isLoading ? (
        <>
          <Spinner />
          <span>{isWishlisted ? "Removing..." : "Adding..."}</span>
        </>
      ) : (
        <>
          <Heart
            className={`size-4 ${
              isWishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
          <span>{isWishlisted ? "Saved in Wishlist" : "Add to Wishlist"}</span>
        </>
      )}
    </Button>
  );
}