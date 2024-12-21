import Link from "next/link";
import { getHotels } from "@/actions/hotel-listings";

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
  console.log(data, "hotels");
  return (
    <>
      <DashboardHeader heading="Hotels" text="List of hotels." />
      <div className="flex flex-col gap-5">
        <Button>
          <Link href={"/dashboard/hotels/createHotel"}>Add Hotel</Link>
        </Button>
      </div>
      {data && <DataTable columns={columns} data={data} />}
    </>
  );
}
