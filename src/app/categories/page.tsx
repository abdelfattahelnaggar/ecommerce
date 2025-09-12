import getAllCategories from '@/apis/allCategories';
import { Category } from '@/types/category.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Card, CardContent } from '@/components/ui/card';

const Categories = async () => {
  const categories: Category[] = await getAllCategories();
  console.log(categories);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our wide range of products organized by categories. Find exactly what you&apos;re looking for.
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category: Category) => (
            <Link
              key={category._id}
              href={`/category-products/${category.slug}`}
              className="group transform transition-all duration-300 hover:scale-105"
            >
              <Card className="h-full bg-white shadow-md hover:shadow-xl transition-all duration-300 border-0 ring-1 ring-slate-200 hover:ring-blue-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain  transition-all duration-600 group-hover:object-cover"
                      
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-600"></div>
                  </div>
                  
                  {/* Category Name */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-900 text-center group-hover:text-blue-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="mt-2 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 mx-auto"></div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-tags text-3xl text-slate-400"></i>
            </div>
            <h2 className="text-2xl font-semibold text-slate-600 mb-2">No Categories Found</h2>
            <p className="text-slate-500">Categories will appear here once they&apos;re available.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories