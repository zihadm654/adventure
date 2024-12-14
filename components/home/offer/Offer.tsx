"use client";

import React from "react";

import BlurImage from "@/components/shared/blur-image";

const Offer = () => {
  return (
    <section
      className="h-full bg-contain bg-center bg-no-repeat py-12"
      style={{
        backgroundImage:
          "url(/_static/assets/home-page/offer/tree1.svg), url(/assets/home-page/offer/tree2.svg)",
        backgroundPosition: "0% 0%, 100% 100%",
        backgroundSize: "251px 300px, 251px 300px",
      }}
    >
      <main className="container">
        <div className="flex size-full flex-col gap-y-12">
          <article className="flex flex-col gap-y-4">
            <h1 className="whitespace-normal text-3xl md:text-4xl lg:text-5xl">
              <b>Offers</b> Explorer
              <BlurImage
                src="/_static/assets/home-page/destination/underline.svg"
                alt="arrow"
                height={7}
                width={275}
                className="mt-1.5"
              />
            </h1>
            <p className="text-base">
              Promotions, deals, and special offers for you
            </p>
          </article>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <BlurImage
              src="/_static/assets/static/Offers Explorer Banner/1.png"
              alt="offer-1"
              width={650}
              height={290}
              className="cursor-pointer rounded border border-primary object-cover"
              onClick={() => window.open("/tours", "_self")}
            />
            <BlurImage
              src="/_static/assets/static/Offers Explorer Banner/2.png"
              alt="offer-2"
              width={650}
              height={290}
              className="cursor-pointer rounded border border-primary object-cover"
              onClick={() => window.open("/tours", "_self")}
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Offer;
