"use client";

import React, { useRef, useState } from "react";

import BlurImage from "@/components/shared/blur-image";

const Gallery = () => {
  const images = [
    "/_static/assets/static/Gallery Explorer/1.png",
    "/_static/assets/static/Gallery Explorer/2.png",
    "/_static/assets/static/Gallery Explorer/3.png",
    "/_static/assets/static/Gallery Explorer/4.png",
    "/_static/assets/static/Gallery Explorer/5.png",
    "/_static/assets/static/Gallery Explorer/6.png",
    "/_static/assets/static/Gallery Explorer/7.png",
    "/_static/assets/static/Gallery Explorer/8.png",
    "/_static/assets/static/Gallery Explorer/9.png",
    "/_static/assets/static/Gallery Explorer/10.png",
    "/_static/assets/static/Gallery Explorer/11.png",
    "/_static/assets/static/Gallery Explorer/4.png",
    "/_static/assets/static/Gallery Explorer/5.png",
    "/_static/assets/static/Gallery Explorer/6.png",
    "/_static/assets/static/Gallery Explorer/7.png",
    "/_static/assets/static/Gallery Explorer/8.png",
    "/_static/assets/static/Gallery Explorer/12.png",
    "/_static/assets/static/Gallery Explorer/18.png",
    "/_static/assets/static/Gallery Explorer/19.png",
    "/_static/assets/static/Gallery Explorer/11.png",
    "/_static/assets/static/Gallery Explorer/13.png",
    "/_static/assets/static/Gallery Explorer/14.png",
    "/_static/assets/static/Gallery Explorer/15.png",
    "/_static/assets/static/Gallery Explorer/16.png",
    "/_static/assets/static/Gallery Explorer/8.png",
    "/_static/assets/static/Gallery Explorer/9.png",
    "/_static/assets/static/Gallery Explorer/10.png",
    "/_static/assets/static/Gallery Explorer/15.png",
    "/_static/assets/static/Gallery Explorer/16.png",
    "/_static/assets/static/Gallery Explorer/17.png",
    "/_static/assets/static/Gallery Explorer/12.png",
    "/_static/assets/static/Gallery Explorer/13.png",
    "/_static/assets/static/Gallery Explorer/14.png",
    "/_static/assets/static/Gallery Explorer/20.png",
  ];

  function shuffleArray(array) {
    const shuffledArray = array.slice(); // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const shuffledImages = shuffleArray(images);

  const items = [
    {
      title: "City",
      images: 17,
    },
    {
      title: "Foods",
      images: 27,
    },
    {
      title: "Hotel",
      images: 21,
    },
    {
      title: "Forest",
      images: 33,
    },
    {
      title: "Mountains",
      images: 30,
    },
    {
      title: "Sea Beaches",
      images: 31,
    },
  ];

  const [tab, setTab] = useState("Forest");
  const [counter, setCounter] = useState(9);
  const containerRef = useRef(null);

  return (
    <section id="deals" className="h-full py-12">
      <section className="container">
        <section className="flex size-full flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="whitespace-normal text-3xl md:text-4xl lg:text-5xl">
                <b>Gallery</b> Explorer
                <BlurImage
                  src="/_static/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5"
                />
              </h1>
              <p className="text-base">
                Featured photos based on foods, sea-beaches, mountains, forest,
                hotels and so on.
              </p>
            </article>
          </div>

          <div className="rounded-2xl border border-primary/30 bg-secondary/30 p-3 md:p-6 lg:p-12">
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-row flex-wrap gap-4">
                {items.map((item, index) => (
                  <span
                    key={index}
                    className={
                      "rounded-secondary cursor-pointer border border-primary px-4 py-1 text-sm transition-colors hover:border-secondary hover:bg-primary hover:text-white" +
                      " " +
                      (tab === item.title
                        ? "border-secondary bg-primary text-white"
                        : "")
                    }
                    onClick={() => {
                      setTab(item.title);
                      setCounter(item.images);
                    }}
                  >
                    {item.title}
                  </span>
                ))}
              </div>
              <div className="relative">
                <div
                  className="scrollbar-hide grid h-[720px] grid-cols-12 items-center gap-4 overflow-y-hidden"
                  ref={containerRef}
                >
                  {shuffledImages.slice(0, counter).map((image, index) => (
                    <BlurImage
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      height={(index + 1) % 2 === 0 ? 364 : 159}
                      width={267}
                      className={`col-span-12 w-full rounded border border-primary/30 object-cover drop-shadow md:col-span-6 lg:col-span-3 ${
                        (index + 1) % 2 === 0
                          ? "row-span-2 h-[364px]"
                          : "h-[159px]"
                      }`}
                      title={
                        "Dimension: " + ((index + 1) % 2 === 0 ? 364 : 159)
                      }
                    />
                  ))}

                  <div className="absolute bottom-0 left-0 h-12 w-full bg-gradient-to-t from-secondary/50 via-secondary/10 to-transparent"></div>
                </div>
                {/* <div className="absolute right-4 top-4 flex flex-col gap-y-2">
                  <span
                    className="rounded-secondary cursor-pointer border border-primary bg-secondary p-1.5 transition-colors hover:border-secondary hover:bg-primary hover:text-white"
                    onClick={() => {
                      {
                        const container = containerRef.current;
                        const scrollAmount = -512;

                        container.scrollBy({
                          top: scrollAmount,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                  </span>
                  <span
                    className="rounded-secondary cursor-pointer border border-primary bg-secondary p-1.5 transition-colors hover:border-secondary hover:bg-primary hover:text-white"
                    onClick={() => {
                      {
                        const container = containerRef.current;
                        const scrollAmount = 512;

                        container.scrollBy({
                          top: scrollAmount,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Gallery;
