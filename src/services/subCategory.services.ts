const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function getAllSubCategories() {
  const response = await fetch(`${baseUrl}/api/v1/subcategories`);
  const data = await response.json();
  return data;
}
