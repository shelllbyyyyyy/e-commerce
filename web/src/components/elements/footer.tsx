import { Mail } from "lucide-react";
import Image from "next/image";
import React from "react";

import { badges, footers, social } from "@/shared/constants";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FooterCard, FooterSocial } from "../cards/footer-cards";
import { Separator } from "../ui/separator";

export const Footer = () => {
  return (
    <footer id="footer" className="relative  w-full bg-gray-100 pt-44">
      <div className="w-full flex flex-col max-w-[1400px] mx-auto gap-16 items-center px-1 sm:px-8">
        <Contact />
      </div>
      <div className="w-full flex flex-col max-w-[1400px] mx-auto gap-16 items-center px-4 sm:px-8 bottom-0">
        <div className="flex sm:flex-row flex-col justify-between items-start gap-16">
          <div className="w-full sm:w-1/3 text-start space-y-5">
            <h2 className="uppercase text-md md:text-md lg:text-xl">My Shop</h2>
            <p>
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
            <div className="flex gap-2 w-full">
              {social.map((value, i) => {
                return <FooterSocial key={i} {...value} />;
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-3/8 gap-4 sm:gap-16">
            {footers.map((footer) => {
              return <FooterCard key={footer.title} {...footer} />;
            })}
          </div>
        </div>
        <div className="space-y-[25px] w-full">
          <Separator className=" bg-muted-foreground" />
          <div className="flex justify-between flex-col sm:flex-row items-center">
            <p className="text-muted-foreground">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex gap-1">
              {badges.map(({ imageUrl }) => {
                return (
                  <Image
                    key={imageUrl}
                    src={imageUrl}
                    width={46}
                    height={30}
                    alt="badge"
                    style={{
                      width: "auto",
                      height: "auto",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Contact = () => {
  return (
    <>
      <div className="absolute top-[0%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black rounded-[20px] md:px-10 md:py-4 lg:p-16 hidden sm:flex justify-between w-full max-w-[1400px] items-center">
        <span className="w-1/2">
          <h2 className="text-white font-black uppercase">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
        </span>
        <div className="sm:w-1/2 lg:w-1/4 relative">
          <Mail className="absolute top-2.5 left-5 text-muted-foreground" />
          <Input
            className="bg-white py-5 px-14"
            placeholder="Enter your email address"
          />
          <Button variant={"outline"} className="w-full rounded-[20px] mt-3">
            Subscripe to Newsletter
          </Button>
        </div>
      </div>
      <div className="absolute top-[0%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black rounded-[20px] p-8  sm:hidden flex flex-col justify-center w-full max-w-[1400px]">
        <span className="w-full">
          <h2 className="text-white font-black uppercase text-md">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
        </span>
        <div className="w-center relative">
          <Mail className="absolute top-2.5 left-5 text-muted-foreground" />
          <Input
            className="bg-white py-5 px-14"
            placeholder="Enter your email address"
          />
          <Button variant={"outline"} className="w-full rounded-[20px] mt-3">
            Subscripe to Newsletter
          </Button>
        </div>
      </div>
    </>
  );
};
