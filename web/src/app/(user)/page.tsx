import React from "react";

import Container from "@/components/providers/container";
import { Browse } from "@/components/section/browse";
import { Hero } from "@/components/section/hero";
import { NewArrival } from "@/components/section/new-arrivals";
import { Review } from "@/components/section/review";
import { TopSelling } from "@/components/section/top-selling";

const LandingPage = () => {
  return (
    <main className="w-full min-h-screen">
      <Container>
        <Hero />
        <NewArrival />
        <TopSelling />
        <Browse />
        <Review />
      </Container>
    </main>
  );
};

export default LandingPage;
