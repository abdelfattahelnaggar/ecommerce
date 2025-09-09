"use client";
import React from 'react'
//!== Import Swiper React components ==//
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
//!==End of Imports==//

const SwiperCategory = ({categories}: {categories: any}) => {
  return (
    <div className='w-lwh mx-auto overflow-hidden'>
      <div className="w-full py-3">
        
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView="auto"
          autoplay={{
            delay: 0,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          speed={3500}
          loop={true}
          freeMode={true}
          className="category-ticker !overflow-visible"
        >

          {[...categories, ...categories].map((category: any) => (
            <SwiperSlide key={category._id} className="!w-auto">
              <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20  rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-slate-300 transition-colors">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-slate-700 font-medium whitespace-nowrap group-hover:text-slate-900 transition-colors">
                  {category.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Custom styles for continuous scroll */}
      <style jsx global>{`
        .category-ticker .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  )
}

export default SwiperCategory