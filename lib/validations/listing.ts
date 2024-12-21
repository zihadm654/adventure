import { z } from "zod";

export const hotelSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  image: z.string().min(1, { message: "image url should be atleast 1 char" }),
  type: z.string().min(2, {
    message: "type must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "location must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "country must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "state must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  gym: z.boolean().default(false),
  pool: z.boolean().default(false),
  wifi: z.boolean().default(false),
  coffeeShop: z.boolean().default(false),
  restaurant: z.boolean().default(false),
  bikeRental: z.boolean().default(false),
  spa: z.boolean().default(false),
  bar: z.boolean().default(false),
  laundry: z.boolean().default(false),
});

export type THotel = z.infer<typeof hotelSchema>;
