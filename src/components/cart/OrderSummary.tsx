import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Box, Lock, ShoppingBag, Tag, Truck } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { CartDataI } from "@/types/cart.type";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function OrderSummary({
  cartData,
  isCheckOut,
}: {
  cartData: CartDataI;
  isCheckOut: boolean;
}) {
  const { noOfCartItems } = useContext(CartContext)!;
  return (
    <>
      {" "}
      <div className="col-span-12 lg:col-span-4">
        <Card className="gap-0 overflow-hidden rounded-2xl py-0 shadow-sm">
          <div className="bg-primary p-5 text-primary-foreground">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShoppingBag className="size-5" />
              Order Summary
            </h2>
            <p className="mt-1 text-sm">{noOfCartItems} item in your cart</p>
          </div>

          <CardContent className="space-y-4 p-5">
            {isCheckOut ? (
              <>
                <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                  {cartData?.data?.products.map((product, index) => {
                    const itemKey =
                      product._id || `${product.product._id}-${index}`;
                    return (
                      <div
                        key={itemKey}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                          <Image
                            height={200}
                            width={200}
                            className="w-full h-full object-contain"
                            alt={product.product.title}
                            src={product.product.imageCover}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.product.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {product.count} x {product.price} EGP
                          </p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 shrink-0">
                          {product.count * product.price}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Truck className="size-4 text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">
                      Free EGP for free shipping
                    </p>
                    <p className="text-sm text-green-600">
                      You qualify for free delivery
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{cartData?.data?.totalCartPrice} EGP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold">
                {cartData?.data?.totalCartPrice}
                <span className="text-sm font-normal text-muted-foreground">
                  EGP
                </span>
              </span>
            </div>

            {isCheckOut ? (
              <></>
            ) : (
              <>
                <Button variant="outline" className="h-12 w-full border-dashed">
                  <Tag />
                  Apply Promo Code
                </Button>
              </>
            )}

            {isCheckOut ? (
              <>
                <Button className="w-full p-15 mt-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-6 rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-[0.98]">
                  <Box /> Place Order
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" className="h-12 w-full">
                  <Link className="flex gap-2" href="/checkout">
                    <Lock />
                    Secure Checkout
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
