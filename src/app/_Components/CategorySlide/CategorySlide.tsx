import React from "react";
import getAllCategories from "@/apis/allCategories";
import SwiperCategory from "../SwiperCategory/SwiperCategory";
const CategorySlide = async () => {
  const categories = await getAllCategories();
  return (
    <div className="mb-3">
      <SwiperCategory categories={categories} />
    </div>
  );
};

export default CategorySlide;
