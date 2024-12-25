/**
 * Title: Write a program using JavaScript on Search
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
 * Date: 01, November 2023
 */

import React from "react";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <section className="mx-auto flex w-full flex-row gap-x-2 md:w-3/4 lg:w-1/3">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search Destinations Here..."
        className="!rounded-secondary form-input border-1 w-full border-primary px-4"
      />
      <button className="rounded-secondary flex flex-row items-center justify-center border border-primary bg-white px-2">
        <SearchIcon className="size-6" />
      </button>
    </section>
  );
};

export default Search;
