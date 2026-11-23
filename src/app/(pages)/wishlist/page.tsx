"use client";

import Link from "next/link";
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "@/actions/wishlist.actions";
import addProductToCart from "@/actions/cart.actions";
import { WishlistProductI } from "@/types/wishlist.type";
import { WishlistContext } from "@/context/WishlistContext";
import { CartContext } from "@/context/CartContext";

export default function WishListPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistProductI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);
  const { handelWishlist } = useContext(WishlistContext)!;
  const { handelCart } = useContext(CartContext)!;

  async function getWishlist() {
    setIsLoading(true);
    try {
      const response = await getLoggedUserWishlist();
      const items: WishlistProductI[] = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.products)
          ? response.data.products
          : [];
      handelWishlist();
      setWishlistItems(items);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  async function handleRemove(productId: string) {
    try {
      setRemovingId(productId);
      const response = await removeProductFromWishlist(productId);
      toast.success(response?.message || "Removed from wishlist");
      setWishlistItems((prev) =>
        prev.filter((item) => (item._id || item.id) !== productId),
      );
      handelWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    } finally {
      setRemovingId(null);
    }
  }

  async function handleAddToCart(productId: string) {
    try {
      setAddingId(productId);
      const response = await addProductToCart(productId);
      if (response?.status === "fail" || response?.statusMsg === "fail") {
        toast.error(response?.message || "Failed to add to cart");
        return;
      }
      toast.success(response?.message || "Added to cart successfully");
      handelCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col gap-4 justify-center items-center">
        <h2 className="text-3xl text-emerald-600 font-bold">
          Loading wishlist...
        </h2>
        <Spinner className="text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Wishlist</span>
      </nav>

      <div className="flex items-center gap-3.5 mb-7">
        <div className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-500 border border-red-100">
          <Heart className="size-5 fill-red-500 text-red-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            My Wishlist
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 px-4 text-center shadow-2xs">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Heart className="size-7" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Your wishlist is empty
          </h2>
          <p className="mt-1.5 max-w-sm text-xs text-muted-foreground">
            Save your favorite items while browsing so you can easily find them
            later.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#16a34a] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#15803d] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-2xs">
          <div className="hidden md:grid md:grid-cols-12 items-center border-b border-gray-100 bg-gray-50/50 px-6 py-3.5 text-xs font-medium text-muted-foreground">
            <div className="md:col-span-6">Product</div>
            <div className="md:col-span-2 text-center">Price</div>
            <div className="md:col-span-2 text-center">Status</div>
            <div className="md:col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {wishlistItems.map((item) => {
              const id = item._id || item.id || "";
              const isRemoving = removingId === id;
              const isAdding = addingId === id;
              const isItemBusy = isRemoving || isAdding;
              const isInStock = (item.quantity ?? 1) > 0;
              const hasDiscount =
                typeof item.priceAfterDiscount === "number" &&
                item.priceAfterDiscount > 0 &&
                item.priceAfterDiscount < item.price;

              const displayPrice = hasDiscount
                ? item.priceAfterDiscount!
                : item.price;

              return (
                <div
                  key={id}
                  className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 px-6 py-5 hover:bg-gray-50/40 transition-colors"
                >
                  <div className="md:col-span-6 flex items-center gap-4 min-w-0">
                    <Link
                      href={`/products/${id}`}
                      className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50/60 p-1.5 overflow-hidden"
                    >
                      <Image
                        src={item.imageCover}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="size-full object-contain"
                      />
                    </Link>

                    <div className="min-w-0">
                      <Link
                        href={`/products/${id}`}
                        className="block truncate text-sm font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
                      >
                        {item.title}
                      </Link>
                      {item.category?.name && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.category.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2 flex md:flex-col items-center justify-between md:justify-center gap-1">
                    <span className="text-xs text-muted-foreground md:hidden">
                      Price:
                    </span>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">
                        {displayPrice.toLocaleString()} EGP
                      </p>
                      {hasDiscount && (
                        <p className="text-[11px] text-muted-foreground line-through">
                          {item.price.toLocaleString()} EGP
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                    <span className="text-xs text-muted-foreground md:hidden">
                      Status:
                    </span>
                    {isInStock ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-600">
                        <span className="size-1.5 rounded-full bg-red-500" />
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    <Button
                      type="button"
                      size="sm"
                      disabled={isItemBusy || !isInStock}
                      onClick={() => handleAddToCart(id)}
                      className="h-9 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-medium gap-1.5 px-3.5"
                    >
                      <ShoppingCart className="size-3.5" />
                      <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label={`Remove ${item.title} from wishlist`}
                      disabled={isItemBusy}
                      onClick={() => handleRemove(id)}
                      className="size-9 rounded-lg border-gray-200 text-gray-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}
