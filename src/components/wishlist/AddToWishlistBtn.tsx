"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import addProductToWishlist, {
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "@/actions/wishlist.actions";
import { Button } from "../ui/button";
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

export default function AddToWishlistBtn({ productId }: { productId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { handelWishlist } = useContext(WishlistContext)!;

  const syncWishlistStatus = useCallback(async () => {
    if (!productId) return;
    try {
      const res = await getLoggedUserWishlist();
      const ids = extractWishlistIds(res?.data);
      setIsWishlisted(ids.includes(productId));
    } catch {}
  }, [productId]);

  useEffect(() => {
    syncWishlistStatus();

    const handlePageShow = () => {
      syncWishlistStatus();
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [syncWishlistStatus]);

  async function toggleWishlist() {
    if (!productId || isLoading) return;

    setIsLoading(true);
    try {
      if (isWishlisted) {
        const response = await removeProductFromWishlist(productId);
        const updatedIds = extractWishlistIds(response?.data);

        setIsWishlisted(
          response?.data ? updatedIds.includes(productId) : false,
        );
        toast.success(response?.message || "Removed from your wishlist");
        handelWishlist();
      } else {
        const response = await addProductToWishlist(productId);
        const updatedIds = extractWishlistIds(response?.data);

        setIsWishlisted(response?.data ? updatedIds.includes(productId) : true);
        toast.success(response?.message || "Added to your wishlist");
        handelWishlist();
      }
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(
        isWishlisted
          ? "Failed to remove from your wishlist"
          : "Product Failed To Add To Your Wishlist",
      );
      toast.error(error.message);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      disabled={isLoading}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={isWishlisted}
      onClick={toggleWishlist}
      className={`h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm ${
        isWishlisted
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-white text-gray-600 hover:bg-gray-50 hover:text-red-500"
      }`}
    >
      <Heart
        size={18}
        className={isWishlisted ? "fill-red-500 text-red-500" : ""}
      />
    </Button>
  );
}
