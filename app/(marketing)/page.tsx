import { getHotels } from "@/actions/hotel-listings";

import { infos } from "@/config/landing";
import Advantage from "@/components/home/advantage/Advantage";
import BestSelling from "@/components/home/bestSelling/BestSelling";
import Gallery from "@/components/home/gallery/Gallery";
import Hero from "@/components/home/hero/Hero";
import Offer from "@/components/home/offer/Offer";
import BentoGrid from "@/components/sections/bentogrid";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Powered from "@/components/sections/powered";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";

interface IProps {
  searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
  };
}

export default async function IndexPage({ searchParams }: IProps) {
  const hotels = await getHotels(searchParams);
  if (!hotels) return <div>No hotels found</div>;
  console.log(hotels, "hotels");
  return (
    <>
      <Hero />
      <Offer />
      <BestSelling hotels={hotels} />
      <Advantage />
      <Testimonials />
      <Gallery />
      {/* <HeroLanding />
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[0]} reverse={true} />
      <Features />
       */}
    </>
  );
}
