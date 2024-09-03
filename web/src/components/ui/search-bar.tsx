import React from "react";
import { Input } from "./input";
import { LucideSearch } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative flex w-[577px]">
      <LucideSearch className="absolute top-3 left-3.5" />
      <Input
        placeholder="Search for products..."
        type="text"
        className="rounded-[62px] px-12 py-5 h-[48px]"
      />
    </div>
  );
};

export default SearchBar;
