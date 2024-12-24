"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import BlurImage from "@/components/shared/blur-image";
import { HotelWithRooms } from "@/app/(protected)/dashboard/components/Form";

const BestSelling = ({ hotels }: any) => {
  return (
    <section className="container py-5">
      <h2 className="pb-4 text-3xl font-bold">Best Selling</h2>
      <div className="mt-5 grid grid-cols-2 gap-4">
        {hotels.map((hotel: HotelWithRooms) => (
          <Card key={hotel.id} className="p-2">
            <BlurImage
              src={hotel.image}
              alt={hotel.title}
              width={400}
              height={300}
              className="rounded"
            />
            <CardTitle className="py-2">{hotel.title}</CardTitle>
            <CardDescription>{hotel.description}</CardDescription>
            <CardContent></CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BestSelling;
