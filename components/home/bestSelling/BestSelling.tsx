"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import BlurImage from "@/components/shared/blur-image";
import { HotelWithRooms } from "@/app/(protected)/dashboard/components/Form";
import { AmmenityItem } from "@/app/(protected)/dashboard/components/RoomCard";

const BestSelling = ({ hotels }: any) => {
  return (
    <section className="container py-5">
      <h2 className="pb-4 text-3xl font-bold">Best Selling</h2>
      <div className="mt-5 grid grid-cols-3 gap-4 max-md:grid-cols-2">
        {hotels.map((hotel: HotelWithRooms) => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}
      </div>
    </section>
  );
};

export default BestSelling;

export const HotelCard = ({ hotel }: { hotel: HotelWithRooms }) => {
  const { getCountryByCode } = useLocation();
  const country = getCountryByCode(hotel.country);
  const router = useRouter();
  const pathname = usePathname();
  const isMyHotel = pathname.includes("/dashboard/hotels");

  return (
    <Card
      onClick={() => !isMyHotel && router.push(`/hotels/${hotel.id}`)}
      key={hotel.id}
    >
      <BlurImage
        src={hotel.image}
        alt={hotel.title}
        width={400}
        height={300}
        className="w-full rounded object-cover"
      />
      <CardTitle className="px-2 py-4">{hotel.title}</CardTitle>
      <CardDescription className="p-2">
        {hotel.description.substring(0, 50)}...
      </CardDescription>
      <AmmenityItem>
        <MapPin className="size-4" /> {country?.name}, {hotel.city}
      </AmmenityItem>
      <CardContent className="grid grid-cols-2 gap-3 p-3">
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
      </CardContent>
      <CardFooter className="flex items-center justify-between p-2">
        {hotel.room.length > 0 && (
          <div className="flex items-center justify-between gap-3">
            <h3>${hotel?.room[0].price}</h3>
            <p> / day</p>
          </div>
        )}
        {!!isMyHotel && (
          <Link type="button" href={`/hotels/${hotel.id}`}>
            Edit
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
