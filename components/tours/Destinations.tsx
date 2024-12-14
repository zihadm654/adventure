import React from "react";

import FilteredTours from "./FilteredTours";
import FilterSidebar from "./FilterSidebar";

const Destinations = () => {
  return (
    <section className="container">
      <section className="grid grid-cols-12 gap-8 py-12 md:relative">
        <FilterSidebar />
        <FilteredTours />
      </section>
    </section>
  );
};

export default Destinations;
