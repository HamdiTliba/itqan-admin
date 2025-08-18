"use client";
interface MessageCirclePlusProps {
  className?: string;
  onClick?: () => void;
}
const MessageCirclePlus: React.FC<MessageCirclePlusProps> = ({
  className,
  onClick,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#009dff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-message-circle-plus ${className}`}
      onClick={onClick}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
};

export default MessageCirclePlus;
