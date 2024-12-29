"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { hotelSchema, THotel } from "@/lib/validations/listing";

export async function getHotels(searchParams: {
  title: string;
  country: string;
  state: string;
  city: string;
}) {
  try {
    const { title, country, state, city } = searchParams;

    const hotels = await prisma.hotel.findMany({
      where: {
        title: {
          contains: title,
        },
        country,
        state,
        city,
      },
      include: {
        room: true,
      },
    });
    return hotels;
  } catch (error) {
    return { error: error };
  }
}
export async function getUserHotels(userId: string) {
  try {
    const hotels = await prisma.hotel.findMany({
      where: {
        userId,
      },
      include: {
        room: true,
      },
    });
    return hotels;
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

export async function updateHotel(data: THotel, hotelId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
  }
  const result = hotelSchema.safeParse(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (result.success) {
    try {
      await prisma.hotel.update({
        where: {
          id: hotelId,
        },
        data: { ...result.data, userId: currentUser.id || "" },
      });
      return { success: "hotel has been updated" };
    } catch (error) {
      return { error: error };
    }
  }

  // TODO: perform desired action / mutation
  revalidatePath("/dashboard/hotels");
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
  revalidatePath("/dashboard/hotels");
}
export async function deleteHotelById(hotelId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
  }
  try {
    await prisma.hotel.delete({
      where: {
        id: hotelId,
      },
    });
    revalidatePath("/dashboard/hotels");
    return { success: "hotel has been deleted" };
  } catch (error: any) {
    throw new Error(error);
  }
}
