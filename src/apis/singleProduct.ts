import { Product } from "@/types/product.type";
export default async function getSingleProduct(id:string){
    const response = await fetch(
        `${process.env.API_BASE_URL}/products/${id}`
      );
      const { data } = await response.json();
      return data as Product;
}