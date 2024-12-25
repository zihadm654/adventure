import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { imageRemove } from "@/actions/image-remove";
import { createRoom, updateRoom } from "@/actions/room-listing";
import { UploadButton } from "@/utility/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, Room } from "@prisma/client";
import { Loader2, PencilLine, X } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { roomSchema, TRoom } from "@/lib/validations/room";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface props {
  hotel?: Hotel & {
    room: Room[];
  };
  room?: Room;
  handleDialogueOpen: () => void;
}

const RoomForm = ({ hotel, room, handleDialogueOpen }: props) => {
  const form = useForm<TRoom>({
    resolver: zodResolver(roomSchema),
    defaultValues: room || {
      title: "",
      description: "",
      image: "",
      price: 0,
      bed: 1,
      guest: 0,
      bathroom: 0,
      wifi: false,
      balcony: false,
      tv: false,
      ac: false,
      view: false,
    },
  });
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    room?.image || "",
  );
  const [imageKey, setImageKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRemove = async () => {
    const res = await imageRemove(imageKey);
    if (res.status === 401) {
      setImageUrl("");
      setImageKey("");
      toast.success("image removed successfully");
    }
  };

  const onSubmit: SubmitHandler<TRoom> = async (values) => {
    setLoading(true);
    if (hotel && room) {
      try {
        const result = await updateRoom(values, room.id, hotel.id);
        if (result?.success) {
          toast.success(result.success);
          setImageUrl("");
          setImageKey("");
          form.reset();
          router.refresh();
          handleDialogueOpen();
        }
        setLoading(false);
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    } else {
      if (!hotel) return;
      try {
        const result = await createRoom(values, hotel.id);
        if (result?.success) {
          toast.success(result.success);
          setImageUrl("");
          setImageKey("");
          form.reset();
          router.refresh();
          handleDialogueOpen();
        }
        setLoading(false);
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3 space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-w-10"
                    placeholder="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 space-y-2">
            <FormLabel>Choose Room Amenities</FormLabel>
            <FormDescription>
              Choose Amenities Popular in your room
            </FormDescription>
          </div>
          <div className="col-span-2 mt-4 grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="wifi"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Wifi</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balcony"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Balcony</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tv"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>TV</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ac"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>AC</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="view"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Outside View</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Choose an Image</FormLabel>
                <FormControl>
                  <Input type="hidden" placeholder="Image" {...field} />
                </FormControl>
                {imageUrl ? (
                  <div className="relative rounded border">
                    <Image
                      src={imageUrl}
                      alt="img"
                      height={400}
                      width={400}
                      className="object-contain"
                    />
                    <Button
                      className="absolute right-0 top-0"
                      onClick={() => handleRemove()}
                      type="button"
                      size="icon"
                      variant="ghost"
                    >
                      <X />
                    </Button>
                  </div>
                ) : (
                  <UploadButton
                    endpoint="imageUploader"
                    className="flex w-full flex-row gap-x-2 rounded bg-green-100 p-4 text-green-900"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      setImageUrl(res[0].url);
                      setImageKey(res[0].key);
                      form.setValue("image", res[0].url);
                      toast.success("Upload Completed" + res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      toast.error(`ERROR! ${error.message}`);
                    }}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    type="number"
                    className="min-w-10"
                    placeholder="price your room"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bed"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Bed</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    type="number"
                    className="min-w-10"
                    placeholder="Bed count"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathroom"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Bathroom</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    type="number"
                    className="min-w-10"
                    placeholder="Bathroom count"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guest"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Guest</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    type="number"
                    className="min-w-10"
                    placeholder="Guest count"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="breakfastPrice"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Breakfast Price</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    type="number"
                    className="min-w-10"
                    placeholder="Breakfast price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {room ? (
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
                  Create Room
                </Fragment>
              )}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default RoomForm;
