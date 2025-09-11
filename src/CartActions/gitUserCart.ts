"use server";
import getMyToken from "@/utilities/token";

export async function getUserCartAction() {
  const token = await getMyToken();
  if (!token) {
    throw Error("Login First");
  }
  const cartAPI = `${process.env.API_BASE_URL}/cart`;
  const response = await fetch(cartAPI, {
    headers: {
      token: token as string,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw Error(data.message);
  }
  return data;
}
