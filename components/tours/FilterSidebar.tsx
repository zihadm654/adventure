"use client";

import React, { useState } from "react";
import hotelTypes from "@/content/data/hotelTypes";

// import {
//   setCategory,
//   setCountries,
//   setDateRange,
//   setPriceRange,
//   // setRatings,
//   // resetFilter,
// } from "@/features/filter/filterSlice";
// import { useDispatch } from "react-redux";

import useGetCountries from "@/hooks/useLocation";

const FilterSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [priceRange, setPriceRangeLocal] = useState({ min: 5, max: 500 });
  const [dateRange, setDateRangeLocal] = useState({
    startDate: null,
    endDate: null,
  });
  // const [selectedRatings, setSelectedRatings] = useState([]);

  const countries = useGetCountries();
  // const dispatch = useDispatch();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // handle functions for updating local state and dispatching actions
  // const handleCategoryChange = (selectedOptions) => {
  //   setSelectedCategory(selectedOptions);
  //   dispatch(setCategory(selectedOptions));
  // };

  // const handleCountriesChange = (selectedOptions) => {
  //   setSelectedCountries(selectedOptions);
  //   dispatch(setCountries(selectedOptions));
  // };

  // const handlePriceRangeChange = (min, max) => {
  //   setPriceRangeLocal({ min, max });
  //   dispatch(setPriceRange({ min, max }));
  // };

  // const handleDateRangeChange = (startDate, endDate) => {
  //   setDateRangeLocal({ startDate, endDate });
  //   dispatch(setDateRange({ startDate, endDate }));
  // };

  // const handleRatingsChange = (selectedOptions) => {
  //   setSelectedRatings(selectedOptions);
  //   dispatch(setRatings(selectedOptions));
  // };

  // function renderStarIcons(count) {
  //   const stars = [];
  //   for (let i = 0; i < count; i++) {
  //     stars.push(<BiSolidStar key={i} className="text-yellow-500 h-4 w-4" />);
  //   }
  //   return stars;
  // }

  return (
    <aside className="col-span-12 md:col-span-4 lg:col-span-3">
      <section className="flex flex-col gap-y-4 md:sticky md:top-4">
        {/* Choose Category */}
        <div className="flex flex-col gap-y-4 rounded border px-4 py-2">
          <h2 className="text-lg">Choose Category</h2>
          <div className="flex h-40 flex-col gap-y-2.5 overflow-y-auto">
            {hotelTypes?.length === 0 && <>Loading...</>}
            {/* {hotelTypes?.map(({ name, icon }, index) => (
              <label
                key={index}
                htmlFor={name}
                className="flex flex-row items-center gap-x-1.5 text-sm"
              >
                <input
                  type="checkbox"
                  name={name}
                  id={name}
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedCategory = isChecked
                      ? [...selectedCategory, name]
                      : selectedCategory.filter(
                          (category) => category !== name,
                        );
                    // handleCategoryChange(updatedCategory);
                  }}
                />
                <span className="flex flex-row items-center gap-x-1 truncate whitespace-normal">
                  {name}
                </span>
              </label>
            ))} */}
          </div>
        </div>

        {/* Choose Country */}
        <div className="flex flex-col gap-y-4 rounded border px-4 py-2">
          <h2 className="text-lg">Choose Country</h2>
          <div className="flex h-40 flex-col gap-y-2.5 overflow-y-auto"></div>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-y-4 rounded border px-4 py-2">
          <h2 className="text-lg">Price Range</h2>
          <label htmlFor="price" className="flex flex-col gap-y-2">
            <input
              type="range"
              name="price"
              id="price"
              min={5}
              max={500}
              value={priceRange.min}
              // onChange={(e) =>
              //   handlePriceRangeChange(Number(e.target.value), priceRange.max)
              // }
              className="h-0 flex-1 appearance-none rounded bg-secondary"
            />
            <p className="flex flex-row items-center justify-between text-xs">
              ${priceRange.min.toFixed(2)}
              <span className="text-xs"> ${priceRange.max.toFixed(2)}</span>
            </p>
          </label>
        </div>

        {/* Date Range */}
        <div className="flex flex-col gap-y-4 rounded border px-4 py-2">
          <h2 className="text-lg">Date Range</h2>
          <label
            htmlFor="startDate"
            className="flex flex-row items-center gap-x-2"
          >
            <input
              type="date"
              id="startDate"
              // value={dateRange.startDate}
              // onChange={(e) =>
              //   handleDateRangeChange(e.target.value, dateRange.endDate)
              // }
              className="flex-1 !border-0 !p-0 !text-sm"
            />
            <div className="h-4 border" />
            <input
              type="date"
              id="endDate"
              // value={dateRange.endDate}
              // onChange={(e) =>
              //   handleDateRangeChange(dateRange.startDate, e.target.value)
              // }
              className="flex-1 !border-0 !p-0 !text-sm"
            />
          </label>
        </div>

        {/* Choose Ratings */}
        {/* <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Choose Ratings</h2>
          <div className="flex flex-col gap-y-2.5">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                htmlFor={rating}
                className="text-sm flex flex-row items-center gap-x-1.5"
              >
                <input
                  type="checkbox"
                  name={rating.toString()}
                  id={rating.toString()}
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedRatings = isChecked
                      ? [...selectedRatings, rating]
                      : selectedRatings.filter((r) => r !== rating);
                    handleRatingsChange(updatedRatings);
                  }}
                />
                <span className="flex flex-row gap-x-1 items-center">
                  {renderStarIcons(rating)}
                </span>
              </label>
            ))}
          </div>
        </div> */}

        {/* Reset Button */}
        {/* <button
          className="px-4 py-1 border border-primary !rounded-secondary flex flex-row gap-x-2 items-center w-fit bg-secondary text-primary"
          onClick={() => {
            setSelectedCategory([]);
            setSelectedCountries([]);
            setPriceRangeLocal({ min: 10, max: 500 });
            setDateRangeLocal({ startDate: null, endDate: null });
            // setSelectedRatings([]);
            dispatch(resetFilter());
          }}
        >
          Reset Filter
        </button> */}
      </section>
    </aside>
  );
};

export default FilterSidebar;
