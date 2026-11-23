import ProductCard from "@/components/products/ProductCard";
import { getProductsByBrand, getSingleBrand } from "@/services/brand.services";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function BrandDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [brand, products] = await Promise.all([
    getSingleBrand(id),
    getProductsByBrand(id),
  ]);

  if (!brand) {
    notFound();
  }

  return (
    <>
      <div className="bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link href="/brands" className="hover:text-white transition-colors">
              Brands
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{brand.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white p-3 flex items-center justify-center shadow-xl ring-1 ring-white/30 shrink-0">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {brand.name}
              </h1>
              <p className="text-white/80 mt-1">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"} available from{" "}
                {brand.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Products by {brand.name}
        </h2>

        {products.length > 0 ? (
          <ProductCard products={products} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60">
            <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
              <PackageOpen className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-gray-800">
              No products found for this brand right now
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">
              We&apos;re working on adding new items soon. Try exploring another
              brand in the meantime.
            </p>
            <Link
              href="/brands"
              className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              Browse All Brands
            </Link>
          </div>
        )}
      </div>
    </>
  );
}