import { Mail } from "lucide-react";
import Image from "next/image";
import React from "react";
import Wrapper from "../providers/wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { badges, footers } from "@/shared/constants";
import { FooterCard } from "../cards/footer-cards";
import { Separator } from "../ui/separator";

export const Footer = () => {
  return (
    <footer id="footer" className="relative  w-full bg-gray-100 h-[589px]">
      <div className="absolute top-[5%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black rounded-[20px] p-16 flex justify-between w-full max-w-[1400px]">
        <span className="w-1/2">
          <h2 className="text-white font-black uppercase">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
        </span>
        <div className="w-1/4 relative">
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
      <div className="absolute top-[70%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex flex-col max-w-[1400px] mx-auto gap-16">
        <div className="flex justify-between items-start">
          <div className="w-1/4 text-start">
            <h2 className="uppercase">My Shop</h2>
            <p>
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 w-3/8 gap-16">
            {footers.map((footer) => {
              return <FooterCard key={footer.title} {...footer} />;
            })}
          </div>
        </div>
        <div className="space-y-[25px]">
          <Separator className=" bg-muted-foreground" />
          <div className="flex justify-between">
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
