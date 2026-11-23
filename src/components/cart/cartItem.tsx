"use client";

import React, { useContext, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { CartDataI, CartProductI } from "@/types/cart.type";
import Image from "next/image";
import {
  removeProductFromCart,
  updateCartProductQuantity,
} from "@/actions/cart.actions";
import { toast } from "sonner";
import { CartContext } from "@/context/CartContext";

export default function CartItem({
  product,
  setProducts,setCartData
}: {
  product: CartProductI;
  setProducts: (products: CartProductI[]) => void;
  setCartData:(CartData:CartDataI)=>void
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {handelCart} = useContext(CartContext)!

  const quantityButtonDisabledStyles =
    "disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 disabled:hover:bg-muted disabled:hover:text-muted-foreground";

  async function deleteCart(id: string) {
    try {
      setIsDeleting(true);
      const response = await removeProductFromCart(id);
      toast.success(response?.message || "Product removed from cart");
      setProducts(response?.data?.products ?? []);
      setCartData(response)
      handelCart()
    } catch (error) {
      console.log(error);
      toast.error("Error in Delete Product");
    } finally {
      setIsDeleting(false);
    }
  }

  async function updateCart(id: string, count: number) {
    if (count < 1) return;
    try {
      setIsUpdating(true);
      const response = await updateCartProductQuantity(id, count);
      toast.success(response?.message || "Quantity updated");
      setProducts(response?.data?.products ?? []);
            setCartData(response)

      handelCart()
    } catch (error) {
      console.log(error);
      toast.error("Error in Update Product");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Card className="rounded-2xl py-0 shadow-sm">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row">
        <div className="flex size-28 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Image
            width={200}
            height={200}
            src={product.product.imageCover}
            alt={product.product.title}
            className="size-full rounded-xl object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-lg font-semibold">{product.product.title}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-0.5 text-primary">
                {product.product.category.name}
              </span>
            </div>
          </div>

          <p className="font-bold text-primary">
            {product.price} EGP{" "}
            <span className="text-sm font-normal text-muted-foreground">
              per unit
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-input p-1">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Decrease quantity"
                className={quantityButtonDisabledStyles}
                disabled={isUpdating || isDeleting || product.count <= 1}
                onClick={() =>
                  updateCart(product.product._id, product.count - 1)
                }
              >
                <Minus />
              </Button>
              <span className="min-w-6 text-center font-medium">
                {product.count}
              </span>
              <Button
                size="icon-sm"
                aria-label="Increase quantity"
                className={quantityButtonDisabledStyles}
                disabled={isUpdating || isDeleting}
                onClick={() =>
                  updateCart(product.product._id, product.count + 1)
                }
              >
                <Plus />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-xl font-bold">
                  {product.count * product.price}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    EGP
                  </span>
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-lg"
                    aria-label={`Remove ${product.product.title}`}
                    disabled={isDeleting || isUpdating}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove this item?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove{" "}
                      <span className="font-semibold text-foreground">
                        {product.product.title}
                      </span>{" "}
                      from your shopping cart?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteCart(product.product._id)}
                      disabled={isDeleting}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      {isDeleting ? "Removing..." : "Remove"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
