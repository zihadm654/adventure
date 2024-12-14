/**
 * Title: Write a program using JavaScript on Advantage
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
 * Date: 30, August 2023
 */

import React from "react";

import BlurImage from "@/components/shared/blur-image";

import AdvantageArticle from "./AdvantageArticle";
import AdvantageBanner from "./AdvantageBanner";

const Advantage = () => {
  return (
    <section
      className="h-full bg-center bg-no-repeat py-12"
      style={{
        backgroundImage:
          "url(/_static/assets/home-page/advantage/manDirect.svg)",
        backgroundPosition: "125% 80%",
        backgroundSize: "50% 50%",
      }}
    >
      <section className="container">
        <section className="flex size-full flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="whitespace-normal text-3xl md:text-4xl lg:text-5xl">
                <b>Choosing</b> Us
                <BlurImage
                  src="/_static/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5"
                />
              </h1>
              <p className="text-base">
                We are committed to providing you with the best possible service
                and value for your money.
              </p>
            </article>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
              <AdvantageBanner />
              <AdvantageArticle />
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Advantage;
