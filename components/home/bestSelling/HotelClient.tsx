"use client";

import { HotelCard } from "@/components/home/bestSelling/BestSelling";
import { HotelWithRooms } from "@/app/(protected)/dashboard/components/Form";

const HotelClient = ({ hotels }) => {
  if (hotels.length < 1) return <div>hotels not found</div>;
  return (
    <div className="mt-5 grid grid-cols-3 gap-4 max-md:grid-cols-1">
      {hotels?.map((hotel: HotelWithRooms) => (
        <HotelCard hotel={hotel} key={hotel.id} />
      ))}
    </div>
  );
};

export default HotelClient;
