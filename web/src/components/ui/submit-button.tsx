import Image from "next/image";
import React from "react";

import { Button } from "./button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  ref?: React.LegacyRef<HTMLButtonElement>;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const SubmitButton = ({
  isLoading,
  className,
  children,
  ref,
  style,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      type="submit"
      ref={ref}
      style={style}
      disabled={isLoading}
      onClick={onClick}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
