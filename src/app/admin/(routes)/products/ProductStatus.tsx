/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ToggleSwitch from "@/components/ToggleSwitch";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useTransition } from "react";
import toast from "react-hot-toast";

interface ProductStatusProps {
  product: any;
}

const ProductStatusComp: React.FC<ProductStatusProps> = ({ product }) => {
  const [optimisticStatus, setOptimisticStatus] = useState<boolean>(
    product.Status
  );
  const queryClient = useQueryClient();

  // useTransition for smooth state updates
  const [isPending, startTransition] = useTransition();

  const handleToggle = useCallback(() => {
    const newStatus = !optimisticStatus; // Toggle the current status
    setOptimisticStatus(newStatus); // Optimistic UI update

    // startTransition(async () => {
    //   try {
    //     const success = await updateProductStatus(product.id, newStatus);
    //     console.log("Product status updated successfully:", success);
    //     if (success) {
    //       queryClient.invalidateQueries({
    //         queryKey: ["products"],
    //         variables: {
    //           where: { id: product.id },
    //         },
    //       });
    //       toast.success(
    //         `Le status du produit "${product.name}" est maintenant ${
    //           newStatus ? "actif" : "Inactif"
    //         }!`
    //       );
    //     } else {
    //       throw new Error("Failed to update status");
    //     }
    //   } catch (error) {
    //     toast.error(`Une erreur s'est produite. Veuillez réessayer.`);
    //     setOptimisticStatus(!newStatus); // Revert optimistic UI
    //   }
    // });
  }, [optimisticStatus, product.id, product.name]);
  return (
    <div>
      <ToggleSwitch
        status={optimisticStatus}
        onToggle={handleToggle}
        isActiveShow={true}
      />
    </div>
  );
};

export default ProductStatusComp;
