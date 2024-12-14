/**
 * Title: Write a program using JavaScript on TravelTypes
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 17, August 2023
 */

import React, { useEffect, useState } from "react";
import hotelTypes from "@/data/hotelTypes";
import { addTravelAvailability } from "@/features/travelAvailability/travelAvailabilitySlice";
import { BiChevronDown } from "react-icons/bi";
import { TbBuildingChurch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import OutsideClick from "@/components/shared/outsideClick/OutsideClick"; // Make sure to provide the correct import path here

const TravelTypes = () => {
  const travelAvailability = useSelector((state) => state?.travelAvailability);
  const [isOpen, setIsOpen] = useState(false);
  const [hotelType, setHotelType] = useState(
    travelAvailability?.hotelType || "",
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTravelAvailability({ hotelType }));
    setIsOpen(false);
  }, [dispatch, hotelType]);

  const handleOutsideClick = () => {
    setIsOpen(!isOpen);
  };

  const types = hotelTypes;

  return (
    <section>
      <div className="relative">
        <button
          className="rounded-primary flex flex-row items-center gap-x-2 border border-primary px-2.5 py-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <TbBuildingChurch className="text-xl" />
          <span className="flex flex-row items-center gap-x-1 text-sm">
            {travelAvailability?.hotelType ? (
              <>{travelAvailability?.hotelType}</>
            ) : (
              <>
                Hotel Types
                <BiChevronDown />
              </>
            )}
          </span>
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-2 rounded bg-secondary p-2.5 shadow">
            <OutsideClick onOutsideClick={handleOutsideClick}>
              <div className="countrySelection flex max-h-60 w-40 flex-col gap-y-2.5 overflow-y-auto">
                {types.map(({ name, icon }) => (
                  <button
                    key={name}
                    className="flex flex-row items-center gap-x-2"
                    onClick={() => setHotelType(name)}
                  >
                    {icon}
                    <p className="truncate text-xs">{name}</p>
                  </button>
                ))}
              </div>
            </OutsideClick>
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelTypes;
