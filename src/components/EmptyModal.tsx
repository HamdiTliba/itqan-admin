"use client";

import { memo } from "react";
import Close from "./svgs/Close";

const EmptyModal = ({
  isOpen,
  onClose,
  children,
  center,
  top,
  right,
  left,
  className,
  centerClassName,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  center?: boolean;
  top?: boolean;
  right?: boolean;
  left?: boolean;
  className?: string;
  centerClassName?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed  top-0 bottom-0 left-0 right-0  h-screen w-screen inset-0 z-[100] flex max-w-[1366px] mx-auto  ${
        center && "items-center justify-center"
      } ${top && "items-start justify-center mx-auto"} ${
        right && "items-center justify-end"
      } ${left && "items-center justify-start"} `}>
      <div
        className="absolute inset-0 cursor-pointer bg-black/50 backdrop-blur-md "
        onClick={onClose}></div>
      <div
        className={`relative z-10 pt-6 bg-white dark:bg-black  shadow-lg w-full border border-neutral-300 dark:border-neutral-600  ${
          center &&
          `m-1 md:m-2 rounded-2xl animate-slide-scale-in p-2 max-h-[90%] ${centerClassName}`
        } ${left && `animate-slide-left w-[75vw] h-screen p-10 `} ${
          right && "h-screen w-[50vw] p-10 animate-slide-right"
        }
        ${
          top &&
          " h-auto max-w-xl rounded-b-3xl w-full animate-slide-top p-2 md:p-4 "
        }
         overflow-y-auto
         overflow-x-hidden
        ${className}
        
        `}>
        <Close
          className="absolute top-1 right-2 pb-1 size-8  m-auto rounded-md flex justify-center items-center text-3xl font-semibold text-red-500 z-50 hover:scale-110 transition cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default memo(EmptyModal);
