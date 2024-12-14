import { constructMetadata } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

import { RentForm } from "./Form";

export const metadata = constructMetadata({
  title: "Add rent - Advanture",
  description: "List of charts by shadcn-ui",
});

export default function ChartsPage() {
  return (
    <>
      <DashboardHeader heading="Add rent" text="List of options." />
      <div className="flex flex-col gap-5">
        <RentForm />
      </div>
    </>
  );
}
