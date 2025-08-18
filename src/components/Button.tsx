"use client";
import { memo } from "react";
import { ClipLoader } from "react-spinners";

interface ButtonProps {
  disabled?: boolean;
  label: string | React.ReactElement;
  widthFull?: boolean;
  small?: boolean;
  outline?: boolean;
  rounded?: boolean;
  noMargin?: boolean;
  shadow?: boolean;
  widthAuto?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  loadingLabel?: string;
  title?: string;
  textClassName?: string;
  black?: boolean;
  gray?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  disabled,
  onClick,
  label,
  widthFull,
  small,
  outline,
  rounded,
  noMargin,
  shadow,
  widthAuto,
  className,
  type,
  loading,
  title,
  textClassName,
  black,
  gray,
  loadingLabel = "en cours",
}) => {
  return (
    <button
      title={title}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex justify-center items-center disabled:opacity-20  disabled:cursor-not-allowed disabled:scale-100 disabled:hover:bg-black disabled:text-white disabled:bg-neutral-700 disabled:hover:text-white font-bold transition cursor-pointer ${className}
          ${widthFull ? "w-full" : " max-w-sm"}
          ${widthAuto ? "w-auto" : ""}
          ${small ? "text-md m-1 h-10" : "p-4"}
          ${
            outline &&
            "border border-black  dark:border-neutral-600 hover:border-transparent"
          }
          ${
            black
              ? "bg-black text-white hover:bg-white hover:text-black border border-neutral-300"
              : "bg-gray-200 text-gray-800  dark:border-neutral-600"
          }
          ${gray && "bg-neutral-50  hover:bg-white"}
          ${rounded ? "rounded-full" : "rounded-xl"}
          ${noMargin ? " m-0 p-1 " : "p-1"}
          ${shadow ? "smallBoxShadow" : ""}

      `}>
      <div
        className={`${
          small ? "text-xs leading-3" : "text-sm md:text-md leading-4"
        }  flex gap-2  ${textClassName} `}>
        {loading ? loadingLabel : label}
        {loading ? (
          <ClipLoader size={15} color="#36d7b7" speedMultiplier={3} />
        ) : (
          ""
        )}
      </div>
    </button>
  );
};

export default memo(Button);
