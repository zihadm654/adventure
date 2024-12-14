/**
 * Title: Write a program using JavaScript on AdvantageBanner
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

const AdvantageBanner = () => {
  return (
    <BlurImage
      src="/_static/assets/static/Choosing Us Banner.png"
      alt={"advantage"}
      height={633}
      width={541}
      className="w-full rounded border border-primary"
    />
  );
};

export default AdvantageBanner;
