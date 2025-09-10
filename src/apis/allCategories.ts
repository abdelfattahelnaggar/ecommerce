import { Category } from "@/types/category.type";
export default async function getAllCategories() {
    const response = await fetch(
        `${process.env.API_BASE_URL}/categories`
      );
  const { data } = await response.json();
  return data as Category[];
}
