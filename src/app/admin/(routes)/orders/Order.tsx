/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { shortText } from "@/utils/shortText";
import toast from "react-hot-toast";
import OrderActions from "./OrderActions";
import Image from "next/image";

import { updateOrderStatus } from "@/actions/orders/updateOrderStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { orderStatusEnum, Order as OrderType } from "@/db/schema";
export enum OrderStatus {
  EnAttente = "En Attente",
  EnCours = "En Cours",
  Terminé = "Terminé",
  Annulé = "Annulé",
}
// const statusStyles: Record<OrderStatus, { text: string; bg: string }> = {
//   [OrderStatus.EnAttente]: { text: "text-neutral-600", bg: "bg-neutral-100" },
//   [OrderStatus.ConfirmedOrder]: { text: "text-cyan-600", bg: "bg-cyan-100" },
//   [OrderStatus.CanceledOrder]: { text: "text-pink-600", bg: "bg-pink-100" },
//   [OrderStatus.EnLivraison]: { text: "text-sky-600", bg: "bg-sky-100" },
//   [OrderStatus.ReceivedOrder]: { text: "text-teal-600", bg: "bg-teal-100" },
//   [OrderStatus.PaidOrder]: { text: "text-green-600", bg: "bg-green-100" },
//   [OrderStatus.Retour]: { text: "text-red-600", bg: "bg-red-100" },
// };
// export type OrderStatus = "EnAttente" | "EnCours" | "Terminé" | "Annulé";
const Order = ({
  order,
  index,
  isOrderExpanded,
  setIsOrderExpanded,
}: {
  order: OrderType;
  index: number;
  isOrderExpanded: boolean;
  setIsOrderExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    order: OrderType
  ) => {
    const newStatus = e.target.value as keyof typeof OrderStatus;
    console.log("New status:", newStatus);
    try {
      await updateOrderStatus(order.id, newStatus);
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      router.refresh();
      toast.success("Order status updated successfully.");
    } catch (error) {
      toast.error("Failed to update order status.");
    }
  };
  return (
    <tr
      className={`hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all ease-in-out h-full   ${
        index % 2 === 0
          ? "bg-white dark:bg-black"
          : "bg-neutral-50 dark:bg-neutral-800"
      }`}>
      <td
        className="p-2 border-r border-neutral-300 dark:border-neutral-600 break-words hyphens-auto transition-all ease-in-out duration-300 cursor-pointer"
        onClick={() => {
          setIsOrderExpanded(!isOrderExpanded);
          navigator.clipboard.writeText(order.id);
          toast.success(`Order ID ${index + 1} has been copied.`);
        }}>
        {shortText(order.id, isOrderExpanded ? 1000 : 11)}
      </td>
      <td className="p-2 border-r border-neutral-300 dark:border-neutral-600 w-36 break-words hyphens-auto">
        <p className="font-bold">{order.fullName}</p>
        <p>{order.email}</p>
        <p>{order.phone}</p>
        <p>{order.address}</p>
      </td>
      <td className="p-2 border-r border-neutral-300 dark:border-neutral-600 text-center">
        {parseFloat(order.totalPrice)} dt
      </td>
      {/* <td className="p-2 border-r dark:border-neutral-600 text-center">
        {order.isCouponActive ? (
          <p className="text-green-600 font-medium">Valid</p>
        ) : (
          <p className="text-red-600 font-medium">Invalid</p>
        )}
      </td> */}
      {/* <td className="p-2 border-r dark:border-neutral-600 text-center">
        {order.paymentMethod}
      </td> */}
      <td className="p-2 border-r border-neutral-300 dark:border-neutral-600 space-y-1">
        {order.orderProducts.map((product, pIndex) => (
          <div key={pIndex} className="flex items-center gap-2 w-64">
            <Image
              src={product.image}
              alt={product.title}
              width={50}
              height={50}
              className="rounded"
            />
            <div>
              <strong>{product.title}</strong> - {product.quantity} x{" "}
              {product.promotionPrice} dt
            </div>
          </div>
        ))}
      </td>
      <td className="p-2 border-r border-neutral-300 dark:border-neutral-600">
        {new Date(order.createdAt).toLocaleString()}
      </td>
      <td className="p-2 border-r border-neutral-300 dark:border-neutral-600 text-center">
        <div className="flex justify-evenly items-center gap-2">
          <OrderActions order={order} withoutPdf title="Orders" />
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e, order)}
            className="p-1 border border-neutral-300 dark:border-neutral-600 rounded-md outline-none">
            {Object.keys(OrderStatus).map((statusValue) => (
              <option key={statusValue} value={statusValue}>
                {OrderStatus[statusValue as keyof typeof OrderStatus]}
              </option>
            ))}
          </select>
        </div>
      </td>
      <td className="p-2 border-r border-neutral-300 dark:border-neutral-600 text-center ">
        <div className="flex justify-center">
          {order.status === "EnAttente" && (
            <p className="py-1 px-3 text-neutral-600 bg-neutral-100 rounded-md ">
              En Attente
            </p>
          )}
          {order.status === "EnCours" && (
            <p className="py-1 px-3 text-cyan-600 bg-cyan-100 rounded-md ">
              Commande Confirmée
            </p>
          )}
          {order.status === "Annulé" && (
            <p className="py-1 px-3 text-pink-600 bg-pink-100 rounded-md ">
              Commande Annulée
            </p>
          )}

          {order.status === "Terminé" && (
            <p className="py-1 px-3 text-sky-600 bg-sky-100 rounded-md ">
              En Livraison
            </p>
          )}
        </div>
      </td>
    </tr>
  );
};
export default Order;
