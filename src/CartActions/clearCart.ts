import axios from "axios";

// Client-safe: pass token from caller; do not import server-only utilities here
export async function clearCartAction(token: string) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
  const cartAPI = `${API_BASE_URL}/cart`;
  const { data } = await axios.delete(cartAPI, {
    headers: {
      token: token as string,
    },
  });
  return data;
}