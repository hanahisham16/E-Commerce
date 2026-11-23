import React from "react";
import Link from "next/link";
export default function EmptyCart() {
  const popularCategories = [
    { name: "Electronics", href: "/categories" },
    { name: "Fashion", href: "/categories" },
    { name: "Home", href: "/categories" },
    { name: "Beauty", href: "/categories" },
  ];
  return (
    <>
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <svg
            className="w-11 h-11 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15zM5 15.91l6 3.38v-6.71L5 9.21v6.7zm14 0v-6.7l-6 3.37v6.71l6-3.38z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>

        <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
          Looks like you haven&apos;t added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-medium text-sm px-7 py-3.5 rounded-xl shadow-md shadow-green-600/20 transition-all duration-200 mb-10"
        >
          <span>Start Shopping</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>

        <div className="w-full max-w-md border-t border-gray-100 mb-6"></div>

        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 font-medium mb-4">
            Popular Categories
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {popularCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="px-4 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
