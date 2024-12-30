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
    <div className="relative flex items-center justify-center gap-2">
      <Input
        placeholder="search for hotels here"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <kbd className="pointer-events-none absolute right-3.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
      <span onClick={() => router.push(`/hotels?title=${search.toString()}`)}>
        <Icons.search className="size-6 text-muted-foreground" />
      </span>
    </div>
  );
};

export default SearchBar;
