import { getUserHotels } from "@/actions/hotel-listings";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { columns } from "@/components/dashboard/data-table/columns";
import { DataTable } from "@/components/dashboard/data-table/data-table";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata = constructMetadata({
  title: "Hotels - Advanture",
  description: "creation of hotel and rooms",
});
interface IProps {
  searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
  };
}
export default async function ChartsPage({ searchParams }: IProps) {
  const currentUser = await getCurrentUser();
  const hotels = await getUserHotels(currentUser?.id!);
  console.log(hotels, "hotels");
  if (!hotels) return <div>hotels not found</div>;
  if ("error" in hotels) {
    return <div>Error loading hotels: {hotels.error}</div>;
  }
  return (
    <>
      <DashboardHeader heading="Hotels" text="List of hotels." />
      {hotels && <DataTable columns={columns} data={hotels} />}
    </>
  );
}
