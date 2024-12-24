import { z } from "zod";

export const roomSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  image: z.string().min(1, { message: "image url should be atleast 1 char" }),
  price: z.coerce.number().int().positive(),
  guest: z.coerce.number().int().positive(),
  bed: z.coerce.number().int().positive(),
  bathroom: z.coerce.number().int().positive(),
  balcony: z.boolean().default(false),
  roomservice: z.boolean().default(false),
  wifi: z.boolean().default(false),
  tv: z.boolean().default(false),
  ac: z.boolean().default(false),
  view: z.boolean().default(false),
});

export type TRoom = z.infer<typeof roomSchema>;
