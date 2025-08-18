import React from "react";
interface ArrowProps {
  className?: string;
  strokeColor?: string;
}
const Arrow: React.FC<ArrowProps> = ({
  className,
  strokeColor = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-circle-arrow-up ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
    </svg>
  );
};

export default Arrow;
