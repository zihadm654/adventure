"use client";

import { Button } from "@/components/ui/button";

const HeroDescription = () => {
  return (
    <section className="md:col-span-6 lg:col-span-8">
      <article className="flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-8">
          <h1 className="whitespace-normal text-3xl md:text-5xl lg:text-7xl">
            Transform Your Dreams Into Your <b>Memory</b>
          </h1>
          <p className="text-base">
            Discover breathtaking destinations, vibrant cultures, and
            unforgettable experiences. <br /> Our expert team creates
            personalized itineraries tailored to your interests. <br /> Let us
            inspire and guide you as you create timeless memories through the
            joy of travel.
          </p>
        </div>
        <div>
          <Button
            className="px-[18px] py-[13px]"
            onClick={() => window.open("/hotels", "_self")}
          >
            Explore Now
          </Button>
        </div>
      </article>
    </section>
  );
};

export default HeroDescription;
