"use client";

import Image from "next/image";
import { memo } from "react";
import { Category } from "./AddProduct";

interface AddCategorySelectProps {
  category: Category;
  onClick: () => void;
  isSelected: boolean;
}

const AddCategorySelect: React.FC<AddCategorySelectProps> = ({
  category,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={`flex flex-col  w-full cursor-pointer rounded-lg capitalize bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 ${
        isSelected
          ? "ring-[1px] scale-[1.02] ring-blue-500 transition-all ease-in-out "
          : ""
      }`}
      onClick={onClick}>
      <div className="relative w-full aspect-square">
        <Image
          src={category.image}
          alt={category.category}
          fill
          loading="eager"
          className="rounded-t-[9px] object-cover"
        />
      </div>
      <h1 className="flex justify-center items-center text-sm font-medium my-1">
        {category.category}
      </h1>
    </div>
  );
};

export default memo(AddCategorySelect);
