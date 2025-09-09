"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  category: {
    name: string;
  };
}

const HomeCard = ({ product }: { product: Product }) => {
  return (
    <div className="w-full h-full md:w-1/2 lg:w-1/4 2xl:w-1/5 p-3">
      <div className="product group">
        <Card className="p-3 hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-gray-300">
          <Link href={`/product-details/${product._id}`}>
            <CardHeader className="p-0 mb-3">
              <div className="overflow-hidden rounded-lg">
                <img
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
          <Button
            size="lg"
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            <i className="fas fa-shopping-cart mr-3"></i>
            Add to Cart
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default HomeCard;
