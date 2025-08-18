import { memo } from "react";

interface MinusProps {
  className?: string;
  onClick?: () => void;
}
const Minus: React.FC<MinusProps> = ({ onClick, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
      className={`lucide lucide-minus ${className}`}>
      <path d="M5 12h14" />
    </svg>
  );
};

export default memo(Minus);
