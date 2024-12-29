"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useTheme } from "next-themes";

import useRoomReservation from "@/hooks/useReservation";
import { Button } from "@/components/ui/button";
import Checkout from "@/components/reservation/checkout";

import RoomCard from "../dashboard/components/RoomCard";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

const ReservationClient = () => {
  const { clientSecret, roomData } = useRoomReservation();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setPageLoaded(true);
  }, []);
  const options = {
    clientSecret,
    apperance: {
      theme: theme === "dark" ? "night" : "stripe",
      labels: "floating",
    },
  };

  const handlePayment = (value: boolean) => {
    setPaymentSuccess(value);
  };
  if (pageLoaded && !paymentSuccess && (!roomData || !clientSecret))
    return (
      <div className="flex flex-col items-center gap-4">
        <h2>Oops! This page could not be properly loaded</h2>
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" onClick={() => router.push("/")}>
            Go Home
          </Button>
          <Button onClick={() => router.push("/dashboard/reservations")}>
            View Reservations
          </Button>
        </div>
      </div>
    );
  if (paymentSuccess) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h5 className="text-center text-teal-500">Payment Success</h5>
        <Button onClick={() => router.push("/dashboard/reservations")}>
          View Reservations
        </Button>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-[700px]">
      {clientSecret && roomData && (
        <div>
          <h3 className="text-2xl">Complete payment to reserve this room!</h3>
          <div className="mb-6">
            <RoomCard room={roomData.room} />
          </div>
          <Elements stripe={stripePromise} options={options}>
            <Checkout
              clientSecret={clientSecret}
              handlePayment={handlePayment}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default ReservationClient;
