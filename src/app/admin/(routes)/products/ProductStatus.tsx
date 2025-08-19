"use client";

import { updateProductStatus } from "@/actions/products/updateProductStatus";
import ToggleSwitch from "@/components/ToggleSwitch";
import { Product } from "@/db/schema";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useState, useTransition } from "react";
import toast from "react-hot-toast";

interface ProductStatusProps {
  product: Product;
}

const ProductStatusComp: React.FC<ProductStatusProps> = ({ product }) => {
  const [optimisticStatus, setOptimisticStatus] = useState<boolean>(
    product.status
  );
  const queryClient = useQueryClient();

  // useTransition for smooth state updates
  const [, startTransition] = useTransition();

  const handleToggle = useCallback(() => {
    const newStatus = !optimisticStatus; // Toggle the current status
    setOptimisticStatus(newStatus); // Optimistic UI update

    startTransition(async () => {
      try {
        const success = await updateProductStatus(product.id, newStatus);
        console.log("Product status updated successfully:", success);
        if (success) {
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
          toast.success(
            `Le status du produit "${product.productName}" est maintenant ${
              newStatus ? "actif" : "Inactif"
            }!`
          );
        } else {
          throw new Error("Failed to update status");
        }
      } catch (error) {
        toast.error(`Une erreur s'est produite. Veuillez réessayer.`);
        console.error(error);
        setOptimisticStatus(!newStatus); // Revert optimistic UI
      }
    });
  }, [optimisticStatus, product.id, product.productName, queryClient]);
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
