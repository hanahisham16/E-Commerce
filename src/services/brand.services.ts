





import { BrandI } from "@/types/brand.type";
import { ProductI } from "@/types/product.type";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export default async function getAllBrands() {
  const response = await fetch(`${BASE_URL}/brands`);
  const data = await response.json();
  return data;
}

export async function getSingleBrand(id: string): Promise<BrandI | null> {
  try {
    const res = await fetch(`${BASE_URL}/brands/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
}

export async function getProductsByBrand(brandId: string): Promise<ProductI[]> {
  try {
    const res = await fetch(`${BASE_URL}/products?brand=${brandId}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error("Error fetching brand products:", error);
    return [];
  }
}