import { MoveLeft, MoveRight } from "lucide-react";
import React from "react";

import { reviews } from "@/shared/constants";
import Wrapper from "../providers/wrapper";
import { ReviewCard } from "../cards/review-card";

const Review = () => {
  return (
    <section id="review">
      <Wrapper className="lg:px-0 py-20 space-y-10">
        <div className="flex justify-between">
          <h3 className="uppercase w-full font-black text-md sm:text-xl">
            Our Customer Happy
          </h3>
          <span className="flex gap-5">
            <MoveLeft />
            <MoveRight />
          </span>
        </div>
        <div className="flex overflow-x-auto space-x-5 scroll-snap-x p-5 hide-scrollbar">
          {reviews.map((review) => {
            return <ReviewCard key={review.name} {...review} />;
          })}
        </div>
      </Wrapper>
    </section>
  );
};

export default Review;
