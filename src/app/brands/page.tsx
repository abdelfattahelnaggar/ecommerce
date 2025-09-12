import getAllBrands from '@/apis/allBrands';
import { Brand } from '@/types/brand.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Card, CardContent } from '@/components/ui/card';

const Brands = async () => {
  const brands: Brand[] = await getAllBrands();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Shop by Brand
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our wide range of products organized by brands. Find exactly what you&apos;re looking for.
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {brands.map((brand: Brand) => (
            <Link
              key={brand._id}
              href={`/brand-products/${brand.slug}`}
              className="group transform transition-all duration-300 hover:scale-105"
            >
              <Card className="h-full bg-white shadow-md hover:shadow-xl transition-all duration-300 border-0 ring-1 ring-slate-200 hover:ring-blue-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain  transition-all duration-500 group-hover:scale-105"
                      
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                  </div>
                  
                  {/* Brand Name */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-900 text-center group-hover:text-blue-600 transition-colors duration-300">
                      {brand.name}
                    </h3>
                    <div className="mt-2 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 mx-auto"></div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {brands.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-tags text-3xl text-slate-400"></i>
            </div>
            <h2 className="text-2xl font-semibold text-slate-600 mb-2">No Brands Found</h2>
            <p className="text-slate-500">Brands will appear here once they&apos;re available.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Brands