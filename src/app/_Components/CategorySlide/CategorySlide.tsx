import React from "react";
import getAllCategories from "@/apis/allCategories";
import SwiperCategory from "../SwiperCategory/SwiperCategory";
import { Category } from "@/types/category.type";
const CategorySlide = async () => {
  const categories:Category[] = await getAllCategories();
  return (
    <div className="mb-3">
      <SwiperCategory categories={categories} />
    </div>
  );
};

export default CategorySlide;
