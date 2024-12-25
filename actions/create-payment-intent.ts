"use server";

import Stripe from "stripe";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function createPaymentIntent(reservation, paymentIntentId) {
  const user = await getCurrentUser();
  if (!user) return null;

  const reservationData = {
    ...reservation,
    userId: user.id!,
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
  if (reservationFound && paymentIntentId) {
    //update reservation
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: reservation.totalPrice * 100,
      currency: reservation.currency,
      automatic_payment_methods: { enabled: true },
    });
    reservationData.paymentIntentId = paymentIntent.id;
    await prisma.reservation.create({
      data: reservationData,
    });
    return paymentIntent;
  }
  return new Error("internal server error");
}
