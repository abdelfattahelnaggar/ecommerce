import { Product } from "@/types/product.type";

const API_BASE_URL = process.env.API_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';

export default async function getSingleProduct(id: string) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  const { data } = await response.json();
  return data as Product;
}
