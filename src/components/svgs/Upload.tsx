/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from "react";
interface UploadTypes {
  className?: string;
  strokeWidth?: number;
  onClick?: () => void;
  errors?: any;
  id?: any;
  borderNone?: boolean;
}
const Upload: React.FC<UploadTypes> = ({
  className,
  strokeWidth,
  onClick,
  errors,
  id,
  borderNone,
}) => {
  return (
    <div
      className={`flex items-center justify-center flex-col w-full  rounded-xl ${
        borderNone
          ? ""
          : "border border-neutral-400 border-dashed dark:border-neutral-600"
      }`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth ? strokeWidth : 1}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-folder-up cursor-pointer ${className}`}
        onClick={onClick}>
        <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
        <path d="m14 19.5 3-3 3 3" />
        <path d="M17 22v-5.5" />
        <circle cx="9" cy="9" r="2" />
      </svg>
      <div>
        {errors[id] && (
          <span className="text-red-500">
            {errors[id].message && errors[id].message}
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(Upload);
