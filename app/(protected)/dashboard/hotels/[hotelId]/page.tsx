import React from "react";
import { redirect } from "next/navigation";
import { getHotelById } from "@/actions/hotel-listings";

import { getCurrentUser } from "@/lib/session";

import HotelForm from "../../components/Form";

interface HotelProps {
  params: {
    hotelId: string;
  };
}
const page = async ({ params }: HotelProps) => {
  const hotel = await getHotelById(params.hotelId);
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) redirect("/auth/login");
  if (hotel && hotel.userId !== currentUser.id)
    return <div>Access denied...</div>;
  return (
    <div>
      <HotelForm />
    </div>
  );
};

export default page;
