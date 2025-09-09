import { Category } from "@/types/category.type";
export default async function getAllCategories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  const { data } = await response.json();
  return data as Category[];
}
