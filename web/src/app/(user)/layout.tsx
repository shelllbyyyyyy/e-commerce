import React from "react";

import NavigationBar from "@/components/elements/navigation-bar";
import { Footer } from "@/components/elements/footer";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <NavigationBar />
      {children}
      <Footer />
    </React.Fragment>
  );
}
