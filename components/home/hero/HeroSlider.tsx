"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlurImage from "@/components/shared/blur-image";

const HeroSlider = () => {
  const images = [
    "/_static/assets/static/Hero Banners/1.png",
    "/_static/assets/static/Hero Banners/2.png",
    "/_static/assets/static/Hero Banners/3.png",
  ];
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <section className="md:col-span-6 lg:col-span-4">
      <div className="relative">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images?.map((index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <BlurImage
                        src={index}
                        alt="img"
                        height={300}
                        width={300}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default HeroSlider;
