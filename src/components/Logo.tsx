import { Mystery_Quest } from "next/font/google";
import Link from "next/link";
import { memo } from "react";

const mystery = Mystery_Quest({ subsets: ["latin"], weight: "400" });

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/admin"
      className={`${mystery.className} hidden sm:inline-block  text-2xl s rounded-full ${className}`}
    >
      Store exemple
    </Link>
  );
};

export default memo(Logo);
