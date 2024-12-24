import Link from "next/link";
import { getHotels } from "@/actions/hotel-listings";
import { getRooms } from "@/actions/room-listing";

import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";

import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";

export const metadata = constructMetadata({
  title: "Hotels - Advanture",
  description: "creation of hotel and rooms",
});

export default async function ChartsPage() {
  const { data } = await getHotels();
  const rooms = await getRooms();
  console.log(data, rooms.data, "hotels");
  return (
    <>
      <DashboardHeader heading="Hotels" text="List of hotels." />
      {data && <DataTable columns={columns} data={data} />}
    </>
  );
}
