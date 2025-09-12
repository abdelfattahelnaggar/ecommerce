import { Product } from "@/types/product.type";

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export default async function getSingleProduct(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data as Product;
  } catch (error) {
    console.error("Error fetching single product:", error);
    throw error;
  }
}
