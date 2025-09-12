import { Brand } from "@/types/brand.type";

const API_BASE_URL = process.env.API_BASE_URL;

export default async function getAllBrands() {
  const response = await fetch(`${API_BASE_URL}/brands`);
  const { data } = await response.json();
  console.log(data);
  return data as Brand[];
}
