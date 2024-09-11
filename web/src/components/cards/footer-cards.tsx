import { IFooter, ISocial } from "@/shared/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const FooterCard: React.FC<IFooter> = ({
  title,
  link1,
  link2,
  link3,
  link4,
  href1,
  href2,
  href3,
  href4,
}) => {
  return (
    <div className="flex flex-col gap-3 text-muted-foreground">
      <p className="font-bold uppercase mb-2 text-primary">{title}</p>
      <Link href={href1}>{link1}</Link>
      <Link href={href2}>{link2}</Link>
      <Link href={href3}>{link3}</Link>
      <Link href={href4}>{link4}</Link>
    </div>
  );
};

export const FooterSocial: React.FC<ISocial> = ({ imgUrl, link }) => {
  return (
    <Link href={link}>
      <Image
        src={imgUrl}
        width={28}
        height={28}
        alt="social"
        style={{
          width: "auto",
          height: "auto",
        }}
      />
    </Link>
  );
};
