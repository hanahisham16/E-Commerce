import getAllCategories from "@/services/category.services";
import { CategoryI } from "@/types/category.type";
import { Layers, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Categories() {
  const response = await getAllCategories();
  console.log(response);
  const category: CategoryI[] = response.data;
  console.log(category);
  return (
    <>
    <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 to-emerald-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Categories</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
             <Layers />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Categories
              </h1>
              <p className="text-white/80 mt-1">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {category.map((item) => (
            <Link
              key={item._id}
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
              href={`/categories/${item._id}`}
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                <Image
                  alt={item.name}
                  src={item.image}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-center group-hover:text-emerald-600 transition-colors">
                {item.name}
              </h3>
              <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-emerald-600 flex items-center gap-1">
                  View Subcategories <MoveRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
