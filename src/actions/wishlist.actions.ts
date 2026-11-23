"use server";

import { getOurToken } from "@/lib/auth";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function addProductToWishlist(productId: string) {
  const token = await getOurToken();

  const response = await fetch(`${baseUrl}/api/v1/wishlist`, {
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: productId,
    }),
  });

  const data = await response.json();

  return data;
}
export async function getLoggedUserWishlist() {
  const token = await getOurToken();

  const response = await fetch(`${baseUrl}/api/v1/wishlist`, {
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}
export async function removeProductFromWishlist(productId: string) {
  const token = await getOurToken();

  const response = await fetch(`${baseUrl}/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}

