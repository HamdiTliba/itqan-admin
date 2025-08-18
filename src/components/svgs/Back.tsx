import { memo } from "react";

interface BackButtonProps {
  className?: string;
  color?: string;
  onClick?: () => void;
}
const BackButton: React.FC<BackButtonProps> = ({
  className,
  color = "black",
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-undo-2 cursor-pointer ${className}`}>
        {/* <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" /> */}
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
        {/* <path d="m15 18-6-6 6-6" /> */}
      </svg>
    </div>
  );
};

export default memo(BackButton);
