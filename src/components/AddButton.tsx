import React from "react";
import Add from "./svgs/Add";
interface AddButtonProps {
  label: string;
  onClick?: () => void;
}
const AddButton: React.FC<AddButtonProps> = ({ label, onClick }) => {
  return (
    <div
      className="flex justify-center items-center px-4 py-2 text-base gap-1 border-[1px]  font-semibold  rounded-full bg-neutral-50 hover:bg-white dark:bg-neutral-800 dark:hover:bg-black dark:border-neutral-600 transition-all cursor-pointer border-neutral-300"
      onClick={onClick}>
      <Add className="size-6" /> {label}
    </div>
  );
};

export default AddButton;
