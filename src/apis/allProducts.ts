import { Product } from "@/types/product.type";
export default async function getAllProducts(){
    const response = await fetch(
        `${process.env.API_BASE_URL}/products`
      );
      const { data } = await response.json();
      return data as Product[];
}