"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReservations, updateReservation } from "@/actions/reservation";
import { Reservation } from "@prisma/client";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import moment from "moment";
import { toast } from "sonner";

import useRoomReservation from "@/hooks/useReservation";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface Props {
  clientSecret: string;
  handlePayment: (value: boolean) => void;
}
const Checkout = ({ clientSecret, handlePayment }: Props) => {
  const { roomData, resetRoomReservation } = useRoomReservation();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handlePayment(false);
    setLoading(false);
  }, [stripe]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !roomData) return;

    try {
      //date overlaps
      const reservations = await getReservations(roomData.room.id);
      console.log(reservations, "reservations");
      const reservationDates = reservations?.data?.map(
        (reservation: Reservation) => ({
          startDate: new Date(reservation.startDate),
          endDate: new Date(reservation.endDate),
        }),
      );
      const reservationOverlap = reservationDates?.some(
        (reservation) =>
          moment(reservation.startDate).isBetween(
            roomData.startDate,
            roomData.endDate,
            "day",
            "[]",
          ) ||
          moment(reservation.endDate).isBetween(
            roomData.startDate,
            roomData.endDate,
            "day",
            "[]",
          ),
      );
      if (reservationOverlap) {
        toast.error("Reservation overlaps with existing reservation");
        setLoading(false);
        return;
      }
      const res = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });
      if (!res.error) {
        const response = await updateReservation(res.paymentIntent.id);
        if (response.success) {
          toast.success(response.success);
          router.refresh();
          resetRoomReservation();
          handlePayment(true);
          setLoading(false);
        } else {
          toast.error(response.error);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (!roomData?.startDate || !roomData?.endDate)
    return <div>Error: Missing reservation dates...</div>;

  const startDate = moment(roomData?.startDate).format("MMMM Do YYYY");
  const endDate = moment(roomData?.endDate).format("MMMM Do YYYY");
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <h2 className="mb-2 text-lg font-semibold">Billing Address</h2>
      <AddressElement
        options={{
          mode: "billing",
        }}
      />
      <h2 className="mb-2 mt-4 text-lg font-semibold">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="flex flex-col gap-1">
        <Separator />
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold">Your Booking Summary</h2>
          <p>
            You will check-in on {startDate} at 5pm & check-out on {endDate} at
            5pm
          </p>
          {roomData?.breakfastIncluded && (
            <h5>You will be served breakfast each day at 8pm</h5>
          )}
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-3 text-lg font-bold">
          {roomData?.breakfastIncluded && (
            <p>Breakfast Price: ${roomData.room.breakfastPrice}</p>
          )}
          Total Price: ${roomData?.totalPrice}
        </div>
      </div>
      {loading && <p>please stay on the page</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Payment Processing" : "Pay Now"}
      </Button>
    </form>
  );
};

export default Checkout;
