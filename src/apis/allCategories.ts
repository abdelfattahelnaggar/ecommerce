import { Category } from "@/types/category.type";

const API_BASE_URL = process.env.API_BASE_URL;

export default async function getAllCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  const { data } = await response.json();
  console.log(data);
  return data as Category[];
}
