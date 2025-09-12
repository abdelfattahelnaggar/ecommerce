"use client";
import React, { useEffect, useState } from "react";
import CheckOut from "../_Components/CheckOut";

const CheckoutPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [cartId, setCartId] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    // Get cart ID from params
    params.then((data) => setCartId(data.id));
    
    // Get current URL on client side
    setCurrentUrl(window.location.origin);
  }, [params]);

  if (!cartId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-slate-600 mb-4"></i>
          <p className="text-slate-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto py-8 px-5 md:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Checkout</h1>
          <p className="text-slate-600">Complete your order information</p>
        </div>
        <CheckOut cartId={cartId} url={currentUrl} />
      </div>
    </div>
  );
};

export default CheckoutPage;
