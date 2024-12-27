import React from "react";
import { getReservations } from "@/actions/getReservations";
import { getHotelById } from "@/actions/hotel-listings";

import HotelDetails from "./hotel-details";

interface HotelProps {
  params: {
    hotelId: string;
  };
}
const page = async ({ params }: HotelProps) => {
  const hotel = await getHotelById(params.hotelId);
  const reservations = await getReservations(hotel?.id!);

  if (!hotel) return <div>Hotel not found</div>;

  return <HotelDetails hotel={hotel} reservations={reservations} />;
};

export default page;
