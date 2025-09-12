import { WishlistResponse } from "@/types/wishlist.type";

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

// Client-side function - token passed from caller
export default async function getWishlist(token: string): Promise<WishlistResponse | null> {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch wishlist: ${response.status}`);
    }

    const data = await response.json();
    return data as WishlistResponse;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return null;
  }
}

// Client-side function - token passed from caller
export async function addToWishlist(productId: string, token: string): Promise<boolean> {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ productId }),
    });

    return response.ok;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return false;
  }
}

// Client-side function - token passed from caller
export async function removeFromWishlist(productId: string, token: string): Promise<boolean> {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return false;
  }
}
