import { Category } from "@/types/category.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';

export default async function getAllCategories() {
    const response = await fetch(
        `${API_BASE_URL}/categories`
      );
  const { data } = await response.json();
  return data as Category[];
}
