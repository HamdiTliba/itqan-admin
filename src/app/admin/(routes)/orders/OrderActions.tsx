"use client";

import EmptyModal from "@/components/EmptyModal";
import Trash from "@/components/svgs/Trash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
// import { saveAs } from "file-saver";
import DeleteConfirm from "../products/DeleteProductConfirm";
import { deleteOrder } from "@/actions/orders/deleteOrder";

export type OrderTitle =
  | "Bon de commande"
  | "Bon de livraison"
  | "Facture"
  | `Bon d'achat`
  | "Paiements"
  | "Retour"
  | "Orders";
const OrderActions = ({
  order,
  withoutPdf,
  title,
  addToCart,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order: any;
  withoutPdf?: boolean;
  addToCart?: boolean;
  title: OrderTitle;
}) => {
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  const queryClient = useQueryClient();
  console.log(order);
  const deleteMutation = useMutation({
    mutationFn: async () => await deleteOrder(order.id),

    onSuccess: () => {
      toast.success("Order deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Error deleting order.");
    },
  });
  const handleDeleteConfirm = () => {
    deleteMutation.mutate();

    setIsDeleteProduct(false);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const handleShare = (blob: any) => {
  //     saveAs(blob, `${title}.pdf`);
  //     window.location.href = `mailto:?subject=${encodeURIComponent(
  //       `${title}`
  //     )}&body=${encodeURIComponent(`Kindly find attached invoice`)}`;
  //   };
  return (
    <div className="flex gap-1">
      <Trash
        className="cursor-pointer size-5 md:size-8 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-600 p-1 rounded-md"
        onClick={() => setIsDeleteProduct(true)}
      />
 
  

      {isDeleteProduct && (
        <EmptyModal
          isOpen={isDeleteProduct}
          onClose={() => setIsDeleteProduct(false)}
          center
          centerClassName="max-w-lg">
          <DeleteConfirm
            deletedElement="cette commande"
            onCancel={() => setIsDeleteProduct(false)}
            onConfirm={handleDeleteConfirm}
          />
        </EmptyModal>
      )}

    </div>
  );
};

export default OrderActions;
