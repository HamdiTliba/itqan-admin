"use client";

import { signOut } from "next-auth/react";
import Logout from "../svgs/Logout";

const LogoutNav = () => {
  const signOutClick = async () => {
    await signOut();
  };
  return <Logout className="size-7" onClick={signOutClick} />;
};

export default LogoutNav;
