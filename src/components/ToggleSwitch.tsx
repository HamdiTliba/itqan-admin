"use client";

import React from "react";

interface ToggleSwitchProps {
  status: boolean;
  isActiveShow?: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  status,
  onToggle,
  isActiveShow = true,
}) => {
  return (
    <div className="text-center">
      <div
        className={`flex items-center justify-center h-5 w-8 lg:h-6 lg:w-10 m-auto rounded-full  cursor-pointer transition-colors ${
          status
            ? "bg-blue-500 border border-blue-800"
            : "bg-gray-100 border border-neutral-300"
        }`}
        onClick={onToggle}>
        <div
          className={`size-[20.5px] lg:w-6 lg:h-6 aspect-square rounded-full transition-transform duration-300 ${
            status
              ? "bg-blue-50 translate-x-[50%] ring-1 ring-blue-500"
              : "bg-neutral-300 translate-x-[-50%] ring-1 ring-neutral-400"
          }`}></div>
      </div>
      {isActiveShow && (
        <span className="block mt-1 text-xs font-medium">
          {status ? "Actif" : "Inactif"}
        </span>
      )}
    </div>
  );
};

export default ToggleSwitch;
