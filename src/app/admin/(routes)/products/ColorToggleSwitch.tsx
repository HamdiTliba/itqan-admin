"use client";

import ToggleSwitch from "@/components/ToggleSwitch";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

interface ColorToggleSwitchProps {
  selectedColorStatus: boolean;
  colorId: number;
  productId: string;
}

const ColorToggleSwitch: React.FC<ColorToggleSwitchProps> = ({
  selectedColorStatus,
  colorId,
  productId,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient(); // Initialize query client

  // Local state for optimistic UI updates
  const [optimisticStatus, setOptimisticStatus] = useState<boolean | undefined>(
    undefined
  );

  const [isPending, startTransition] = useTransition();

  const handleToggle = async () => {
    const newStatus = !optimisticStatus;
    setOptimisticStatus(newStatus);

    startTransition(async () => {
      try {
        // const success = await updateColorStatus(productId, colorId, newStatus);
        // if (success) {
        //   toast.success(
        //     `Le statut de la couleur a été mis à jour: ${
        //       newStatus ? "activé" : "désactivé"
        //     }!`
        //   );

        //   // Invalidate the products query after successful toggle
        //   queryClient.invalidateQueries({ queryKey: ["products"] });
        // } else {
        //   throw new Error("Échec de la mise à jour du statut");
        // }
      } catch (error) {
        toast.error(`Une erreur s'est produite. Veuillez réessayer.`);
        setOptimisticStatus(!newStatus); // Revert optimistic UI on error
      }
    });
  };

  return (
    <div>
      <ToggleSwitch
        status={optimisticStatus ?? selectedColorStatus} // Fallback to selectedColorStatus
        onToggle={handleToggle}
        isActiveShow={false}
      />
    </div>
  );
};

export default ColorToggleSwitch;
