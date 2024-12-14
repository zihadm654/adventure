"use client";

import React, { useEffect, useMemo } from "react";
// import { useGetFilteredRentsMutation } from "@/services/rent/rentApi";
// import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const FilteredTours = () => {
  // const filter = useSelector((state) => state.filter);
  // const [addFilter, { data, isLoading, error }] = useGetFilteredRentsMutation();
  // const tours = useMemo(() => data?.data || [], [data]);

  // useEffect(() => {
  //   if (isLoading) {
  //     toast.loading("Fetching filtered rents...", { id: "filteredTours" });
  //   }

  //   if (data) {
  //     toast.success(data?.message, { id: "filteredTours" });
  //   }

  //   if (error?.data) {
  //     toast.error(error?.data?.message, { id: "filteredTours" });
  //   }
  // }, [data, isLoading, error]);

  // useEffect(() => {
  //   addFilter(filter);
  // }, [addFilter, filter]);

  return (
    <section className="col-span-12 flex flex-col gap-y-4 md:col-span-8 lg:col-span-9">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* {isLoading && tours?.length === 0
          ? Array.from({ length: 9 }, (_, index) => <Skeleton key={index} />)
          : tours.map((tour) => <Card key={tour._id} />)}
        {!isLoading && tours?.length === 0 && (
          <span>No tours found for this filter !</span>
        )} */}
      </div>
    </section>
  );
};

export default FilteredTours;
