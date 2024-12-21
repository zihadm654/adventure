import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata = constructMetadata({
  title: "Rents – SaaS Starter",
  description: "List of rents listings",
});

export default function ChartsPage() {
  return (
    <>
      <DashboardHeader heading="Charts" text="List of charts by shadcn-ui." />
      <div className="flex flex-col gap-5">helo</div>
    </>
  );
}
