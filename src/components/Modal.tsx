"use client";

import Image from "next/image";
import { memo } from "react";

const Modal = ({
  isOpen,
  onClose,
  imageUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>
      <div className="relative z-10 p-2 m-1 bg-white rounded-lg shadow-lg overflow-x-hidden">
        <Image
          src={imageUrl}
          alt="Modal Image"
          width={500}
          height={500}
          className="w-auto h-auto max-w-full max-h-screen rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 pb-1 size-8 bg-white m-auto rounded-md flex justify-center items-center text-3xl font-semibold  text-red-500  hover:scale-110 transition"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
export default memo(Modal);
