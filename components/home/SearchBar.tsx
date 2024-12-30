"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Icons } from "../shared/icons";
import { Input } from "../ui/input";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const handleSearch = (value: string) => {
    console.log(value);
    setSearch(value);
  };
  if (pathname !== "/") return null;
  return (
    <div className="relative flex items-center justify-center gap-2 max-md:hidden">
      <Input
        placeholder="search for hotels here"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <span onClick={() => router.push(`/hotels?title=${search.toString()}`)}>
        <Icons.search className="size-6 text-muted-foreground" />
      </span>
    </div>
  );
};

export default SearchBar;
