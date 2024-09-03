import React from "react";
import { notFound } from "next/navigation";

import { Product } from "@/shared/common/interface/product";
import Wrapper from "../providers/wrapper";
import { ProductCard } from "../cards/product-card";
import { Button } from "../ui/button";

const getProducts = async () => {
  const baseUrl = process.env.BASE_API_URL;
  const res = await fetch(`${baseUrl}/product`, {
    cache: "no-store",
  });

  const result = await res.json();
  if (!result) notFound();

  return result;
};

export const TopSelling = async () => {
  const { data } = await getProducts();

  return (
    <section id="top-selling" className="w-full h-auto pb-16">
      <Wrapper className="flex flex-col justify-center items-center gap-14">
        <h2 className="uppercase">Top Selling</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {data.map((product: Product) => {
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                rating="tes"
                price={product.price}
                imageUrl={product.imageUrl[0]}
              />
            );
          })}
        </div>
        <Button variant={"outline"} size={"lg"} className="rounded-[62px]">
          View All
        </Button>
      </Wrapper>
    </section>
  );
};
