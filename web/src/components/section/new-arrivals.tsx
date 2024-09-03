import { notFound } from "next/navigation";
import React from "react";

import { Product } from "@/shared/common/interface/product";

import Wrapper from "../providers/wrapper";
import { ProductCard } from "../cards/product-card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const getProducts = async () => {
  const baseUrl = process.env.BASE_API_URL;
  const res = await fetch(`${baseUrl}/product`, {
    cache: "no-store",
  });

  const result = await res.json();
  if (!result) notFound();

  return result;
};

export const NewArrival = async () => {
  const { data } = await getProducts();

  return (
    <section id="new-arrival" className="w-full h-auto py-16">
      <Wrapper className="flex flex-col justify-center items-center gap-14">
        <h2 className="uppercase">New Arrival</h2>
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

        <Separator />
      </Wrapper>
    </section>
  );
};
