
"use server";

import { getOurToken } from "@/lib/auth";
import { ChangePasswordSchemaType } from "@/lib/schemas/auth.schema";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function changePassword(
  values: ChangePasswordSchemaType
) {
  const token = await getOurToken();

  const response = await fetch(
    `${baseUrl}/api/v1/users/changeMyPassword`,
    {
      method: "PUT",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to change password");
  }

  return data;
}
