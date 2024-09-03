import Image from "next/image";
import React from "react";

type ProductCardProps = {
  name: string;
  price: number;
  imageUrl: string;
  rating: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  name,
  price,
  rating,
}) => {
  return (
    <div className=" flex flex-col h-auto gap-5">
      <figure className="relative aspect-square bg-background border shadow rounded-[20px] w-[295px] h-[298px] overflow-hidden">
        <Image src={imageUrl} fill alt={name} className="object-center" />
      </figure>
      <span className="space-y-2">
        <h4 className="text-[20px]">{name}</h4>
        <h4>{rating}</h4>
        <h4 className="text-[24px]">{price}</h4>
      </span>
    </div>
  );
};
