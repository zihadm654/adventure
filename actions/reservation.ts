"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

import { prisma } from "@/lib/db";

export async function getReservations(roomId: string) {
  if (!roomId) return null;
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const data = await prisma.reservation.findMany({
      where: {
        paymentStatus: true,
        roomId: roomId,
        endDate: {
          gt: yesterday,
        },
      },
    });
    return { success: "reservations has been fetched successfully", data };
  } catch (error) {
    return { error: error };
  }
}
export const getReservationByUserId = async () => {
  try {
    const session = await auth();
    if (!session?.user || session?.user.id) {
      throw new Error("Unauthorized");
    }
    const reservations = await prisma.reservation.findMany({
      where: { userId: session.user.id },
      include: {
        room: true,
        hotel: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!reservations) return null;
    return reservations;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// export async function createRoom(data: TRoom, hotelId: string) {
//   const currentUser = await getCurrentUser();
//   if (!currentUser) {
//     return redirect("/login");
//   }
//   const result = roomSchema.safeParse(data);
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   if (result.success) {
//     try {
//       await prisma.room.create({
//         data: { ...result.data, hotelId: hotelId },
//       });
//       return { success: "room has been created" };
//     } catch (error) {
//       return { error: error };
//     }
//   }

//   // TODO: perform desired action / mutation
//   revalidatePath("/dashboard/hotels/" + hotelId);
// }

export async function updateReservation(id: string) {
  const session = await auth();
  if (!session?.user || session?.user.id) {
    throw new Error("Unauthorized");
  }
  if (!id) throw new Error("require id");

  try {
    await prisma.reservation.update({
      where: {
        paymentIntentId: id,
      },
      data: { paymentStatus: true },
    });
    revalidatePath("/dashboard/reservations");
    return { success: "reservation has been updated" };
  } catch (error) {
    return { error: error };
  }

  // TODO: perform desired action / mutation
}

export async function deleteReservationById(id: string) {
  const session = await auth();
  if (!session?.user || session?.user.id) {
    throw new Error("Unauthorized");
  }
  if (!id) throw new Error("require id");
  try {
    await prisma.reservation.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/reservations");
    return { success: "reservation has been deleted" };
  } catch (error: any) {
    throw new Error(error);
  }
}
