import { getHotelById } from "@/actions/hotel-listings";
import { getReservations } from "@/actions/reservation";

import HotelDetails from "./hotel-details";

interface HotelProps {
  params: {
    hotelId: string;
  };
}
const page = async ({ params }: HotelProps) => {
  const hotel = await getHotelById(params.hotelId);
  const reservations = await getReservations(hotel?.id!);
  if (!reservations) return <div>reservations not found</div>;
  if (!hotel) return <div>Hotel not found</div>;

  return <HotelDetails hotel={hotel} reservations={reservations.data} />;
};

export default page;
