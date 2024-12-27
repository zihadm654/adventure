import { NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return new NextResponse("unauthorized", { status: 401 });

  const body = await req.json();
  const { reserve, paymentIntentId } = body;
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
      const res = await prisma.reservation.update({
        where: {
          paymentIntentId: paymentIntentId,
          userId: user.id,
        },
        data: reservationData,
      });
      if (!res) {
        return NextResponse.error();
      }
      return NextResponse.json({ paymentIntent: update_intent });
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
    return NextResponse.json(paymentIntent);
  }
  return new Error("internal server error");
}
