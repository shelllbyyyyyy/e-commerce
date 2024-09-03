import { cn } from "@/lib/utils";
import React from "react";

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return (
    <div className={cn("px-4 sm:px-6 md:px-8 lg:px-20", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
