"use client";

import Login from "@/components/account/Login";
import Register from "@/components/account/Register";
import useGlobal from "@/hooks/useGlobal";

export default function Home() {
  const { account } = useGlobal();
  console.log("account: ", account);
  return (
    <div className="flex flex-col h-screen animate-scale-in">
      <div className="flex justify-center items-center h-full">
        {account === "Login" && <Login />}
        {account === "Register" && <Register />}
      </div>
    </div>
  );
}
