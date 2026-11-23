import ProductCard from "@/components/products/ProductCard";
import getAllProducts from "@/services/product.services";
import { ProductI } from "@/types/product.type";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Products() {
  const response = await getAllProducts();
  const products: ProductI[] = response.data;

  return (
    <>
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 to-emerald-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">All Products</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <PackageOpen />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Products
              </h1>
              <p className="text-white/80 mt-1">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-sm text-gray-500">
          Showing {products.length} products
        </div>
        <ProductCard products={products} />
      </div>
    </>
  );
}
