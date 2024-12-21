"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { hotelSchema, THotel } from "@/lib/validations/listing";

export async function addRent(data: THotel) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
  }
  const result = hotelSchema.safeParse(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (result.success) {
    try {
      await prisma.hotel.create({
        data: { ...result.data, userId: currentUser.id || "" },
      });
      return { success: "listing has been created" };
    } catch (error) {
      return { error: error };
    }
  }

  // TODO: perform desired action / mutation
  revalidatePath("/");
}
