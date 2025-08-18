import { memo } from "react";

interface AddMessageProps {
  className?: string;
  onClick?: () => void;
}
const AddMessage: React.FC<AddMessageProps> = ({ onClick, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
      className={`lucide lucide-message-square-plus ${className} -mx-1`}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
};

export default memo(AddMessage);
