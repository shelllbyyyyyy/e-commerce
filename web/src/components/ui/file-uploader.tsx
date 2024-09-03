"use client";

import Image from "next/image";
import React, { ChangeEventHandler } from "react";
import { Input } from "./input";

type FileUploaderProps = {
  handleImageChange: ChangeEventHandler<HTMLInputElement>;
  selectedProductImageFile: File | null | undefined;
  preview: string;
};

export const FileUploader = ({
  handleImageChange,
  preview,
  selectedProductImageFile,
}: FileUploaderProps) => {
  return (
    <div className="flex flex-col text-center space-y-5">
      <Input
        type="file"
        onChange={handleImageChange}
        accept="image/png, image/gif, image/jpeg, image/webp, image/jpg, image/svg"
      />
      {selectedProductImageFile ? (
        <Image
          src={preview}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <div className="space-y-5">
          <div className="flex w-full justify-center">
            <Image
              src="/assets/icons/upload.svg"
              width={40}
              height={40}
              alt="upload"
            />
          </div>
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
