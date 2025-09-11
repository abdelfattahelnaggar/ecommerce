"use client";
import CartContextProvider from "@/Context/CartContext";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CartContextProvider> 
        {children}
      </CartContextProvider>
    </SessionProvider>
  );
};

export default Providers;
