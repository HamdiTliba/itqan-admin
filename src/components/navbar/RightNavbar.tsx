import NavUserButton from "./NavUserButton";
import LogoutNav from "./Logout";
import Refresh from "../svgs/Refresh";

export const style = `size-10 aspect-square flex justify-center items-center rounded-xl cursor-pointer border-[1px]  border-neutral-300 dark:border-neutral-600 `;

const RightNavbar = () => {
  return (
    <div className="flex gap-2 w-full justify-end">
      {/* <div
        className={`${style} hover:scale-105 hover:bg-white transition-all dark:bg-black dark:hover:bg-neutral-800`}>
        <Notification className="size-7" />
      </div>
      <div
        className={`${style} hover:scale-105 hover:bg-white transition-all dark:bg-black dark:hover:bg-neutral-800`}>
        <Settings className="size-7" />
      </div> */}
      <div
        className={`${style} hover:scale-105 hover:bg-white transition-all dark:bg-black dark:hover:bg-neutral-800`}>
        <Refresh className="size-7" />
      </div>
      {/* <div className={style}></div>
      <div className={style}></div> */}

      <NavUserButton />
      {/* <ButtonThemeToggle /> */}
      <div className="border-l dark:border-neutral-600 m-1 " />
      <div
        className={`${style} hover:scale-105 hover:bg-white transition-all dark:bg-black dark:hover:bg-neutral-800`}>
        <LogoutNav />
      </div>
    </div>
  );
};

export default RightNavbar;
