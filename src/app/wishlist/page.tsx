"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import getWishlist, { removeFromWishlist } from "@/apis/wishlist";
import { WishlistItem } from "@/types/wishlist.type";
import { toast } from "sonner";
import AddToCart from "@/CartActions/addToCart";
import { useCart } from "@/Context/CartContext";
import { useRouter } from "next/navigation";

const Wishlist = () => {
  const { data: session, status } = useSession();
  const { getUserCart } = useCart();
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null); // Track which product is being added to cart
  const [removeDialog, setRemoveDialog] = useState<{ open: boolean; productId: string | null }>({
    open: false,
    productId: null,
  });

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      fetchWishlist();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session?.accessToken]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      if (session?.accessToken) {
        const data = await getWishlist(session.accessToken);
        if (data) {
          setWishlistItems(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      if (!session?.accessToken) {
        toast.error("Please sign in to manage your wishlist");
        return;
      }
      
      const success = await removeFromWishlist(productId, session.accessToken);
      if (success) {
        setWishlistItems(prev => prev.filter(item => {
          const product = item.product || item;
          const itemProductId = product.id || product._id;
          return itemProductId !== productId;
        }));
        toast.success("Product removed from wishlist");
      } else {
        toast.error("Failed to remove product from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove product from wishlist");
    } finally {
      setRemoveDialog({ open: false, productId: null });
    }
  };

  const handleAddToCart = async (productId: string) => {
    if (status !== "authenticated" || !session?.accessToken) {
      toast.error("Please sign in to add items to your cart");
      return;
    }

    setAddingToCart(productId);
    try {
      await AddToCart(productId, session.accessToken);
      
      // Refresh cart data to update the badge in navbar
      await getUserCart();
      
      toast.success("Product added to cart successfully!", {
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
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add product to cart. Please try again.", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fas fa-times-circle text-red-600"></i>,
        style: {
          color: "#dc2626",
        },
        action: {
          label: "Retry",
          onClick: () => handleAddToCart(productId),
        },
      });
    } finally {
      setAddingToCart(null);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-slate-600 mb-4"></i>
          <p className="text-slate-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center py-16">
          <i className="fas fa-heart text-6xl text-slate-300 mb-6"></i>
          <h3 className="text-xl font-semibold text-slate-600 mb-4">
            Please sign in to view your wishlist
          </h3>
          <p className="text-slate-500 mb-8">
            You need to be logged in to access your saved items.
          </p>
          <Link href="/login">
            <Button className="bg-slate-800 hover:bg-slate-700">
              <i className="fas fa-sign-in-alt mr-2"></i>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="w-full md:w-4/5 mx-auto py-8 px-5 md:px-0">
        {/* Wishlist Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                <i className="fas fa-heart text-red-500"></i>
                My Wishlist
              </h1>
              <p className="text-slate-600">
                {wishlistItems.length === 0
                  ? "Your wishlist is empty"
                  : `${wishlistItems.length} item${
                      wishlistItems.length > 1 ? "s" : ""
                    } in your wishlist`}
              </p>
            </div>
          </div>
        </div>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <i className="fas fa-heart text-6xl text-slate-300 mb-6"></i>
            <h3 className="text-xl font-semibold text-slate-600 mb-4">
              Your wishlist is empty
            </h3>
            <p className="text-slate-500 mb-8">
              Start adding products you love to your wishlist!
            </p>
            <Link href="/">
              <Button className="bg-slate-800 hover:bg-slate-700">
                <i className="fas fa-shopping-bag mr-2"></i>
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => {
              // The item might BE the product, not contain a product property
              const product = item.product || item;
              
              // Skip items without product data
              if (!product || !product.title) {
                console.warn("Wishlist item missing product data:", item);
                return null;
              }
              
              return (
                <Card
                  key={item._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                >
                  <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative">
                    <div className="w-full h-48 bg-white overflow-hidden">
                      <Image
                        src={product.imageCover || "https://via.placeholder.com/300x200?text=No+Image"}
                        alt={product.title || "Product"}
                        width={300}
                        height={200}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 backdrop-blur-sm border-none shadow-md hover:bg-red-50 hover:text-red-600"
                      onClick={() => setRemoveDialog({ open: true, productId: product.id || product._id })}
                    >
                      <i className="fas fa-times text-xs"></i>
                    </Button>

                    {/* Wishlist Icon */}
                    <div className="absolute top-2 left-2">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-heart text-white text-xs"></i>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <div className="mb-2">
                      <Badge
                        variant="secondary"
                        className="mb-2 bg-green-100 text-green-700 text-xs"
                      >
                        {product.category?.name || "Unknown Category"}
                      </Badge>
                    </div>

                      <Link href={`/product-details/${product.id || product._id}`}>
                      <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-2 hover:text-slate-600 transition-colors line-clamp-2">
                        {product.title || "Unknown Product"}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-star text-yellow-400 text-xs"></i>
                        <span className="text-xs text-slate-600">
                          {product.ratingsAverage || 0}
                        </span>
                        <span className="text-xs text-slate-400">
                          ({product.ratingsQuantity || 0})
                        </span>
                      </div>
                      <p className="text-lg font-bold text-slate-800">
                        {product.price} EGP
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Link href={`/product-details/${product.id || product._id}`} className="block">
                        <Button className="w-full bg-slate-800 hover:bg-slate-700 text-sm py-2">
                          <i className="fas fa-eye mr-2"></i>
                          View Details
                        </Button>
                      </Link>
                      
                      <Button
                        variant="outline"
                        className="w-full text-sm py-2 hover:bg-slate-50"
                        onClick={() => handleAddToCart(product.id || product._id)}
                        disabled={addingToCart === (product.id || product._id)}
                      >
                        {addingToCart === (product.id || product._id) ? (
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                        ) : (
                          <i className="fas fa-shopping-cart mr-2"></i>
                        )}
                        {addingToCart === (product.id || product._id) ? "Adding..." : "Add to Cart"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                </Card>
              );
            }).filter(Boolean)}
          </div>
        )}

        {/* Remove Confirmation Dialog */}
        <Dialog open={removeDialog.open} onOpenChange={(open) => setRemoveDialog({ open, productId: null })}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-heart text-red-600"></i>
                </div>
                Remove from Wishlist
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to remove this item from your wishlist?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => setRemoveDialog({ open: false, productId: null })}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (removeDialog.productId) {
                    handleRemoveFromWishlist(removeDialog.productId);
                  }
                }}
                className="flex-1"
              >
                <i className="fas fa-trash mr-2"></i>
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Wishlist;
