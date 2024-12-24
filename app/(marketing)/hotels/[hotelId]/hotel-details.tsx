"use client";

import {
  Bike,
  Coffee,
  Dumbbell,
  GlassWater,
  MapPin,
  ParkingCircle,
  WashingMachine,
  Waves,
} from "lucide-react";

import useLocation from "@/hooks/useLocation";
import { Separator } from "@/components/ui/separator";
import BlurImage from "@/components/shared/blur-image";
import { HotelWithRooms } from "@/app/(protected)/dashboard/components/Form";
import RoomCard, {
  AmmenityItem,
} from "@/app/(protected)/dashboard/components/RoomCard";

const HotelDetails = ({ hotel }: { hotel: HotelWithRooms }) => {
  const { getCountryByCode } = useLocation();
  const country = getCountryByCode(hotel.country);

  return (
    <div className="container">
      <BlurImage
        src={hotel.image}
        alt={hotel?.title}
        height={400}
        width={300}
        className="w-full object-cover"
      />
      <div className="mt-5">
        <h2 className="text-2xl font-bold">{hotel.title}</h2>
        <div className="mt-3 font-semibold">
          <AmmenityItem>
            <MapPin className="size-4" />
            {country?.name}, {hotel.city}
          </AmmenityItem>
          <p>{hotel.location}</p>
        </div>
        <div className="mt-5">
          <h3 className="pb-3 text-xl font-semibold">About this hotel</h3>
          <p>{hotel.description}</p>
        </div>
        <div className="mt-5">
          <h3 className="pb-3 text-xl font-semibold">Popular Amenitites</h3>
          <div className="grid grid-cols-2 gap-3 py-2">
            {hotel.pool && (
              <AmmenityItem>
                <Waves className="size-4" /> Pool
              </AmmenityItem>
            )}
            {hotel.gym && (
              <AmmenityItem>
                <Dumbbell className="size-4" /> Gym
              </AmmenityItem>
            )}
            {hotel.laundry && (
              <AmmenityItem>
                <WashingMachine className="size-4" /> Laundry
              </AmmenityItem>
            )}
            {hotel.parking && (
              <AmmenityItem>
                <ParkingCircle className="size-4" /> Parking
              </AmmenityItem>
            )}
            {hotel.bar && (
              <AmmenityItem>
                <GlassWater className="size-4" /> Bar
              </AmmenityItem>
            )}
            {hotel.bikeRental && (
              <AmmenityItem>
                <Bike className="size-4" /> Bike Rental
              </AmmenityItem>
            )}
            {hotel.coffeeShop && (
              <AmmenityItem>
                <Coffee className="size-4" /> Coffee Shop
              </AmmenityItem>
            )}
          </div>
        </div>
      </div>
      <Separator />
      {!!hotel.room.length && (
        <div className="my-4 text-lg">
          <h3 className="text-xl">Hotel Rooms</h3>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {hotel?.room.map((room) => (
              <RoomCard key={room.id} hotel={hotel} room={room} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
