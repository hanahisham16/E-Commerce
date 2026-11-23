
import { getOurToken } from "@/lib/auth";
import { OrdersResponseI } from "@/types/allOrders.type";
import { jwtDecode } from "jwt-decode";


interface DecodedToken {
  id: string;
}

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getUserOrders() {
  const token = await getOurToken();

  const decodedToken = jwtDecode<DecodedToken>(token);

  const userId = decodedToken.id;

  if (!userId) {
    throw new Error("User ID not found in token");
  }

  const response = await fetch(
    `${BASE_URL}/orders/user/${userId}`,
    {
      method: "GET",
      headers: {
        token,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const result: OrdersResponseI = await response.json();

  return result.data;
}
