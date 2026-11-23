"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/cart/cartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { clearUserCart, getLoggedUserCart } from "@/actions/cart.actions";
import getAllCategories from "@/services/category.services";
import { useContext, useEffect, useState } from "react";
import { CartProductI, CartDataI } from "@/types/cart.type";
import { CategoryI } from "@/types/category.type";
import { Spinner } from "@/components/ui/spinner";
import EmptyCart from "@/components/cart/EmptyCart";
import { toast } from "sonner";
import { CartContext } from "@/context/CartContext";

export default function CartPage() {
  const [products, setProducts] = useState<CartProductI[]>([]);
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [cartData, setCartData] = useState<CartDataI | null>(null);
  const { handelCart } = useContext(CartContext)!;

  async function getCart() {
    setIsLoading(true);
    try {
      const [cartRes, categoriesRes] = await Promise.all([
        getLoggedUserCart(),
        getAllCategories(),
      ]);

      const typedCart = cartRes as CartDataI;
      setCartData(cartRes);
      setProducts(typedCart?.data?.products ?? []);
      setCategories(categoriesRes?.data ?? []);
      handelCart();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  async function clearCart() {
    try {
      const response = await clearUserCart();
      toast.success(response?.message || "Cart cleared successfully");
      setProducts(response?.data?.products ?? []);
    } catch (error) {
      console.log(error);
      toast.error("Cart Failed To Clear");
    }
  }

  async function handleClear() {
    try {
      setIsClearing(true);
      await clearCart();
    } finally {
      setIsClearing(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col gap-4 justify-center items-center">
        <h2 className="text-3xl text-emerald-600 font-bold">Loading cart...</h2>
        <Spinner className="text-emerald-600" />
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto my-6 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="hover:text-gray-800 text-gray-600 transition-colors"
              >
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShoppingCart className="size-6" />
          </span>
          <h1 className="font-heading text-3xl font-bold">Shopping Cart</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          You have{" "}
          <span className="font-semibold text-primary">
            {products.length} {products.length === 1 ? "item" : "items"}
          </span>{" "}
          in your cart
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Cart items */}
        <div className="col-span-12 space-y-4 lg:col-span-8">
          {products.map((product) => (
            <CartItem
              key={product._id}
              setProducts={setProducts}
              product={product}
              setCartData={setCartData}
            />
          ))}

          <Separator />

          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              Continue Shopping
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isClearing}
                  className="border-red-200 bg-red-50/70 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                >
                  <Trash2 className="size-4" />
                  <span>Clear all items</span>
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Clear all items from cart?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will remove all products
                    currently in your shopping cart.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isClearing}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClear}
                    disabled={isClearing}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    {isClearing ? "Clearing..." : "Clear all"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Order summary */}
        <OrderSummary cartData={cartData!} />
      </div>
    </div>
  );
}
