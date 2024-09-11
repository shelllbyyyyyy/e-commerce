import React from "react";

import Wrapper from "../providers/wrapper";
import { CategoryCard } from "../cards/category-card";

const Browse = () => {
  return (
    <section id="browse" className="w-full">
      <Wrapper className="relative sm:h-[866px] h-auto bg-gray-50 rounded-[62px] shadow flex flex-col items-center py-16 overflow-hidden">
        <h3 className="uppercase font-black text-center text-md sm:text-xl">
          Browse By Dress Style
        </h3>
        <Category />
      </Wrapper>
    </section>
  );
};

export default Browse;

const Category = () => {
  return (
    <>
      <div className="hidden sm:grid grid-cols-1 gap-5 w-full absolute top-[55%] left-[60%] translate-x-[-50%] translate-y-[-50%] ">
        <div className="flex w-full gap-5 ">
          <CategoryCard
            imageUrl="/assets/category/casual.png"
            name="Casual"
            className="flex-none"
          />
          <CategoryCard
            imageUrl="/assets/category/formal.png"
            name="Formal"
            className="flex-1"
          />
        </div>
        <div className="flex w-full gap-5 ">
          <CategoryCard
            imageUrl="/assets/category/party.png"
            name="Party"
            className="flex-1"
          />
          <CategoryCard
            imageUrl="/assets/category/gym.png"
            name="Gym"
            className="flex-none"
          />
        </div>
      </div>
      <div className="flex sm:hidden flex-col gap-5 w-full h-auto">
        <CategoryCard imageUrl="/assets/category/casual.png" name="Casual" />
        <CategoryCard imageUrl="/assets/category/formal.png" name="Formal" />
        <CategoryCard imageUrl="/assets/category/party.png" name="Party" />
        <CategoryCard imageUrl="/assets/category/gym.png" name="Gym" />
      </div>
    </>
  );
};
