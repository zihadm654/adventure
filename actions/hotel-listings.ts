"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { hotelSchema, THotel } from "@/lib/validations/listing";

export async function getHotels() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
  }
  try {
    const data = await prisma.hotel.findMany();
    return { success: "hotel has been fetched successfully", data };
  } catch (error) {
    return { error: error };
  }
}
export async function createHotel(data: THotel) {
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
      return { success: "hotel has been created" };
    } catch (error) {
      return { error: error };
    }
  }

  // TODO: perform desired action / mutation
  revalidatePath("/dashboard/hotels");
}

interface IParams {
  hotelId: string;
}
export async function getHotelById(hotelId: string) {
  try {
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: hotelId,
      },
      include: {
        room: true,
      },
    });

    if (!hotel) return null;

    return hotel;
  } catch (error: any) {
    // throw new Error(error);
    console.log(error);
  }
}
export async function deleteListingById(params: IParams) {
  const currentUser = await getCurrentUser();
  try {
    const { hotelId } = params;

    const listing = await prisma.hotel.deleteMany({
      where: {
        id: hotelId,
        userId: currentUser?.id,
      },
    });
    revalidatePath("/dashboard/rents");
    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
