"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { roomSchema, TRoom } from "@/lib/validations/room";

export async function getRooms() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
  }
  try {
    const data = await prisma.room.findMany();
    return { success: "room has been fetched successfully", data };
  } catch (error) {
    return { error: error };
  }
}
export async function createRoom(data: TRoom, hotelId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
  }
  const result = roomSchema.safeParse(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (result.success) {
    try {
      await prisma.room.create({
        data: { ...result.data, hotelId: hotelId },
      });
      return { success: "room has been created" };
    } catch (error) {
      return { error: error };
    }
  }

  // TODO: perform desired action / mutation
  revalidatePath("/dashboard/hotels/" + hotelId);
}

export async function updateRoom(data: TRoom, roomId: string, hotelId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
  }
  const result = roomSchema.safeParse(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (result.success) {
    try {
      await prisma.room.update({
        where: {
          id: roomId,
        },
        data: { ...result.data, hotelId: hotelId },
      });
      return { success: "room has been updated" };
    } catch (error) {
      return { error: error };
    }
  }

  // TODO: perform desired action / mutation
  revalidatePath("/dashboard/hotels/" + hotelId);
}

export async function getRoomById(roomId: string) {
  try {
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) return null;

    return room;
  } catch (error: any) {
    // throw new Error(error);
    console.log(error);
  }
  revalidatePath("/dashboard/rooms");
}
export async function deleteRoomById(roomId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
  }
  try {
    await prisma.room.delete({
      where: {
        id: roomId,
      },
    });
    revalidatePath("/dashboard/hotels");
    return { success: "room has been deleted" };
  } catch (error: any) {
    throw new Error(error);
  }
}
