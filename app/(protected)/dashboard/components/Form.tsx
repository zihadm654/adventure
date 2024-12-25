"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  createHotel,
  deleteHotelById,
  updateHotel,
} from "@/actions/hotel-listings";
import { imageRemove } from "@/actions/image-remove";
import hotelTypes from "@/content/data/hotelTypes";
import { UploadButton } from "@/utility/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, Room } from "@prisma/client";
import { ICity, IState } from "country-state-city";
import { set } from "date-fns";
import {
  Link,
  Loader2,
  PencilLine,
  Plus,
  Terminal,
  Trash2,
  X,
} from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { hotelSchema, THotel } from "@/lib/validations/listing";
import useLocation from "@/hooks/useLocation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import RoomCard from "./RoomCard";
import RoomForm from "./RoomForm";

interface HotelProps {
  hotel?: HotelWithRooms | null;
}
export type HotelWithRooms = Hotel & { room: Room[] };

const HotelForm = ({ hotel }: HotelProps) => {
  const form = useForm<THotel>({
    resolver: zodResolver(hotelSchema),
    defaultValues: hotel || {
      title: "",
      description: "",
      image: "",
      type: "",
      state: "",
      city: "",
      location: "",
      gym: false,
      laundry: false,
      wifi: false,
      restaurant: false,
      spa: false,
      coffeeShop: false,
      bikeRental: false,
      pool: false,
      bar: false,
    },
  });
  const router = useRouter();
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    hotel?.image || "",
  );
  const [imageKey, setImageKey] = useState("");
  const [isHotelDeleting, setIsHotelDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const { getAllCountries, getCountryStates, getStateCities } = useLocation();

  useEffect(() => {
    const selectedCountry = form.watch("country");
    const countryStates = getCountryStates(selectedCountry);
    if (countryStates) {
      setStates(countryStates);
    }
  }, [form.watch("country")]);

  useEffect(() => {
    const selectedCountry = form.watch("country");
    const selectedState = form.watch("state");
    const stateCities = getStateCities(selectedCountry, selectedState);
    if (stateCities) {
      setCities(stateCities);
    }
  }, [form.watch("country"), form.watch("state")]);

  const countries = getAllCountries();

  const handleRemove = async () => {
    const res = await imageRemove(imageKey);
    if (res.status === 401) {
      setImageUrl("");
      setImageKey("");
      toast.success("image removed successfully");
    }
  };

  //delete hotel and image
  const handleDeleteHotel = async (hotel: HotelWithRooms) => {
    // setIsHotelDeleting(true);
    const getImageKey = (src: string) =>
      src.substring(src.lastIndexOf("/") + 1);
    try {
      const imageKey = getImageKey(hotel.image);
      const res = await imageRemove(imageKey);
      if (res.status === 401) {
        setImageUrl("");
        setImageKey("");
        toast.success("image removed successfully");
      }
      await deleteHotelById(hotel.id);

      // setIsHotelDeleting(false);
      toast.success("Hotel deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting hotel");
      // setIsHotelDeleting(false);
    }
  };

  const onSubmit: SubmitHandler<THotel> = async (values) => {
    // setLoading(true);
    if (hotel) {
      try {
        const result = await updateHotel(values, hotel.id);
        if (result?.success) {
          toast.success(result.success);
          setImageUrl("");
          setImageKey("");
          form.reset();
          router.push("/dashboard/hotels");
        }
        // setLoading(false);
      } catch (error) {
        toast.error(error);
        // setLoading(false);
      }
    } else {
      try {
        const result = await createHotel(values);
        if (result?.success) {
          toast.success(result.success);
          setImageUrl("");
          setImageKey("");
          setStates([]);
          form.reset();
          router.push("/dashboard/hotels");
        }
        // setLoading(false);
      } catch (error) {
        toast.error(error);
        // setLoading(false);
      }
    }
  };

  // watching the form values
  useEffect(() => {
    const subscription = form.watch((value: any) => {
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleDialogueOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
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
          <FormLabel>Choose Amenities</FormLabel>
          <FormDescription>
            Choose Amenities Popular in your hotel
          </FormDescription>
        </div>
        <div className="col-span-2 mt-4 grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="gym"
            render={({ field }) => (
              <FormItem className="flex items-end space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Gym</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="spa"
            render={({ field }) => (
              <FormItem className="flex items-end space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Spa</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bar"
            render={({ field }) => (
              <FormItem className="flex items-end space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Bar</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="restaurant"
            render={({ field }) => (
              <FormItem className="flex items-end space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Restaurant</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coffeeShop"
            render={({ field }) => (
              <FormItem className="flex items-end space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Coffee Shop</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="laundry"
            render={({ field }) => (
              <FormItem className="flex items-end space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Laundry facilities</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bikeRental"
            render={({ field }) => (
              <FormItem className="flex items-end space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Bike Rental</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pool"
            render={({ field }) => (
              <FormItem className="flex items-end space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Swimming Pool</FormLabel>
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      className="w-full"
                      placeholder="Select a preferred type"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hotelTypes?.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a preferred country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries?.map((country, index) => (
                    <SelectItem key={index} value={country.isoCode}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <Select
                disabled={loading || states.length < 1}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a preferred state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {states?.map((state, index) => (
                    <SelectItem key={index} value={state.isoCode}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select
                disabled={loading || states.length < 1}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a preferred city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities?.map((city, index) => (
                    <SelectItem key={index} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {hotel && !hotel.room.length && (
          <Alert className="bg-indigo-500 text-white">
            <Terminal className="size-4 stroke-white" />
            <AlertTitle>One last step!</AlertTitle>
            <AlertDescription>
              Your hotel was created successfully, but you need to add rooms to
              your hotel
            </AlertDescription>
          </Alert>
        )}
        <div className="col-span-2 flex justify-end gap-2 space-x-4">
          {hotel && (
            <Button
              onClick={() => handleDeleteHotel(hotel)}
              variant="outline"
              className="max-w-[150px]"
              disabled={isHotelDeleting || loading}
            >
              {isHotelDeleting ? (
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
          )}
          {hotel && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button
                  type="button"
                  variant={"outline"}
                  className="max-w-[150px]"
                >
                  <Plus className="size-4" />
                  Add Room
                </Button>
              </DialogTrigger>
              <DialogContent className="h-full w-11/12 max-w-[900px] overflow-y-scroll">
                <DialogHeader className="px-2">
                  <DialogTitle>Add a room</DialogTitle>
                  <DialogDescription>
                    Add a room by filling the given information
                  </DialogDescription>
                </DialogHeader>
                <RoomForm
                  hotel={hotel}
                  handleDialogueOpen={handleDialogueOpen}
                />
              </DialogContent>
            </Dialog>
          )}

          {/* {hotel && (
            <Button
              variant="ghost"
              className="max-w-[150px]"
              disabled={isHotelDeleting || loading}
            >
              <Link href={`/dashboard/hotels/${hotel.id}`}>View</Link>
            </Button>
          )} */}

          {hotel ? (
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
          )}
        </div>
        <Separator className="col-span-2" />
        <h3 className="my-4 text-lg font-bold">Hotel Rooms</h3>
        {hotel && !!hotel.room.length && (
          <div className="col-span-2 grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {hotel.room.map((item) => (
              <RoomCard key={item.id} hotel={hotel} room={item} />
            ))}
          </div>
        )}
      </form>
    </Form>
  );
};
export default HotelForm;
