/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { Size } from "@/app/admin/(routes)/products/AddProduct";
import { memo } from "react";
import Input from "./Input";

export const sizesData: any[] = [
  {
    id: 0,
    name: "XS",
    quantity: 0,
  },
  {
    id: 1,
    name: "S",
    quantity: 0,
  },
  {
    id: 2,
    name: "M",
    quantity: 0,
  },
  {
    id: 3,
    name: "L",
    quantity: 0,
  },
  {
    id: 4,
    name: "XL",
    quantity: 0,
  },
  {
    id: 5,
    name: "XXL",
    quantity: 0,
  },
  {
    id: 6,
    name: "XXXL",
    quantity: 0,
  },
];

interface SizesProps {
  sizes: any;
  onClick: () => void;
  selectedSize?: any[] | null;
  register: any;
  errors: any;
  id: number;
  index: number;
  quanityDefaultValue: number | null;
  onQuantityChange: (event: any) => void;
}

const Sizes: React.FC<SizesProps> = ({
  sizes,
  onClick,
  selectedSize,
  register,
  errors,
  id,
  index,
  quanityDefaultValue,
  onQuantityChange,
}) => {
  return (
    <div className="flex flex-col">
      <div
        className={`border  p-[6px] h-10 min-w-10 flex flex-row items-center justify-center w-full  text-sm hover:scale-105 transition-all ease-in-out bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 rounded-xl cursor-pointer font-light
        ${
          selectedSize?.find((size) => size.id === sizes.id)
            ? "ring-[1px] scale-[1.02] ring-sky-500 transition-all ease-in-out"
            : ""
        }
        `}
        onClick={onClick}>
        {sizes.name}
      </div>
      <div className="mt-2 h-10 text-center text-sm ">
        <Input
          type="number"
          id={`colors.${id}.sizes.${index}.quantity`}
          label="0"
          register={register}
          defaultValue={quanityDefaultValue}
          {...register(`colors.${id}.sizes.${index}.quantity`, {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              // Ensure that e.target is defined before accessing its value
              if (e.target) {
                onQuantityChange(e.target.value);
              }
            },
          })}
          errors={errors}
          noPadding
          className="border dark:border-neutral-600 size-10 text-xs text-center"
        />
      </div>
    </div>
  );
};

export default memo(Sizes);
