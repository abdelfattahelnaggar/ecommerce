import { Category } from "@/types/category.type";

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export default async function getAllCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
