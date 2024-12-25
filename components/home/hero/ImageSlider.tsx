/**
 * Title: Write a program using JavaScript on ImageSlider
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

// import Image from "next/image";
// import LoadImage from "@/components/shared/image/LoadImage";
// import Tooltip from "@/components/shared/tooltip/Tooltip";
import { useEffect, useState } from "react";
import Image from "next/image";

const ImageSlider = ({ images, delay }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => clearInterval(interval);
  }, [images.length, delay]);

  return (
    <div className="relative h-[512px] max-w-[364px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute h-[512px] max-w-[364px] transition-transform duration-1000${
            index === currentImageIndex ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            height={512}
            width={364}
            className="h-[512px] max-w-[364px] rounded border border-primary object-cover"
            title="Dimension: 364x512"
          />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-4">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
              className={`size-3 rounded-full bg-white transition-all ${currentImageIndex === i ? "p-2" : "bg-opacity-50"} `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
