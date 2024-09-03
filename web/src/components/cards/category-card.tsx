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
        "relative rounded-[20px] shadow bg-background overflow-hidden min-w-[407px] max-w-[684px] h-[289px] ",
        className
      )}
    >
      <Image
        src={imageUrl}
        fill
        alt="tes"
        className="object-cover h-auto w-auto"
        sizes="(max-width: 684px) 100vw"
      />
      <h3 className="absolute left-5 top-5">{name}</h3>
    </div>
  );
};
