import React from 'react'
import getAllProducts from '@/apis/allProducts'
import HomeCard from '@/app/_Components/HomeCard/HomeCard'
import { Product } from '@/types/product.type'
import Link from 'next/link'

interface CategoryProductsProps {
  params: {
    categoryName: string
  }
}

const CategoryProducts = async ({ params }: CategoryProductsProps) => {
  const { categoryName } = await params
  
  // Fetch all products
  const allProducts: Product[] = await getAllProducts()
  
  // Filter products by category slug or name (case-insensitive)
  const categoryProducts = allProducts.filter((product: Product) => 
    product.category.slug.toLowerCase() === categoryName.toLowerCase() ||
    product.category.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === categoryName.toLowerCase()
  )
  
  // Decode and format category name for display
  const displayCategoryName = categoryProducts.length > 0 
    ? categoryProducts[0].category.name 
    : decodeURIComponent(categoryName).replace(/-/g, ' ')

  return (
    <section className="px-5 md:px-0 my-10 w-full md:w-4/5 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {displayCategoryName}
        </h1>
        <p className="text-gray-600">
          {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      {categoryProducts.length > 0 ? (
        <div className="flex flex-wrap">
          {categoryProducts.map((product: Product) => (
            <HomeCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              No Products Found
            </h2>
            <p className="text-gray-500 mb-6">
              We couldn&apos;t find any products in the &ldquo;{displayCategoryName}&rdquo; category.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default CategoryProducts