import React from 'react'
import getAllProducts from '@/apis/allProducts'
import HomeCard from '@/app/_Components/HomeCard/HomeCard'
import { Product } from '@/types/product.type'
import Link from 'next/link'

interface BrandProductsProps {
  params: {
    brandName: string
  }
}

const BrandProducts = async ({ params }: BrandProductsProps) => {
  const { brandName } = await params
  
  // Fetch all products
  const allProducts: Product[] = await getAllProducts()
  
  // Filter products by brand slug or name (case-insensitive)
  const brandProducts = allProducts.filter((product: Product) => 
    product.brand.slug.toLowerCase() === brandName.toLowerCase() ||
    product.brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === brandName.toLowerCase()
  )
  
  // Decode and format brand name for display
  const displayBrandName = brandProducts.length > 0 
    ? brandProducts[0].brand.name 
    : decodeURIComponent(brandName).replace(/-/g, ' ')

  return (
    <section className="px-5 md:px-0 my-10 w-full md:w-4/5 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {displayBrandName}
        </h1>
        <p className="text-gray-600">
          {brandProducts.length} product{brandProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      {brandProducts.length > 0 ? (
        <div className="flex flex-wrap">
          {brandProducts.map((product: Product) => (
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
              We couldn&apos;t find any products from the &ldquo;{displayBrandName}&rdquo; brand.
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

export default BrandProducts