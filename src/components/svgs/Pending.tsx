import React from "react";
interface PendingProps {
  className?: string; // Class name for the SVG element.
}
const Pending: React.FC<PendingProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-clock-arrow-up ${className}`}
    >
      <path d="M13.228 21.925A10 10 0 1 1 21.994 12.338" />
      <path d="M12 6v6l1.562.781" />
      <path d="m14 18 4-4 4 4" />
      <path d="M18 22v-8" />
    </svg>
  );
};

export default Pending;
