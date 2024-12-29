"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hotel, Reservation, Room } from "@prisma/client";
import {
  AirVent,
  Bath,
  Bed,
  Home,
  Loader2,
  MapPin,
  Pencil,
  PencilLine,
  Plus,
  Trash2,
  Trees,
  Tv,
  Users,
  UtensilsCrossed,
  Wand2,
  Wifi,
} from "lucide-react";
import moment from "moment";
import { toast } from "sonner";

import useLocation from "@/hooks/useLocation";
import useRoomReservation from "@/hooks/useReservation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BlurImage from "@/components/shared/blur-image";

interface RerservationsClientProps {
  reservations: Reservation & { room: Room | null } & { hotel: Hotel | null };
}

const ReservationsClient = ({ reservations }: RerservationsClientProps) => {
  const [reservationLoading, setReservationLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { setRoomData, setPaymentIntentId, paymentIntentId, setClientSecret } =
    useRoomReservation();
  const router = useRouter();
  const { getCountryByCode, getStateByCode } = useLocation();
  const { hotel, room } = reservations;
  if (!hotel || !room) return null;
  const country = getCountryByCode(hotel.country);
  const state = getStateByCode(hotel.country, hotel.state);

  const startDate = moment(reservations.startDate).format("MMMM Do YYYY");
  const endDate = moment(reservations.startDate).format("MMMM Do YYYY");

  const handleReservation = async () => {
    if (!hotel?.userId) return toast.error("something went wrong");

    setReservationLoading(true);
    const reservationData = {
      room: room,
      totalPrice: reservations.totalPrice,
      breakfastIncluded: reservations.breakfastIncluded,
      startDate: reservations.startDate,
      endDate: reservations.endDate,
    };
    setRoomData(reservationData);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reserve: {
            hotelId: hotel.id,
            userId: hotel.userId,
            roomId: room.id,
            startDate: reservationData.startDate,
            endDate: reservationData.endDate,
            breakfastIncluded: reservationData.breakfastIncluded,
            totalPrice: reservationData.totalPrice,
          },
          paymentIntentId: paymentIntentId,
        }),
      });
      setReservationLoading(false);

      if (res.status === 401) {
        return router.push("/login");
      }
      const data = await res.json();
      console.log(data);

      setClientSecret(data.client_secret);
      setPaymentIntentId(data.id);
      router.push("/reservation");
    } catch (error) {
      console.log(error, "error");
      toast.error("something went wrong");
    }
  };

  return (
    <Card>
      <h2 className="p-3 text-2xl font-bold">{hotel.title}</h2>
      <div className="mt-3 px-3 pb-3 font-semibold">
        <AmmenityItem>
          <MapPin className="size-4" />
          {country?.name},{state?.name} ,{hotel.city}
        </AmmenityItem>
        <p>{hotel.location}</p>
      </div>
      <CardHeader>{room.title}</CardHeader>
      <CardDescription className="px-4 pb-3 text-base">
        {room.description}
      </CardDescription>
      <CardContent>
        <BlurImage
          src={room.image}
          alt={room.title}
          height={400}
          width={400}
          className="h-48 w-full object-cover"
        />
        <div className="mt-2 grid grid-cols-2 content-start gap-2 text-sm">
          <AmmenityItem>
            <Bed className="size-4" />
            {room.bed} Bed
          </AmmenityItem>
          <AmmenityItem>
            <Users className="size-4" />
            {room.guest} Guests
          </AmmenityItem>
          <AmmenityItem>
            <Bath className="size-4" />
            {room.bathroom} Bathroom
          </AmmenityItem>
          {!!room.roomservice && (
            <AmmenityItem>
              <UtensilsCrossed className="size-4" /> Room Service
            </AmmenityItem>
          )}
          {!!room.tv && (
            <AmmenityItem>
              <Tv className="size-4" /> TV
            </AmmenityItem>
          )}
          {!!room.balcony && (
            <AmmenityItem>
              <Home className="size-4" /> Balcony
            </AmmenityItem>
          )}
          {!!room.wifi && (
            <AmmenityItem>
              <Wifi className="size-4" /> Wifi
            </AmmenityItem>
          )}
          {!!room.ac && (
            <AmmenityItem>
              <AirVent className="size-4" /> AC
            </AmmenityItem>
          )}
          {!!room.view && (
            <AmmenityItem>
              <Trees className="size-4" /> Room View
            </AmmenityItem>
          )}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4 py-2">
          <h5>
            Room Price: <b>{room.price}</b> /days
          </h5>
          {!!room.breakfastPrice && (
            <h5>
              Breakfast Price: <b>{room.breakfastPrice}</b>
            </h5>
          )}
        </div>
        <Separator />
        <h5>Reservation Details</h5>
        <h5>
          Room booked for {""} days - {moment(reservations.createdAt).fromNow()}
        </h5>
        <p>
          Check-in {startDate} at 5PM & Check-out {endDate} at 5PM
        </p>
        {reservations.breakfastIncluded && <p>Breakfast will be served</p>}
        {reservations.paymentStatus ? (
          <p className="text-teal-500">
            Paid ${reservations.totalPrice} - Room Reserved
          </p>
        ) : (
          <p className="text-rose-500">
            Not Paid ${reservations.totalPrice} - Room not Reserved
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          {!reservations.paymentStatus && (
            <Button
              disabled={paymentLoading}
              variant="outline"
              onClick={() => handleReservation()}
            >
              Pay Now
            </Button>
          )}
          <Button onClick={() => router.push("/dashboard/hotels")}>
            View Hotel
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReservationsClient;

export const AmmenityItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};
