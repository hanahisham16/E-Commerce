



import { CategoryI } from "@/types/category.type";
import { ProductI } from "@/types/product.type";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";



export default async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  const data = await response.json();
  return data;
}

export async function getSingleCategory(id: string): Promise<CategoryI | null> {
  try {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}


export async function getProductsByCategory(
  categoryId: string
): Promise<ProductI[]> {
  try {
    const res = await fetch(`${BASE_URL}/products?category[in]=${categoryId}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}