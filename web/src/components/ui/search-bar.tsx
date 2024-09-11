import React from "react";
import { Input } from "./input";
import { LucideSearch } from "lucide-react";

const SearchBar = () => {
  return (
    <>
      <LucideSearch className="lg:hidden block " />
      <div className="relative hidden lg:flex ">
        <Input
          placeholder="Search for products..."
          type="text"
          className="rounded-[62px] px-12 py-5 h-[48px]"
        />
      </div>
    </>
  );
};

export default SearchBar;
