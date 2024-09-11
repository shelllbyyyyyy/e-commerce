import React from "react";

import { IReview } from "@/shared/constants";

export const ReviewCard: React.FC<IReview> = ({ comment, name, rating }) => {
  return (
    <div className="bg-background  border border-gray-50 rounded-[20px] shadow pt-7 pb-12 px-8 flex-shrink-0 w-full md:w-[400px] scroll-snap-start">
      <p>{rating}</p>
      <h4 className="bold">{name}</h4>
      <p className="text-muted-foreground">{comment}</p>
    </div>
  );
};
