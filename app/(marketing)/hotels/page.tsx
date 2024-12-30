import { getHotels } from "@/actions/hotel-listings";

import { constructMetadata } from "@/lib/utils";
import HotelClient from "@/components/home/bestSelling/HotelClient";

export const metadata = constructMetadata({
  title: "Hotels - Advanture",
  description: "creation of hotel and rooms",
});

// At the top of your page.tsx file
export const dynamic = "force-dynamic";

interface IProps {
  searchParams: {
    title?: string;
    country?: string;
    state?: string;
    city?: string;
  };
}
export default async function ChartsPage({ searchParams }: IProps) {
  const hotels = await getHotels(searchParams);
  if (!hotels) return <div>hotels not found</div>;

  // Ensure hotels data is serializable
  const serializedHotels = JSON.parse(JSON.stringify(hotels));

  return (
    <section className="container py-5">
      <h2 className="pb-4 text-2xl font-bold">List of hotels</h2>
      <HotelClient hotels={serializedHotels} />
    </section>
  );
}
