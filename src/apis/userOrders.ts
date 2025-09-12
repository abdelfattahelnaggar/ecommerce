import { OrdersResponse } from "@/types/order.type";

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUserOrders(token: string, userId: string): Promise<OrdersResponse | null> {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    if (!userId) {
      throw new Error("User ID not found");
    }

    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch orders: ${response.status}`);
    }

    const data: OrdersResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
}
