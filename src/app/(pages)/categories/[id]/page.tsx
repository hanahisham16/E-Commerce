
import ProductCard from "@/components/products/ProductCard";
import {
  getProductsByCategory,
  getSingleCategory,
} from "@/services/category.services";
import { PackageOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [category, products] = await Promise.all([
    getSingleCategory(id),
    getProductsByCategory(id),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <>
      {/* Header خاص بالكاتيجوري المختارة فقط */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link
              href="/categories"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{category.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl ring-1 ring-white/30 shrink-0">
              <Image
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {category.name}
              </h1>
              <p className="text-white/80 mt-1">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"} available in
                this category
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-12">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Products in {category.name}
          </h2>
          {products.length > 0 ? (
            <ProductCard products={products} />
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <PackageOpen className="w-7 h-7" />
              </div>
              <h3 className="text-base font-semibold text-gray-800">
                No products found in this category right now
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm">
                We&apos;re working on adding new items soon. Try exploring
                another category in the meantime.
              </p>
              <Link
                href="/categories"
                className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Browse All Categories
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
