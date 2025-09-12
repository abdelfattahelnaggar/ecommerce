"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Cart, ProductCart } from "@/types/cart.type";
import { toast } from "sonner";
import { removeCartItemAction } from "@/CartActions/removeCartItem";
import { useSession } from "next-auth/react";
import { updateCartAction } from "@/CartActions/updateCart";
import { clearCartAction } from "@/CartActions/clearCart";

interface CartContextType {
  numOfCartItems: number;
  totalCartPrice: number;
  products: ProductCart[];
  cartId: string;
  getUserCart: () => Promise<void>;
  isLoading: boolean;
  removeCartItem: (productId: string) => Promise<Cart | null>;
  updateCartItem: (productId: string, quantity: number) => Promise<Cart | null>;
  clearCart: () => Promise<Cart | null>;
}

export const cartContext = createContext<CartContextType | undefined>(
  undefined
);

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState<ProductCart[]>([]);
  const [cartId, setCartId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function removeCartItem(productId: string) {
    try {
      // Access token attached in next-auth session callback
      const token = (session as { accessToken?: string } | null | undefined)
        ?.accessToken;
      if (!token) {
        toast.error("Please login first");
        return null;
      }
      const data: Cart = await removeCartItemAction(productId, token);
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
      setCartId(data.cartId);
      toast.success("Item removed from cart successfully");
      return data;
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      return null;
    }
  }

  async function clearCart() {
    setIsLoading(true);
    try {
      const token = (session as { accessToken?: string } | null | undefined)
        ?.accessToken;
      if (!token) {
        toast.error("Please login first");
        return null;
      }
      const data: Cart = await clearCartAction(token);
      setNumOfCartItems(0);
      setTotalCartPrice(0);
      setProducts([]);
      setCartId("");
      toast.success("Cart cleared successfully");
      return data;
    } catch(error){
        toast.error("Something went wrong");
        console.log(error);
        return null;
    } finally {
        setIsLoading(false);
    }
  }

  async function updateCartItem(productId: string, quantity: number) {
    try {
      const token = (session as { accessToken?: string } | null | undefined)
        ?.accessToken;
      if (!token) {
        toast.error("Please login first");
        return null;
      }
      const data: Cart = await updateCartAction(productId, quantity, token);
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
      setCartId(data.cartId);
      toast.success("Cart item updated successfully");
      return data;
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      return null;
    }
  }

  async function getUserCart() {
    setIsLoading(true);
    try {
      const token = (session as { accessToken?: string } | null | undefined)
        ?.accessToken;
      if (!token) {
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setProducts([]);
        setCartId("");
        return;
      }
      // Call our server route which invokes the server action safely
      const response = await fetch(`/api/cart`, { cache: "no-store" });
      const data: Cart = await response.json();
      if (!response.ok) {
        throw new Error(
          (data as unknown as { message?: string })?.message ||
            "Failed to load cart"
        );
      }
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
      setCartId(data.cartId);
    } catch (error) {
      toast.error("Something went wrong while fetching cart");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.accessToken]);

  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        totalCartPrice,
        products,
        cartId,
        getUserCart,
        isLoading,
        removeCartItem,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
