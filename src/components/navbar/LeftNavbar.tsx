"use client";
import useGlobal from "@/hooks/useGlobal";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftNavbar = () => {
  const { isSelectedLink, setIsSelectedLink } = useGlobal();
  const path = usePathname();
  const pathArray = path.split("/").filter((segment) => segment !== "");

  return (
    <div className="hidden md:flex gap-2 w-full">
      {pathArray.map((item, index) => {
        const href = `/${pathArray.slice(0, index + 1).join("/")}`;
        const isActive = isSelectedLink === href;

        return (
          <Link
            key={index}
            href={href}
            className={`flex w-fit p-1  rounded-xl justify-center  items-center  ${
              isActive
                ? "bg-sky-500 dark:bg-sky-800 text-white font-bold border-[1px]  border-transparent"
                : "bg-white border-[1px] dark:bg-black border-neutral-300 dark:border-neutral-600"
            }`}
            onClick={() => setIsSelectedLink(href)}>
            /<div className="p-1 capitalize ">{item}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default LeftNavbar;
