"use client";

import { useTheme } from "next-themes";
import React, { useState } from "react";
import Moon from "./svgs/Moon";
import Sun from "./svgs/Sun";

const ButtonThemeToggle = () => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsThemeOpen(false);
  };
  console.log("Theme:", theme);
  return (
    <div className="relative">
      <div className=" z-50 size-10  border border-neutral-300 rounded-xl cursor-pointer bg-neutral-50 dark:bg-black dark:hover:bg-neutral-800 dark:border-neutral-600 animate-slide-bottom hover:scale-105 transition-all p-1">
        {/* Main Button to Open Theme Options */}
        <div
          className="flex justify-center items-center h-full"
          onClick={() => setIsThemeOpen(!isThemeOpen)}>
          {theme === "light" ? (
            <Sun className="size-8 md:size-12 aspect-square" />
          ) : (
            <Moon className="size-8 md:size-12 aspect-square" />
          )}
        </div>

        {/* Theme Options */}
      </div>
      {isThemeOpen && (
        <div className="absolute z-50 space-y-1 flex flex-col bg-white border border-neutral-300 rounded-xl dark:bg-black dark:border-neutral-600 dark:rounded-xl p-1 animate-slide-top w-10  stillShadow">
          {/* Dark Theme Button */}
          <button
            className="flex items-center justify-center h-full  dark:bg-black"
            onClick={() => handleThemeChange("dark")}>
            <Moon
              darkMode={theme === "dark"}
              className="size-8  aspect-square"
            />
          </button>

          {/* Light Theme Button */}
          <button
            className="flex items-center justify-center h-full rounded dark:bg-black"
            onClick={() => handleThemeChange("light")}>
            <Sun darkMode={theme === "dark"} className="size-8 aspect-square" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonThemeToggle;
