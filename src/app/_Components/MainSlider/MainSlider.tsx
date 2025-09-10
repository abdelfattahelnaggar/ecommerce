"use client";
import React from "react";
import Image from "next/image";
//!== Import slider images ==//
import banner1 from "@/Assets/screens/slider/grocery-banner.png";
import banner2 from "@/Assets/screens/slider/grocery-banner-2.jpeg";
import slide1 from "@/Assets/screens/slider/slider-image-1.jpeg";
import slide2 from "@/Assets/screens/slider/slider-image-2.jpeg";
import slide3 from "@/Assets/screens/slider/slider-image-3.jpeg";
//!== Import Swiper React components ==//
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
//!==End of Imports==//

const MainSlider = () => {
  return (
    <div className="mb-12 md:px-0">
      <div className="w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-2 ">
          {/* Main Slider */}
          <div className="w-full lg:w-2/3 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-pagination-bullet",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                effect="fade"
                fadeEffect={{
                  crossFade: true,
                }}
                loop={true}
                className="h-[250px] sm:h-[350px] lg:h-[400px]"
              >
                <SwiperSlide>
                  <div className="relative h-full group">
                    <Image
                      src={slide1}
                      alt="Fresh Groceries Collection"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        Fresh Groceries
                      </h3>
                      <p className="text-sm opacity-90">
                        Premium quality at unbeatable prices
                      </p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative h-full group">
                    <Image
                      src={slide2}
                      alt="Organic Products Selection"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        Organic Selection
                      </h3>
                      <p className="text-sm opacity-90">
                        Healthy choices for your family
                      </p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative h-full group">
                    <Image
                      src={slide3}
                      alt="Daily Essentials"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        Daily Essentials
                      </h3>
                      <p className="text-sm opacity-90">
                        Everything you need, delivered fresh
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              {/* Custom Navigation Buttons */}
            </div>
          </div>

          {/* Side Banners */}
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-3 justify-center items-center">
            <div className="w-1/2 rounded overflow-hidden lg:w-full h-[120px] lg:h-[190px] relative group">
              <div className="shadow-lg h-full">
                <Image
                  src={banner1}
                  alt="Special Offers Banner"
                  fill
                  className="object-cover  group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-sm font-semibold">Special Offers</p>
                </div>
              </div>
            </div>

            <div className="w-1/2 rounded overflow-hidden lg:w-full h-[120px] lg:h-[190px] relative group">
              <div className="shadow-lg h-full">
                <Image
                  src={banner2}
                  alt="Weekly Deals Banner"
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-sm font-semibold">Weekly Deals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainSlider;
