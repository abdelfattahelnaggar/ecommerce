import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import notFound from '@/Assets/screens/404.jpg'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center">
        {/* Main Content Container */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-white/20">
          
          {/* 404 Image - Much Bigger */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Image
                src={notFound}
                alt="404 Not Found"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                priority
              />
              {/* Floating 404 Number */}
              <div className="absolute -top-6 -right-6 bg-slate-800 text-white text-4xl font-black px-6 py-3 rounded-2xl shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
                404
              </div>
            </div>
          </div>
          
          {/* Error Message */}
          <div className="space-y-6 mb-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-800 tracking-tight">
              Oops!
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-600">
              Page Not Found
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or the URL was mistyped.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Link 
              href="/"
              className="w-full sm:w-auto whitespace-nowrap inline-flex items-center justify-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
            
            <Link 
              href="/categories"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-slate-200 hover:border-slate-300 group whitespace-nowrap"
            >
              <svg className="w-5 h-5 mr-3 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Browse Categories
            </Link>
          </div>

          {/* Additional Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-slate-400 text-sm mb-4">
              Or explore other sections:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/brands" className="text-slate-600 hover:text-slate-800 font-medium hover:underline transition-colors">
                Brands
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/cart" className="text-slate-600 hover:text-slate-800 font-medium hover:underline transition-colors">
                Cart
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/login" className="text-slate-600 hover:text-slate-800 font-medium hover:underline transition-colors">
                Login
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/register" className="text-slate-600 hover:text-slate-800 font-medium hover:underline transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound