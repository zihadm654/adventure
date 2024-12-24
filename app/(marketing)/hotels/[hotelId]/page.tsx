import React from "react";
import { getHotelById } from "@/actions/hotel-listings";

import HotelDetails from "./hotel-details";

interface HotelProps {
  params: {
    hotelId: string;
  };
}
const page = async ({ params }: HotelProps) => {
  const hotel = await getHotelById(params.hotelId);
  if (!hotel) return <div>Hotel not found</div>;

  return <HotelDetails hotel={hotel} />;
};

export default page;
