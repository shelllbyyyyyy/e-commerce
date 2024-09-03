import Image from "next/image";
import React from "react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const Hero = () => {
  return (
    <>
      <section id="hero" className="relative">
        <div className="absolute top-16 left-20 w-[600px] flex flex-col gap-[32px]">
          <h1 className="font-black text-wrap leading-none">
            FIND CLOTHES THAT MATCH YOUR STYLE
          </h1>
          <p>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Button className="rounded-[64px] w-[210px] h-[52px] py-0">
            Shop Now
          </Button>
          <Sales />
        </div>
        <figure>
          <Image src="/assets/hero.png" height={663} width={1400} alt="hero" />
        </figure>
        <Brands />
      </section>
    </>
  );
};

const Sales = () => {
  return (
    <div className="flex gap-[28px]">
      <span>
        <h2 className="text-[40px] font-bold">200+</h2>
        <p className="text-[16px]">International Brands</p>
      </span>

      <Separator orientation="vertical" className=" h-auto" />

      <span>
        <h2 className="text-[40px] font-bold">2,000+</h2>
        <p className="text-[16px]">International Brands</p>
      </span>

      <Separator orientation="vertical" className=" h-auto" />

      <span>
        <h2 className="text-[40px] font-bold">30,000+</h2>
        <p className="text-[16px]">International Brands</p>
      </span>
    </div>
  );
};

const Brands = () => {
  return (
    <div className="bg-black h-[112px] flex gap-5 justify-between items-center w-full px-[100px]">
      <Image
        src="/assets/brands/versace.png"
        width={166}
        height={33}
        className="w-auto h-auto bg-auto"
        alt="brands"
      />
      <Image
        src="/assets/brands/zara.png"
        width={166}
        height={33}
        className="w-auto h-auto bg-auto"
        alt="brands"
      />
      <Image
        src="/assets/brands/gucci.png"
        width={166}
        height={33}
        className="w-auto h-auto bg-auto"
        alt="brands"
      />
      <Image
        src="/assets/brands/prada.png"
        width={166}
        height={33}
        className="w-auto h-auto bg-auto"
        alt="brands"
      />
      <Image
        src="/assets/brands/calvin-klein.png"
        width={166}
        height={33}
        className="w-auto h-auto bg-auto"
        alt="brands"
      />
    </div>
  );
};
