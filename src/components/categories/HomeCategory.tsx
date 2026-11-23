import getAllCategories from "@/services/category.services";
import { CategoryI } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";

export default async function HomeCategory() {
  const response = await getAllCategories();
  const categories: CategoryI[] = response?.data ?? [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((item) => (
        <Link
          key={item._id}
          href={`/categories/${item._id}`}
          className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
        >
          <div className="relative h-20 w-20 overflow-hidden bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-200 transition">
            <Image
              alt={item.name}
              src={item.image}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="font-medium text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {item.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}