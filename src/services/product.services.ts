const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function getAllProducts() {
  const response = await fetch(`${baseUrl}/api/v1/products`);
  const data = await response.json();
  return data;
}
export  async function getProductDetails(productId:string) {
  const response = await fetch(`${baseUrl}/api/v1/products/${productId}`);
  const data = await response.json();
  return data;
}
