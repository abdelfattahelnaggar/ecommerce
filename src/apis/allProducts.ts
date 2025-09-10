import { Product } from "@/types/product.type";

const API_BASE_URL = process.env.API_BASE_URL;

export default async function getAllProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  const { data } = await response.json();
  return data as Product[];
}
