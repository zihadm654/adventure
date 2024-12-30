import React, { Suspense } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";

import HotelForm from "../../components/Form";

const CreateHotel = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) redirect("/auth/login");
  return (
    <>
      <DashboardHeader heading="Create Hotel" text="hotel creation" />
      <section>
        <Suspense fallback={<p>loading...</p>}>
          <HotelForm userId={currentUser.id} />
        </Suspense>
      </section>
    </>
  );
};

export default CreateHotel;
