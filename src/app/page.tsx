import getAllProducts from "@/apis/allProducts";
import HomeCard from "./_Components/HomeCard/HomeCard";
import MainSlider from "./_Components/MainSlider/MainSlider";
import CategorySlide from "./_Components/CategorySlide/CategorySlide";
import { Product } from "@/types/product.type";

const Home = async () => {
  const data:Product[] = await getAllProducts();

  return (
    <section className="px-5 md:px-0 my-10 w-full md:w-4/5 mx-auto">
      <MainSlider/>
      <CategorySlide />
      <div className="flex flex-wrap">
        {data.map((product: Product) => {
          return <HomeCard key={product._id} product={product} />;
        })}
      </div>
    </section>
  );
};
export default Home;
