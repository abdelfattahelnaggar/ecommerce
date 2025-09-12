import { Brand } from "@/types/brand.type";

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export default async function getAllBrands() {
  try {
    const response = await fetch(`${API_BASE_URL}/brands`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch brands: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data as Brand[];
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}
