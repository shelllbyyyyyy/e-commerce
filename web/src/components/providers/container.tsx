import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <main className={cn("max-w-[1400px] mx-auto pb-20", className)}>
      {children}
    </main>
  );
};

export default Container;
