"use server";

import Stripe from "stripe";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});
interface IProps {
  reserve: {
    hotelId: string;
    userId: string;
    roomId: string;
    startDate: Date;
    endDate: Date;
    breakfastIncluded: boolean;
    totalPrice: number;
  };
  paymentIntentId: string;
}
export async function createPaymentIntent({
  reserve,
  paymentIntentId,
}: IProps) {
  const user = await getCurrentUser();
  if (!user) return null;

  const reservationData = {
    ...reserve,
    userId: user.id as string,
    currency: "usd",
    paymentIntentId,
  };

  let reservationFound;

  if (paymentIntentId) {
    reservationFound = await prisma.reservation.findUnique({
      where: {
        paymentIntentId,
        userId: user.id,
      },
    });
  }
  // existing reservation to update
  if (reservationFound && paymentIntentId) {
    //update reservation
    const current_intent =
      await stripe.paymentIntents.retrieve(paymentIntentId);

    if (current_intent) {
      const update_intent = await stripe.paymentIntents.update(
        paymentIntentId,
        {
          amount: reserve.totalPrice * 100,
        },
      );

      // const { paymentIntentId: _, ...updateData } = reservationData;
      const updateReservation = await prisma.reservation.update({
        where: {
          paymentIntentId: paymentIntentId,
          userId: user.id,
        },
        data: reservationData,
      });
      if (!updateReservation) {
        return new Error("something went wrong");
      }
      return { success: true, paymentIntent: update_intent };
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: reserve.totalPrice * 100,
      currency: reservationData.currency,
      automatic_payment_methods: { enabled: true },
    });
    await prisma.reservation.create({
      data: {
        ...reservationData,
        paymentIntentId: paymentIntent.id,
      },
    });
    return { success: true, paymentIntent: paymentIntent };
  }
  return new Error("internal server error");
}
