import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserCartAction } from "@/CartActions/gitUserCart";
import { Cart, ProductCart } from "@/types/cart.type";
import { toast } from "sonner";

interface CartContextType {
  numOfCartItems: number;
  totalCartPrice: number;
  products: ProductCart[];
  getUserCart: () => Promise<void>;
  isLoading: boolean;
}

export const cartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState<ProductCart[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getUserCart() {
    setIsLoading(true);
    try {
      const data: Cart = await getUserCartAction();
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <cartContext.Provider value={{ numOfCartItems, totalCartPrice, products, getUserCart, isLoading }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
