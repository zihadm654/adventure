"use client";

import React, { useEffect, useMemo, useState } from "react";

import Search from "./Search";

const Banner = () => {
  const bannerImages = useMemo(
    () => [
      "https://github.com/devhasibulislam/travello-template/blob/master/public/assets/tours-page/banner1.jpg?raw=true",
      "https://github.com/devhasibulislam/travello-template/blob/master/public/assets/tours-page/banner2.jpg?raw=true",
    ],
    [],
  );

  const [backgroundImage, setBackgroundImage] = useState(
    bannerImages[Math.floor(Math.random() * bannerImages.length)],
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundImage(
        bannerImages[Math.floor(Math.random() * bannerImages.length)],
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [bannerImages]);

  return (
    <section
      className="relative z-20 flex h-[70vh] flex-col justify-center gap-y-12 bg-auto bg-bottom bg-no-repeat px-4 before:absolute before:left-0 before:top-0 before:-z-10 before:size-full before:bg-black/60 before:content-['']"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <article className="flex flex-col items-center gap-y-8">
        <h1 className="text-center text-xl text-white md:text-5xl lg:text-7xl">
          Filter Your Required Tours
        </h1>
        <p className="w-full text-center text-xs text-white md:w-3/4 md:text-sm lg:w-1/2 lg:text-base">
          The Best Selling Tour is an unforgettable journey that has captured
          the hearts of travelers worldwide. This remarkable adventure offers an
          unparalleled exploration of some of the most awe-inspiring
          destinations on the planet, combining luxury and adventure in perfect
          harmony
        </p>
      </article>

      {/* <Search /> */}
    </section>
  );
};

export default Banner;
