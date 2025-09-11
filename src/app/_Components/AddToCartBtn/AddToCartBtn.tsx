"use client";
import AddToCart from "@/CartActions/addToCart";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "@/Context/CartContext";

const AddToCartBtn = ({ productId }: { productId: string }) => {
  const { data: session, status } = useSession();
  const { getUserCart } = useCart();
  const router = useRouter();
  const [authDialog, setAuthDialog] = useState({
    isOpen: false,
  });

  const closeDialog = () => {
    setAuthDialog({ isOpen: false });
  };

  const goToLogin = () => {
    closeDialog();
    router.push("/login");
  };

  async function handleAddCart() {
    if (status === "loading") {
      return;
    }
    
    if (status === "unauthenticated" || !session?.accessToken) {
      setAuthDialog({ isOpen: true });
      return;
    }

    try {
      const data = await AddToCart(productId, session.accessToken);
      
      // Refresh cart data to update the badge in navbar
      await getUserCart();
      
      toast.success("Product has been successfully added to your cart.", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fas fa-check-circle text-green-600"></i>,
        style: {
          color: "#16a34a",
        },
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });
      console.log("Added to cart:", data);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fas fa-times-circle text-red-600"></i>,
        style: {
          color: "#dc2626", // Red color for message
        },
        action: {
          label: "Retry",
          onClick: () => handleAddCart(),
        },
      });
    }
  }
  
  return (
    <>
      <Button
        onClick={handleAddCart}
        size="lg"
        disabled={status === "loading"}
        className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 cursor-copy text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
      >
        <i className="fas fa-shopping-cart mr-3"></i>
        {status === "loading" ? "Loading..." : "Add to Cart"}
      </Button>

      <Dialog open={authDialog.isOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <i className="fas fa-lock text-blue-500 text-xl"></i>
              Authentication Required
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Please login to add items to your cart.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button 
              onClick={goToLogin}
              className="bg-slate-800 hover:bg-slate-700"
            >
              Go to Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddToCartBtn;
