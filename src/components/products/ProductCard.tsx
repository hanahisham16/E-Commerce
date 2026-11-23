import { ProductI } from "@/types/product.type";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { Eye, Heart, Plus, RefreshCw, Star } from "lucide-react";
import Link from "next/link";
import AddToCardButton from "../cart/AddToCardButton";
import AddToWishlistBtn from "../wishlist/AddToWishlistBtn";

export default function ProductCard({ products }: { products: ProductI[] }) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {products &&
          products.map((product) => {
            const discountPercentage = product.priceAfterDiscount
              ? Math.round(
                  ((product.price - product.priceAfterDiscount) /
                    product.price) *
                    100,
                )
              : 0;
            return (
              <React.Fragment key={product._id}>
                <Card className="relative rounded-lg mx-auto w-full max-w-sm pt-0">
                  <div className="relative">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-60 object-contain bg-white  dark:brightness-40"
                    />
                    {product.priceAfterDiscount && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                          -{discountPercentage}%
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <AddToWishlistBtn productId = {product._id} />
                      <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 shadow-sm">
                        <RefreshCw size={18} />
                      </button>
                      <Link
                        className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 shadow-sm"
                        href={`/products/${product._id}`}
                      >
                        <Eye size={18} />
                      </Link>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="text-xs text-gray-500">
                      {product.category.name}
                    </div>
                    <Link href={`/products/${product._id}`}>
                      <CardTitle className="line-clamp-2 ">
                        {product.title}
                      </CardTitle>
                    </Link>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4].map((star, index) => {
                        const filledStar =
                          star < Math.floor(product.ratingsAverage);
                        return (
                          <React.Fragment key={index}>
                            <Star
                              size={18}
                              className={
                                filledStar
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-yellow-400 "
                              }
                            />
                          </React.Fragment>
                        );
                      })}
                      <span className="text-xs text-gray-500">
                        {product.ratingsAverage} ({product.ratingsQuantity})
                      </span>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <div className="">
                      {product.priceAfterDiscount ? (
                        <>
                          <span className="text-lg font-bold text-gray-800">
                            {product.priceAfterDiscount} EGY
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {product.price} EGY
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-800">
                          {product.price} EGY
                        </span>
                      )}
                    </div>
                    <AddToCardButton productId = {product._id}/>
                  </CardFooter>
                </Card>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
}
