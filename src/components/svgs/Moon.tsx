import React from "react";

interface MoonProps {
  className?: string;
  onClick?: () => void;
  darkMode?: boolean; // Prop to toggle dark theme styles
}

const Moon: React.FC<MoonProps> = ({ className, onClick, darkMode }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none" // Fill color for dark mode
      stroke={darkMode ? "white" : "currentColor"} // Stroke color for dark mode
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-moon ${className}`}
      onClick={onClick}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
};

export default Moon;
