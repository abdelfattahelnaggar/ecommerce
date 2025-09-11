import axios from "axios";

// Client-safe: pass token from caller; do not import server-only utilities here
export async function clearCartAction(token: string) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";
  const cartAPI = `${API_BASE_URL}/cart`;
  const { data } = await axios.delete(cartAPI, {
    headers: {
      token: token as string,
    },
  });
  return data;
}