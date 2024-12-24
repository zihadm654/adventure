"use client";

import { Fragment, useState } from "react";
import { imageRemove } from "@/actions/image-remove";
import { deleteRoomById } from "@/actions/room-listing";
import { Hotel, Reservation, Room } from "@prisma/client";
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
  Wifi,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
  reservation?: Reservation[];
}

const RoomCard = ({ hotel, room, reservation }: RoomCardProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <Card className="px-2">
      <CardHeader>{room.title}</CardHeader>
      <CardDescription className="px-4 pb-3">
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
        <h4>Room Price: ${room.price} / day</h4>
        <h4>Room Price: ${room.price} / day</h4>
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
            <Button type="button" variant={"outline"} className="max-w-[150px]">
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
        {/* {hotel ? (
            <Button disabled={loading} className="max-w-[150px]">
              {loading ? (
                <Fragment>
                  <Loader2 className="mr-2 size-4" />
                  updating
                </Fragment>
              ) : (
                <Fragment>
                  <PencilLine className="size-4" />
                  Update
                </Fragment>
              )}
            </Button>
          ) : (
            <Button className="max-w-[150px]" disabled={loading}>
              {loading ? (
                <Fragment>
                  <Loader2 className="size-4" />
                  Creating
                </Fragment>
              ) : (
                <Fragment>
                  <PencilLine className="size-4" />
                  Create Hotel
                </Fragment>
              )}
            </Button>
          )} */}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;

export const AmmenityItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};
