import React from "react";
import Image from "next/image";

const AdvantageArticle = () => {
  const items = [
    {
      _id: 1,
      icon: (
        <Image
          src={"/_static/assets/home-page/advantage/earth.svg"}
          alt={"earth"}
          height={60}
          width={60}
          className="rounded-full border border-primary shadow-lg"
        />
      ),
      title: "Safe, Fun & Unique Experience",
      description:
        "Your safety and the amount of fun you have with us is our top priority. You will be treated like family and enjoy a once in a lifetime experience that you will never forget.",
    },
    {
      _id: 2,
      icon: (
        <Image
          src={"/_static/assets/home-page/advantage/smile.svg"}
          alt={"smile"}
          height={60}
          width={60}
          className="rounded-full border border-primary shadow-lg"
        />
      ),
      title: "Over 10,000 Happy Guests",
      description:
        "Don’t just take our word for it. Feel free to read online review from thousands of our happy guests that loves our tours. Our guests always come first.",
    },
    {
      _id: 3,
      icon: (
        <Image
          src={"/_static/assets/home-page/advantage/star.svg"}
          alt={"star"}
          height={60}
          width={60}
          className="rounded-full border border-primary shadow-lg"
        />
      ),
      title: "All-Inclusive Tours",
      description:
        "Our tours are 100% stress-free so you can fully enjoy your experience. Once paid you don’t have to worry about being nickel and dimed along the way. Leave your wallet at home.",
    },
  ];

  return (
    <article className="flex flex-col gap-y-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl">
        To Explore The New Adventure
        <Image
          src={"/_static/assets/home-page/advantage/line.svg"}
          alt={"line"}
          height={10}
          width={150}
          className="mt-1.5"
        />
      </h2>
      <div className="flex flex-col gap-y-4">
        {items.map(({ _id, icon, title, description }) => (
          <div
            key={_id}
            className="p-primary rounded-primary flex items-start gap-x-2 bg-white/70 shadow"
          >
            {icon}
            <div className="flex w-full flex-col gap-y-1">
              <h2 className="text-lg">{title}</h2>
              <p className="line-clamp-none text-sm md:line-clamp-2 lg:line-clamp-none">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default AdvantageArticle;
