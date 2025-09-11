import React from "react";
import getSingleProduct from "@/apis/singleProduct";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Product } from "@/types/product.type";
import AddToCartBtn from "@/app/_Components/AddToCartBtn/AddToCartBtn";
const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product:Product = await getSingleProduct(id);
  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="w-full px-5 md:w-4/5 md:px-0 mx-auto py-12">
        {/* Unified Responsive Layout */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-10">
          {/* Product Image */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-4 lg:p-0 rounded-2xl shadow-lg overflow-hidden">
              <Image
                width={400}
                height={400}
                src={product.imageCover}
                className="w-full h-72 sm:h-80 md:h-[420px] lg:h-96 object-contain lg:object-cover rounded-xl hover:scale-105 lg:hover:scale-110 transition-transform duration-300"
                alt={product.title}
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-2/3 lg:ps-5 space-y-6 px-2 lg:px-0">
            {/*!============== Category Badge ============== */}
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {product.category?.name}
            </Badge>

            {/*!============== Title ============== */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/*!============== Description ============== */}
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-base">
              {product.description}
            </p>

            {/*!============== Rating ============== */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star text-sm ${
                      i < Math.floor(product.ratingsAverage)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-gray-700">
                {product.ratingsAverage}
              </span>
              <span className="text-gray-500 text-sm">
                ({product.ratingsQuantity || 0} reviews)
              </span>
            </div>

            {/*!============== Price ============== */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900">
                {product.price}
              </span>
              <span className="text-lg text-gray-600 font-medium">EGP</span>
            </div>

            {/*!============== Action Buttons ============== */}
            <div className="space-y-4 pt-4">
             {/*----- Add To Cart Button -----*/}
              <AddToCartBtn productId={product._id} />

              <div className="grid grid-cols-2 gap-3">
                {/*!----- Wishlist Button -----*/}
                <Button
                  variant="outline"
                  size="lg"
                  className="font-medium rounded-xl border-2"
                >
                  <i className="fas fa-heart mr-2"></i>
                  Wishlist
                </Button>
                {/*!----- Share Button -----*/}
                <Button
                  variant="outline"
                  size="lg"
                  className="font-medium rounded-xl border-2"
                >
                  <i className="fas fa-share-alt mr-2"></i>
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
