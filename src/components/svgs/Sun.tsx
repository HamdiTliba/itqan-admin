import React from "react";

interface SunProps {
  className?: string;
  onClick?: () => void;
  darkMode?: boolean; // Prop to toggle dark theme styles
}

const Sun: React.FC<SunProps> = ({ className, onClick, darkMode }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={darkMode ? "white" : "currentColor"} // Stroke color for dark mode
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-sun ${className}`}
      onClick={onClick}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
};

export default Sun;
