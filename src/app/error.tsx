"use client"
import React from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const Error = ({  reset }: ErrorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Main Content Container */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-white/20">
          
          {/* Error Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              {/* Pulse Effect */}
              <div className="absolute inset-0 w-24 h-24 bg-red-200 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          
          {/* Error Message */}
          <div className="space-y-6 mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight">
              Oops!
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-600">
              Something went wrong
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-lg mx-auto">
              We encountered an unexpected error while processing your request. Don&apos;t worry, our team has been notified and we&apos;re working to fix it.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-8">
            <button 
              onClick={reset}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 mr-3 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
            
            <Link 
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-slate-200 hover:border-slate-300 group whitespace-nowrap"
            >
              <svg className="w-5 h-5 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Additional Help */}
          <div className="pt-8 border-t border-slate-200">
            <p className="text-slate-400 text-sm mb-4">
              Need immediate assistance?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/categories" className="text-slate-600 hover:text-slate-800 font-medium hover:underline transition-colors">
                Browse Categories
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/cart" className="text-slate-600 hover:text-slate-800 font-medium hover:underline transition-colors">
                View Cart
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/contact" className="text-slate-600 hover:text-slate-800 font-medium hover:underline transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error