"use client";

import Trash from "@/components/svgs/Trash";

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import EmptyModal from "@/components/EmptyModal";
// import EditProductForm from "./EditProductForm";
import DeleteConfirm from "./DeleteProductConfirm";
import { Product } from "@/db/schema";
import { deleteProduct } from "@/actions/products/deleteProduct";

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  // const [isEditProduct, setIsEditProduct] = useState(false);
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteProduct(product.id),
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Error deleting product.");
    },
  });

  const handleDeleteConfirm = () => {
    deleteMutation.mutate();
    setIsDeleteProduct(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-2">
      {/* <Edit
        className="cursor-pointer size-5 md:size-8 bg-neutral-50 dark:bg-neutral-800"
        onClick={() => setIsEditProduct(true)}
      /> */}
      <Trash
        className="cursor-pointer size-5 md:size-8 bg-neutral-50 dark:bg-neutral-800"
        onClick={() => setIsDeleteProduct(true)}
      />
      {/* {isEditProduct && (
        <EmptyModal
          center
          isOpen={isEditProduct}
          centerClassName="max-w-lg"
          onClose={() => setIsEditProduct(false)}>
          <EditProductForm product={product} />
        </EmptyModal>
      )} */}
      {isDeleteProduct && (
        <EmptyModal
          center
          centerClassName="max-w-lg"
          isOpen={isDeleteProduct}
          onClose={() => setIsDeleteProduct(false)}>
          <DeleteConfirm
            deletedElement="ce produit"
            onCancel={() => setIsDeleteProduct(false)}
            onConfirm={handleDeleteConfirm}
          />
        </EmptyModal>
      )}
    </div>
  );
};

export default ProductActions;
