import { prisma } from "@/lib/db";

export const getReservations = async (hotelId: string) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const reservations = await prisma.reservation.findMany({
      where: {
        hotelId: hotelId,
        endDate: {
          gt: yesterday,
        },
      },
    });
    return reservations;
  } catch (error) {
    throw new Error(error);
  }
};
