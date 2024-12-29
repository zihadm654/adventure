import { getReservationByUserId } from "@/actions/reservation";

import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";

import ReservationsClient from "../components/ReservationsClient";

export const metadata = constructMetadata({
  title: "Reservations – SaaS Starter",
  description: "List of Reservations",
});

export default async function ChartsPage() {
  const myReservations = await getReservationByUserId();

  if (!myReservations) return <div>No Reservations found</div>;
  return (
    <>
      <DashboardHeader heading="Reservations" text="List of reservations." />
      <div className="flex flex-col gap-5">
        {!!myReservations?.length && (
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2">
            {myReservations.map((reservation) => (
              <ReservationsClient
                key={reservation.id}
                reservations={reservation}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
