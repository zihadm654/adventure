import { getHotels } from "@/actions/hotel-listings";

import { constructMetadata } from "@/lib/utils";
import { HotelCard } from "@/components/home/bestSelling/BestSelling";
import { HotelWithRooms } from "@/app/(protected)/dashboard/components/Form";

export const metadata = constructMetadata({
  title: "Hotels - Advanture",
  description: "creation of hotel and rooms",
});
interface IProps {
  searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
  };
}
export default async function ChartsPage({ searchParams }: IProps) {
  const hotels = await getHotels(searchParams);
  console.log(hotels, "hotels");
  if (!hotels) return <div>hotels not found</div>;
  if ("error" in hotels) {
    return <div>Error loading hotels: {hotels.error}</div>;
  }

  return (
    <section className="container py-5">
      <h2 className="pb-4 text-2xl font-bold">List of hotels</h2>
      <div className="mt-5 grid grid-cols-3 gap-4 max-md:grid-cols-2">
        {hotels?.map((hotel: HotelWithRooms) => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}
      </div>
    </section>
  );
}
