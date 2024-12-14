"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";

// import { useGetRentsQuery } from "@/services/rent/rentApi";
// import { BiRightArrowAlt } from "react-icons/bi";

import BlurImage from "@/components/shared/blur-image";

const BestSelling = () => {
  // const { data, isLoading, error } = useGetRentsQuery();
  // const tours = useMemo(() => data?.data || [], [data]);

  // useEffect(() => {
  //   if (error) {
  //     console.log(error?.data?.message);
  //   }
  // }, [error]);

  return (
    <section id="flights" className="py-12">
      <section className="container">
        <section className="flex size-full flex-col gap-y-12">
          <div className="flex flex-row items-center justify-between">
            <article className="flex flex-col gap-y-4">
              <h1 className="whitespace-normal text-3xl md:text-4xl lg:text-5xl">
                <b>Best</b> Selling
                <BlurImage
                  src="/_static/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5"
                />
              </h1>
              <p className="text-base">
                Here are some of our best selling tours across all of our
                destinations
              </p>
            </article>
            <div className="border-b-2 border-b-transparent text-primary transition-all hover:border-b-primary">
              <Link
                href="/tours"
                className="flex flex-row items-center gap-x-1 whitespace-nowrap"
              >
                See More
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {/* {tours?.length === 0 || isLoading
              ? Array.from({ length: 4 }, (_, index) => (
                  <SkeletonCard key={index} />
                ))
              : tours
                  ?.slice(0, 8)
                  ?.map((tour) => <Card key={tour._id} tour={tour} />)} */}
          </div>
        </section>
      </section>
    </section>
  );
};

export default BestSelling;
