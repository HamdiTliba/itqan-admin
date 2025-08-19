"use client";
import { useEffect, useState } from "react";
import User from "../svgs/User";
import { style } from "./RightNavbar";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "../Button";

const NavUserButton = () => {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(false);

  console.log("session", session);
  console.log(status);

  //   if (status === "loading") return <div>Loading...</div>;

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserInfo(false);
    }, 3000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timer);
  }, [userInfo]);
  return (
    <div>
      <div
        className={`${style} hover:scale-105 hover:bg-white transition-all dark:bg-black dark:hover:bg-neutral-800`}
        onClick={() => setUserInfo(!userInfo)}>
        {session?.user.image ? (
          <div
            className="relative w-full aspect-square z-50"
            onClick={() => setUserInfo(false)}>
            <Image
              src={
                session?.user?.image ||
                "https://images.pexels.com/photos/27897903/pexels-photo-27897903/free-photo-of-close-up-portrait-of-a-man.jpeg?auto=compress&cs=tinysrgb&w=400"
              }
              alt="User Avatar"
              fill
              onClick={() => setUserInfo(false)}
              className="object-cover rounded-xl"
            />
          </div>
        ) : (
          <User className="size-6" />
        )}
      </div>
      {userInfo && (
        <div className="absolute z-50 transform -translate-x-40 w-[200px] bg-white dark:bg-black rounded-xl border-[1px] dark:border-neutral-600 shadow-md p-2 leading-4 ">
          <div className="font-bold">
            {session?.user.name ||
              `${session?.user.firstName} ${session?.user.lastName}`}
          </div>
          <div className="font-light text-xs">{session?.user.email}</div>
          <div className="capitalize text-sm text-end font-semibold text-green-600">
            {session?.user.role.toLocaleLowerCase()}
          </div>
          {/* <Button
            black
            label="Log out"
            onClick={signOutClick}
            widthFull
            className="h-10"
          /> */}
        </div>
      )}
    </div>
  );
};

export default NavUserButton;
