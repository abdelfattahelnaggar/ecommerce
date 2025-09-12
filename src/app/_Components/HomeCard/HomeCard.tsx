"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product.type";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { Button } from "@/components/ui/button";
import { addToWishlist, removeFromWishlist } from "@/apis/wishlist";
import getWishlist from "@/apis/wishlist";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const HomeCard = ({ product }: { product: Product }) => {
  const { data: session, status } = useSession();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (status === "authenticated" && product && session?.accessToken) {
        try {
          const wishlistData = await getWishlist(session.accessToken);
          if (wishlistData && wishlistData.data) {
            const isProductInWishlist = wishlistData.data.some(
              (item) => {
                if (!item) return false;
                
                // Handle different possible structures - item might be the product or contain a product
                const productInItem = item.product || item;
                const itemProductId = productInItem.id || productInItem._id;
                const currentProductId = product.id || product._id;
                
                return itemProductId === currentProductId;
              }
            );
            setIsInWishlist(isProductInWishlist);
          }
        } catch (error) {
          console.error("Error checking wishlist status:", error);
        }
      }
    };

    checkWishlistStatus();
  }, [status, product, session?.accessToken]);

  const handleWishlistToggle = async () => {
    if (status !== "authenticated" || !session?.accessToken) {
      toast.error("Please sign in to add items to your wishlist");
      return;
    }

    if (!product) return;

    setWishlistLoading(true);
    try {
      // Use the correct product ID format
      const productId = product.id || product._id;
      
      if (isInWishlist) {
        const success = await removeFromWishlist(productId, session.accessToken);
        if (success) {
          setIsInWishlist(false);
          toast.success("Removed from wishlist");
        } else {
          toast.error("Failed to remove from wishlist");
        }
      } else {
        const success = await addToWishlist(productId, session.accessToken);
        if (success) {
          setIsInWishlist(true);
          toast.success("Added to wishlist");
        } else {
          toast.error("Failed to add to wishlist");
        }
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error("Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="w-full h-full md:w-1/2 lg:w-1/4 2xl:w-1/5 p-3">
      <div className="product group">
        <Card className="p-3 hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-gray-300 relative">
          {/* Wishlist Button - Top Right Corner */}
          <Button
            variant="outline"
            size="sm"
            className={`absolute top-2 right-2 w-8 h-8 p-0 z-10 transition-all duration-300 ${
              isInWishlist 
                ? "bg-red-500 hover:bg-red-600 text-white border-red-500" 
                : "bg-white/90 backdrop-blur-sm border-none shadow-md hover:bg-red-50 hover:text-red-500"
            }`}
            onClick={handleWishlistToggle}
            disabled={wishlistLoading}
          >
            {wishlistLoading ? (
              <i className="fas fa-spinner fa-spin text-xs"></i>
            ) : (
              <i className={`fas fa-heart text-xs ${isInWishlist ? "text-white" : ""}`}></i>
            )}
          </Button>

          <Link href={`/product-details/${product._id}`}>
            <CardHeader className="p-0 mb-3">
              <div className="overflow-hidden rounded-lg">
                <Image
                  width={300}
                  height={300}
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              <p className="font-semibold text-green-500 text-sm uppercase tracking-wide">
                {product.category.name}
              </p>
              <p className="line-clamp-1 font-medium text-gray-800 hover:text-gray-600 transition-colors">
                {product.title}
              </p>
            </CardContent>
            <CardFooter className="pt-3">
              <div className="flex w-full justify-between items-center">
                <p className="font-bold text-lg text-gray-900 whitespace-nowrap">
                  {product.price}{" "}
                  <span className="text-sm font-normal text-gray-600">EGP</span>
                </p>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-700 whitespace-nowrap">
                    {product.ratingsAverage}
                  </span>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
              </div>
            </CardFooter>
          </Link>
          <AddToCartBtn productId={product._id} />
        </Card>
      </div>
    </div>
  );
};

export default HomeCard;
