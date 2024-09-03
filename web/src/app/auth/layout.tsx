import Container from "@/components/providers/container";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <Container className="pb-0">{children}</Container>
    </React.Fragment>
  );
}
