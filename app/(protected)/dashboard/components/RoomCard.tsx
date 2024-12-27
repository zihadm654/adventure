"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { imageRemove } from "@/actions/image-remove";
import { deleteRoomById } from "@/actions/room-listing";
import { Hotel, Reservation, Room } from "@prisma/client";
import { addDays, differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import {
  AirVent,
  Bath,
  Bed,
  Home,
  Loader2,
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
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

import useRoomReservation from "@/hooks/useReservation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import BlurImage from "@/components/shared/blur-image";

import RoomForm from "./RoomForm";

interface RoomCardProps {
  hotel?: Hotel & { room: Room[] };
  room: Room;
  reservations?: Reservation[];
}

const RoomCard = ({ hotel, room, reservations = [] }: RoomCardProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [days, setDays] = useState(0);
  const [includeBreakfast, setIncludeBreakfast] = useState(false);

  const router = useRouter();
  const {
    setRoomData,
    setPaymentIntentId,
    paymentIntentId,
    setClientSecret,
    clientSecret,
  } = useRoomReservation();

  useEffect(() => {
    if (date && date.from && date.to) {
      const dayCount = differenceInCalendarDays(date.to, date.from);
      setDays(dayCount);
      if (dayCount && includeBreakfast && room.breakfastPrice) {
        setTotalPrice(dayCount * room.price + dayCount * room.breakfastPrice);
      } else {
        setTotalPrice(room.price * dayCount);
      }
    }
  }, [date, includeBreakfast, room.breakfastPrice, room.price]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    const roomReservation = reservations.filter(
      (reservation) => reservation.roomId === room.id,
    );
    roomReservation.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);
  const handleDialogueOpen = () => {
    setOpen((prev) => !prev);
  };
  //delete room and image
  const handleDeleteRoom = async (room: Room) => {
    // setLoading(true);
    const getImageKey = (src: string) =>
      src.substring(src.lastIndexOf("/") + 1);
    try {
      const imageKey = getImageKey(room.image);
      const res = await imageRemove(imageKey);
      if (res.status === 401) {
        toast.success("image removed successfully");
      }
      await deleteRoomById(room.id);

      // setLoading(false);
      toast.success("Room deleted successfully");
    } catch (error) {
      // setLoading(false);
      console.log(error);
      toast.error("Error deleting room");
    }
  };

  const handleReservation = async () => {
    if (!hotel?.userId) return toast.error("something went wrong");

    if (date && date.from && date.to) {
      setReservationLoading(true);
      const reservationData = {
        room,
        totalPrice,
        breakfastIncluded: includeBreakfast,
        startDate: date.from,
        endDate: date.to,
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
              startDate: date.from,
              endDate: date.to,
              breakfastIncluded: includeBreakfast,
              totalPrice: totalPrice,
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
    } else {
      toast.error("Please select dates");
    }
  };

  const pathname = usePathname();
  const isMyHotel = pathname.includes("/dashboard");
  return (
    <Card>
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
      <CardFooter className="col-span-2 grid grid-cols-2 gap-4 py-3">
        <p>
          Room Price: <b>${room.price}</b> / day
        </p>
        <p>
          Breakfast Price: <b>${room.breakfastPrice}</b> / day
        </p>
        {isMyHotel ? (
          <div className="col-span-2 flex w-full items-center justify-between gap-2">
            <Button
              onClick={() => handleDeleteRoom(room)}
              variant="outline"
              className="max-w-[150px]"
              disabled={loading}
            >
              {loading ? (
                <Fragment>
                  <Loader2 className="mr-2 size-4" />
                  Deleting
                </Fragment>
              ) : (
                <Fragment>
                  <Trash2 className="size-4" />
                  Delete
                </Fragment>
              )}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button
                  type="button"
                  variant={"outline"}
                  className="max-w-[150px]"
                >
                  <Pencil className="size-4" />
                  Update Room
                </Button>
              </DialogTrigger>
              <DialogContent className="h-full w-11/12 max-w-[900px] overflow-y-scroll">
                <DialogHeader className="px-2">
                  <DialogTitle>Update room</DialogTitle>
                  <DialogDescription>
                    update a room by filling the given information
                  </DialogDescription>
                </DialogHeader>
                <RoomForm
                  hotel={hotel}
                  room={room}
                  handleDialogueOpen={handleDialogueOpen}
                />
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="col-span-2">
            <p className="mb-2">Select days that you will spend in this room</p>
            <DatePickerWithRange
              date={date}
              setDate={setDate}
              disabledDates={disabledDates}
            />
            {room.breakfastPrice > 0 && (
              <div className="pt-3">
                <div className="flex items-center justify-start gap-3">
                  <Checkbox
                    id="breakfast"
                    onCheckedChange={(value) => setIncludeBreakfast(!!value)}
                  />
                  <label htmlFor="breakfast">
                    Include Breakfast to be served breakfast each day
                  </label>
                </div>
              </div>
            )}
            <p className="my-3">
              Total Price: <b>{totalPrice}</b> for
              <b> {days} days</b>
            </p>
            <Button
              onClick={handleReservation}
              disabled={reservationLoading}
              type="button"
            >
              {reservationLoading ? (
                <Loader2 className="size-4" />
              ) : (
                <Wand2 className="size-4" />
              )}
              {reservationLoading ? "Reserving" : "Reserve"}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;

export const AmmenityItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};
