"use client";

import Button from "@/components/Button";
import React from "react";

interface DeleteConfirmProps {
  onCancel: () => void;
  onConfirm: () => void;
  deletedElement: string;
}

const DeleteConfirm: React.FC<DeleteConfirmProps> = ({
  onCancel,
  onConfirm,
  deletedElement,
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-5">
      <p className="text-lg font-semibold text-center mb-4">
        Êtes-vous sûr de vouloir supprimer {deletedElement} ?
      </p>
      <div className="flex justify-center items-center w-full gap-2">
        <Button
          label="Cancel"
          black
          widthFull
          className="h-16 bg-neutral-100"
          textClassName="text-black"
          onClick={onCancel}
        />
        <Button
          label="Delete"
          black
          widthFull
          className="h-16 bg-red-500 text-white"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default DeleteConfirm;
