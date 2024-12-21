"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { createHotel } from "@/actions/hotel-listings";
import { imageRemove } from "@/actions/image-remove";
import hotelTypes from "@/content/data/hotelTypes";
import { UploadButton } from "@/utility/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, Room } from "@prisma/client";
import { ICity, IState } from "country-state-city";
import { Loader2, PencilLine, X } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "sonner";

import { hotelSchema, THotel } from "@/lib/validations/listing";
import useLocation from "@/hooks/useLocation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface HotelProps {
  hotel: HotelWithRooms | null;
}
export type HotelWithRooms = Hotel & { room: Room[] };

const HotelForm = () => {
  const form = useForm<THotel>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
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

  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");
  const { getAllCountries, getCountryStates, getStateCities } = useLocation();

  useEffect(() => {
    const selectedCountry = form.watch("country");
    const countryStates = getCountryStates(selectedCountry);
    if (countryStates) {
      setStates(countryStates);
    }
  }, [form, getCountryStates]);

  useEffect(() => {
    const selectedCountry = form.watch("country");
    const selectedState = form.watch("state");
    const stateCities = getStateCities(selectedCountry, selectedState);
    if (stateCities) {
      setCities(stateCities);
    }
  }, [form, getStateCities]);

  const countries = getAllCountries();

  const handleRemove = async () => {
    const res = await imageRemove(imageKey);
    if (res.status === 401) {
      setImageUrl("");
      setImageKey("");
      toast.success("image removed successfully");
    }
  };

  const onSubmit: SubmitHandler<THotel> = async (values) => {
    console.log(values);
    try {
      const result = await createHotel(values);
      if (result?.success) {
        toast.success(result.success);
        setImageUrl("");
        setImageKey("");
        form.reset();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // watching the form values
  useEffect(() => {
    const subscription = form.watch((value: any) => {
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <FormLabel>Choose Amenities</FormLabel>
            <FormDescription>
              Choose Amenities Popular in your hotel
            </FormDescription>
          </div>
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
            <FormItem className="flex items-end space-x-3">
              <FormLabel>Choose an Image</FormLabel>
              <FormControl>
                <Input type="hidden" placeholder="Image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            className="rounded-secondary flex w-full flex-row gap-x-2 bg-green-100 p-4 text-green-900"
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
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a preferred type" />
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
        <div className="flex flex-wrap justify-between gap-2">
          {/*{hotel ? (*/}
          {/*  <Button disabled={loading} className="max-w-[150px]">*/}
          {/*    {loading ? (*/}
          {/*      <Fragment>*/}
          {/*        <Loader2 className="mr-2 size-4" />*/}
          {/*        updating*/}
          {/*      </Fragment>*/}
          {/*    ) : (*/}
          {/*      <Fragment>*/}
          {/*        <PencilLine className="size-4" />*/}
          {/*        Update*/}
          {/*      </Fragment>*/}
          {/*    )}*/}
          {/*  </Button>*/}
          {/*) : (*/}
          {/*  <Button className="max-w-[150px]" disabled={loading}>*/}
          {/*    {loading ? (*/}
          {/*      <Fragment>*/}
          {/*        <Loader2 className="size-4" />*/}
          {/*        Creating*/}
          {/*      </Fragment>*/}
          {/*    ) : (*/}
          {/*      <Fragment>*/}
          {/*        <PencilLine className="size-4" />*/}
          {/*        Create Hotel*/}
          {/*      </Fragment>*/}
          {/*    )}*/}
          {/*  </Button>*/}
          {/*)}*/}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
export default HotelForm;
