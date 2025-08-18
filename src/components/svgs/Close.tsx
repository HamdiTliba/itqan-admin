import { memo } from "react";

interface CloseProps {
  className?: string;
  onClick?: () => void;
}
const Close: React.FC<CloseProps> = ({ className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-x ${className} `}
      onClick={onClick}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

export default memo(Close);
