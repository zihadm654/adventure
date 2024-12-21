import React, { Suspense } from "react";

import { DashboardHeader } from "@/components/dashboard/header";

import HotelForm from "../../components/Form";

// import { getCurrentUser } from "@/lib/session";

const CreateHotel = async () => {
  //   const hotel = await getHotelById(params);
  //   const currentUser = await getCurrentUser();
  //   if (!currentUser?.id) redirect("/auth/login");
  //   if (hotel && hotel.userId !== currentUser.id)
  return (
    <>
      <DashboardHeader heading="Create Hotel" text="hotel creation" />
      <section>
        <Suspense fallback={<p>loading...</p>}>
           <HotelForm />
        </Suspense>
      </section>
    </>
  );
};

export default CreateHotel;
