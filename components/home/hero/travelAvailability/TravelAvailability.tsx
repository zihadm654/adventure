/**
 * Title: Write a program using JavaScript on TravelAvailability
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/in/devhasibulislam
 * Facebook: https://facebook.com/in/devhasibulislam
 * Instagram: https://instagram.com/in/devhasibulislam
 * Twitter: https://twitter.com/in/devhasibulislam
 * Pinterest: https://pinterest.com/in/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 17, August 2023
 */

import React from "react";
import { useRouter } from "next/router";
import { BiChevronRight } from "react-icons/bi";

import { Tooltip } from "@/components/ui/tooltip";

import TravelDate from "./TravelDate";
import TravelLocation from "./TravelLocation";
import TravelPrice from "./TravelPrice";
import TravelTab from "./TravelTab";
import TravelTypes from "./TravelTypes";

const TravelAvailability = () => {
  const router = useRouter();

  return (
    <section>
      <div className="flex flex-col gap-y-4">
        <TravelTab />
        <hr />
        <div className="flex flex-row flex-wrap items-center gap-4">
          <TravelLocation />
          <TravelPrice />
          <TravelDate />
          <TravelTypes />
          <span>
            <Tooltip>
              <button
                type="button"
                className="rounded-primary flex items-center justify-center border border-transparent bg-primary p-1.5 text-white transition-all delay-100 hover:border-primary hover:bg-secondary hover:text-primary"
                onClick={() => router.push("/tours")}
              >
                <BiChevronRight className="text-2xl" />
              </button>
            </Tooltip>
          </span>
        </div>
      </div>
    </section>
  );
};

export default TravelAvailability;
