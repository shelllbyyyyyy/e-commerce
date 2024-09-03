import { MoveLeft, MoveRight } from "lucide-react";
import React from "react";

import { reviews } from "@/shared/constants";
import Wrapper from "../providers/wrapper";
import { ReviewCard } from "../cards/review-card";

export const Review = () => {
  return (
    <section id="review" className="w-full h-auto">
      <Wrapper className="lg:px-0 py-20 space-y-10">
        <div className="flex justify-between">
          <h3 className="uppercase">Our Customer Happy</h3>
          <span className="flex gap-5">
            <MoveLeft />
            <MoveRight />
          </span>
        </div>
        <div className="flex gap-5 justify-center">
          {reviews.map((review) => {
            return <ReviewCard key={review.name} {...review} />;
          })}
        </div>
      </Wrapper>
    </section>
  );
};
