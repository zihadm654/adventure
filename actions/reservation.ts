"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getReservations(roomId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
  }
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
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) throw new Error("unauthorized");
    const reservations = await prisma.reservation.findMany({
      where: { userId: currentUser.id },
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
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
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
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
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
