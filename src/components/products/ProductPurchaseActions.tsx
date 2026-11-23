"use client";

import React, { useContext, useState } from "react";
import { Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import addProductToCart, {
  updateCartProductQuantity,
} from "@/actions/cart.actions";
import { ProductDetailsI } from "@/types/productDetails.type";
import { toast } from "sonner";
import { WishlistContext } from "@/context/WishlistContext";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductPurchaseActions({
  products,
}: {
  products: ProductDetailsI;
}) {
  const availableStock = products?.quantity ?? 0;
  const unitPrice = products?.price ?? 0;

  const [count, setCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handelCart } = useContext(CartContext)!;
  const router = useRouter()

  function handleDecrease() {
    setCount((prev) => Math.max(1, prev - 1));
  }

  function handleIncrease() {
    setCount((prev) => (prev < availableStock ? prev + 1 : prev));
  }

  async function handleAddToCart() {
    if (!products?._id) {
      toast.error("Product ID is missing");
      return;
    }

    if (availableStock < 1) {
      toast.error("This product is currently out of stock");
      return;
    }

    setIsLoading(true);
    try {
      const addResponse = await addProductToCart(products._id);

      if (addResponse?.status === "fail" || addResponse?.statusMsg === "fail") {
        toast.error(
          addResponse?.message || "Product Failed To Add To Your Cart",
        );
        return;
      }

      let finalMessage = addResponse?.message || "Product added to cart";

      if (count > 1) {
        const updateResponse = await updateCartProductQuantity(
          products._id,
          count,
        );
        if (
          updateResponse?.status !== "fail" &&
          updateResponse?.statusMsg !== "fail"
        ) {
          finalMessage =
            updateResponse?.message ||
            `Added ${count} items to your cart successfully`;
        }
      }

      toast.success(finalMessage);
      handelCart()
    } catch (error:any) {
      console.log(error);
            toast.error(error.message);
      router.push("/login")
    } finally {
      setIsLoading(false);
    }
  }

  const totalPrice = unitPrice * count;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-medium">Quantity</p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-11 items-center rounded-lg border border-input">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Decrease quantity"
              onClick={handleDecrease}
              disabled={isLoading || count <= 1}
            >
              <Minus className="size-4" />
            </Button>

            <span className="min-w-10 text-center font-medium">{count}</span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Increase quantity"
              onClick={handleIncrease}
              disabled={isLoading || count >= availableStock}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <span className="text-sm text-muted-foreground">
            {availableStock} available
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
        <span className="text-sm font-medium">Total Price:</span>
        <span className="font-heading text-xl font-bold text-primary">
          {totalPrice.toFixed(2)} EGP
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          type="button"
          size="lg"
          onClick={handleAddToCart}
          className="h-12 w-full sm:w-auto gap-2"
          disabled={isLoading || availableStock < 1}
        >
          {isLoading ? (
            <>
              <Spinner /> Adding to cart......
            </>
          ) : (
            <>
              <ShoppingCart className="size-4" />
              Add to Cart ({count})
            </>
          )}
        </Button>

        <Button
          size="lg"
          className="h-12 gap-2 bg-foreground text-background hover:bg-foreground/90"
          disabled={isLoading || availableStock < 1}
        >
          <Zap />
          Buy Now
        </Button>
      </div>
    </div>
  );
}
