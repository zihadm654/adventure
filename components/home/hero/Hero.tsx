import React from "react";

// import Container from "@/components/shared/container/Container";

import HeroDescription from "./HeroDescription";
import HeroSlider from "./HeroSlider";

const Hero = () => {
  return (
    <section
      className="bg-cover bg-bottom bg-no-repeat py-12"
      style={{
        backgroundImage: "url(/_static/assets/home-page/banner/bannerBg.svg)",
      }}
    >
      <main className="container">
        <div className="flex flex-col gap-y-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
            <HeroDescription />
            <HeroSlider />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Hero;
