import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type CategoryCardProps = {
  name: string;
  imageUrl: string;
  className?: string;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  imageUrl,
  name,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative rounded-[20px] shadow bg-background overflow-hidden sm:w-[407px] min-w-[310px] max-w-[684px] sm:h-[289px] min-h-[190px]",
        className
      )}
    >
      <Image
        src={imageUrl}
        fill
        alt="tes"
        className="object-cover h-auto w-auto"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      />
      <h3 className="absolute left-5 top-5">{name}</h3>
    </div>
  );
};
