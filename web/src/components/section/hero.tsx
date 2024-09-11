import Image from "next/image";
import React from "react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const Hero = () => {
  return (
    <>
      <section id="hero">
        <div className="relative w-full flex flex-col sm:flex-row lg:h-[663px] bg-[#F2F0F1] overflow-hidden pt-5">
          <div className="flex flex-col gap-[32px] w-full p-2 sm:m-8 md:m-10 lg:m-24">
            <h1 className="font-black text-wrap leading-none sm:text-xl md:text-2xl text-lg max-sm:w-3/4">
              FIND CLOTHES THAT MATCH YOUR STYLE
            </h1>
            <p>
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <Button className="rounded-[64px] h-[52px] w-full sm:w-[210px] py-0">
              Shop Now
            </Button>
            <Sales />
          </div>
          <figure className="relative w-full h-[448px] sm:h-[600px] lg:h-[900px]">
            <Image
              src="/assets/hero.png"
              alt="hero"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "50% 0",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </figure>
        </div>
        <Brands />
      </section>
    </>
  );
};

export default Hero;

const Sales = () => {
  return (
    <div className="flex flex-wrap justify-center gap-5 sm:gap-1 md:gap-3 lg:gap-5">
      <span>
        <h2 className="text-lg font-bold">200+</h2>
        <p className="text-sm">International Brands</p>
      </span>
      <Separator orientation="vertical" className="h-auto" />
      <span>
        <h2 className="text-lg font-bold">2,000+</h2>
        <p className="text-sm">High-Quality Products</p>
      </span>
      <Separator orientation="vertical" className="h-auto hidden lg:block" />
      <span>
        <h2 className="text-lg font-bold">30,000+</h2>
        <p className="text-sm">Happy Customers</p>
      </span>
    </div>
  );
};

const Brands = () => {
  return (
    <div className="bg-black h-[112px] flex gap-2 sm:gap-5 flex-wrap justify-between items-center w-full px-10 sm:px-24">
      <Image
        src="/assets/brands/versace.png"
        width={116}
        height={23}
        className="w-auto h-auto bg-auto sm:w-[166px] sm:h-[33px]"
        alt="brands"
      />
      <Image
        src="/assets/brands/zara.png"
        width={116}
        height={23}
        className="w-auto h-auto bg-auto sm:w-[166px] sm:h-[33px]"
        alt="brands"
      />
      <Image
        src="/assets/brands/gucci.png"
        width={116}
        height={23}
        className="w-auto h-auto bg-auto sm:w-[166px] sm:h-[33px]"
        alt="brands"
      />
      <Image
        src="/assets/brands/prada.png"
        width={116}
        height={23}
        className="w-auto h-auto bg-auto sm:w-[166px] sm:h-[33px]"
        alt="brands"
      />
      <Image
        src="/assets/brands/calvin-klein.png"
        width={116}
        height={23}
        className="w-auto h-auto bg-auto sm:w-[166px] sm:h-[33px]"
        alt="brands"
      />
    </div>
  );
};
