import axios from "axios";

// Client-safe action: pass user's token explicitly from caller
export async function removeCartItemAction(productId: string, token: string) {
  const API_BASE_URL =
    process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

  const cartAPI = `${API_BASE_URL}/cart/${productId}`;
  const { data } = await axios.delete(cartAPI, {
    headers: {
      token: token,
    },
  });
  return data;
}
