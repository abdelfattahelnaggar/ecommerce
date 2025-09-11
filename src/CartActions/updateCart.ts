import axios from "axios";

// Client-safe: pass token from caller; do not import server-only utilities here
export async function updateCartAction(
  productId: string,
  quantity: number,
  token: string
) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";
  const url = `${API_BASE_URL}/cart/${productId}`;
  const { data } = await axios.put(
    url,
    {
      count: quantity,
    },
    {
      headers: {
        token: token as string,
      },
    }
  );
  return data;
}
