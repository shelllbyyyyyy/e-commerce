import React from "react";
import Link from "next/link";

import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import SearchBar from "../ui/search-bar";

const NavigationBar = () => {
  return (
    <header className="w-full h-[96px]">
      <div className="flex justify-between mx-auto max-w-[1400px] w-full items-center py-[24px] px-4 sm:px-6 md:px-8 lg:px-20 gap-5">
        <aside>
          <h4 className=" text-primary uppercase font-bold">My Shop</h4>
        </aside>
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            <Link href="/pricing">Shop</Link>
            <Link href="/about">On Sale</Link>
            <Link href="/docs">New Arrival</Link>
            <Link href="/feature">Brands</Link>
          </ul>
        </nav>
        <aside className="flex items-center space-x-5">
          <SearchBar />
          <Link href="/auth/sign-in">
            <Button>Login</Button>
          </Link>
          <ThemeToggle />
        </aside>
      </div>
    </header>
  );
};

export default NavigationBar;
