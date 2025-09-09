import React from "react";
import getSingleProduct from "@/apis/singleProduct";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);
  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="w-full px-5 md:w-4/5 md:px-0 mx-auto py-12 flex items-start flex-col md:flex-row justify-center gap-10">
        <div className="w-full md:w-1/3">
          <div className="bg-white p-0 rounded-2xl shadow-lg overflow-hidden">
            <img
              src={product.imageCover}
              
              className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-300"
              alt={product.title}
              priority
            />
          </div>
        </div>
        <div className="w-full md:w-2/3 m-10 md:m-0 ps-10 md:ps-5 space-y-6">
          {/* Category Badge */}
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            {product.category?.name}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>
          
          <p className="text-gray-600 leading-relaxed text-base">
            {product.description}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i}
                  className={`fas fa-star text-sm ${
                    i < Math.floor(product.ratingsAverage) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'
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
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">
              {product.price}
            </span>
            <span className="text-lg text-gray-600 font-medium">EGP</span>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-4 pt-4">
            <Button 
              size="lg"
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
            >
              <i className="fas fa-shopping-cart mr-3"></i>
              Add to Cart
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                size="lg"
                className="font-medium rounded-xl border-2"
              >
                <i className="fas fa-heart mr-2"></i>
                Wishlist
              </Button>
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
    </section>
  );
};

export default ProductDetails;
