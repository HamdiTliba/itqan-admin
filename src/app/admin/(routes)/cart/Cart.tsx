/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { shortText } from "@/utils/shortText";
import toast from "react-hot-toast";
import Image from "next/image";

import OrderActions from "../orders/OrderActions";
export enum OrderStatus {
  EnAttente = "En Attente",
  ConfirmedOrder = "Commande Confirmée",
  CanceledOrder = "Commande Annulée",
  EnLivraison = "En Livraison",
  ReceivedOrder = "Commande Reçue",
  PaidOrder = "Commande Payée",
  Retour = "Retour",
}

const Cart = ({
  order,
  index,
  isOrderExpanded,
  setIsOrderExpanded,
}: {
  order: any;
  index: number;
  isOrderExpanded: boolean;
  setIsOrderExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <tr
      className={`hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all ease-in-out h-full   ${
        index % 2 === 0
          ? "bg-white dark:bg-black"
          : "bg-neutral-50 dark:bg-neutral-800"
      }`}>
      <td
        className="p-2 border-r dark:border-neutral-600 break-words hyphens-auto transition-all ease-in-out duration-300 cursor-pointer"
        onClick={() => {
          setIsOrderExpanded(!isOrderExpanded);
          navigator.clipboard.writeText(order.id);
          toast.success(`Order ID ${index + 1} has been copied.`);
        }}>
        {shortText(order.id, isOrderExpanded ? 1000 : 11)}
      </td>

      <td className="p-2 border-r dark:border-neutral-600 text-center">
        {order.addToCartproduct.price.toFixed(3)} dt
      </td>
      <td className="p-2 border-r dark:border-neutral-600 text-center">
        {order.isCouponActive ? (
          <p className="text-green-600 font-medium">Valid</p>
        ) : (
          <p className="text-red-600 font-medium">Invalid</p>
        )}
      </td>

      <td className="p-2 border-r dark:border-neutral-600 space-y-1">
        <div className="flex items-center gap-2 w-64">
          <Image
            src={order.addToCartproduct.image}
            alt={order.addToCartproduct.title}
            width={50}
            height={50}
            className="rounded"
          />
          <div>
            <strong>{order.addToCartproduct.title}</strong>
          </div>
        </div>
      </td>
      <td className="p-2 border-r dark:border-neutral-600">
        {new Date(order.createdAt).toLocaleString()}
      </td>
      <td className="p-2 border-r dark:border-neutral-600 text-center">
        <div className="flex justify-evenly items-center gap-2">
          <OrderActions order={order} withoutPdf title="Orders" addToCart />
        </div>
      </td>
    </tr>
  );
};
export default Cart;
