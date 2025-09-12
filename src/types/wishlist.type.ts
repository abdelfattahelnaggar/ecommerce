import { Product } from "./product.type";

// Flexible wishlist item that can be either a wrapper object or the product itself
export interface WishlistItem extends Partial<Product> {
  _id: string;
  user?: string;
  product?: Product; // When it's a wrapper object
  createdAt?: string;
  updatedAt?: string;
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistItem[];
}
