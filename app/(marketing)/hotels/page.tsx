import { getHotels } from "@/actions/hotel-listings";

import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { columns } from "@/app/(protected)/dashboard/components/columns";
import { DataTable } from "@/app/(protected)/dashboard/components/data-table";

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
  const hotels = await getHotels(searchParams);
  console.log(hotels, "hotels");
  if (!hotels) return <div>hotels not found</div>;
  if ("error" in hotels) {
    return <div>Error loading hotels: {hotels.error}</div>;
  }

  return <>{hotels && <DataTable columns={columns} data={hotels} />}</>;
}
