import React from "react";

import Wrapper from "../providers/wrapper";
import { CategoryCard } from "../cards/category-card";

export const Browse = () => {
  return (
    <section id="browse" className="w-full h-auto">
      <Wrapper className="relative h-[866px] bg-gray-50 rounded-[62px] shadow flex flex-col items-center py-16">
        <h3 className="uppercase">Browse By Dress Style</h3>
        <div className="grid grid-cols-1 gap-5 w-full absolute top-[55%] left-[60%] translate-x-[-50%] translate-y-[-50%]">
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
      </Wrapper>
    </section>
  );
};
