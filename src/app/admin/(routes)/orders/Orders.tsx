"use client";

import useAllOrders from "@/reactQueryHook/getAllOrders";
import React, { useState } from "react";
import OrderCard from "./OrderCard";
import Input from "@/components/Input";
import AddButton from "@/components/AddButton";
import { useForm } from "react-hook-form";
import EmptyModal from "@/components/EmptyModal";
import Skeleton from "@/components/Skeleton";
import Order from "./Order";

const Orders = () => {
  const { data: orders } = useAllOrders();
  const [isOrderExpanded, setIsOrderExpanded] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const [addOrder, setAddOrder] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if (!orders || !Array.isArray(orders)) return null; // or render fallback

  const filteredOrders = orders.filter((order) => {
    const search = searchInput.toLowerCase();

    const matchProduct = order.orderProducts?.some((product) =>
      product.title?.toLowerCase().includes(search)
    );
    const matchClient = order.fullName?.toLowerCase().includes(search);

    const matchStatus = order.status.toLowerCase().includes(search);

    return matchProduct || matchStatus || matchClient;
  });

  return (
    <div className="flex flex-col gap-2 h-full w-full ">
      {/* {!onlyTable && (
        <>
          <OrderCard orders={orders || []} />
          <div className="flex justify-between items-center w-full gap-4">
            <Input
              id="search"
              label="Chercher une commonde/client/status"
              register={register}
              defaultValue={searchInput}
              {...register("search", {
                onChange: (e) => {
                  setsearchInput(e.target.value);
                },
              })}
              errors={errors}
              className="max-w-md w-full"
              smallPad
              widthfull
            />
          </div>
        </>
      )} */}
      <div className="overflow-hidden">
        <div className="overflow-x-scroll h-full w-full border border-neutral-300 dark:border-neutral-600 rounded-xl">
          <table className="w-full text-xs ">
            <thead className="bg-neutral-50 border-b border-neutral-300 dark:bg-neutral-800 dark:border-neutral-600 ">
              <tr>
                <th className="p-1 md:p-2 w-28">Order ID</th>
                <th className="p-1 md:p-2">Client Details</th>
                <th className="p-1 md:p-2">Total Price</th>
                {/* <th className="p-1 md:p-2">Coupon</th>
                <th className="p-1 md:p-2">Payment Method</th> */}
                <th className="p-1 md:p-2">Products</th>
                <th className="p-1 md:p-2">Created At</th>
                <th className="p-1 md:p-2">Actions</th>
                <th className="p-1 md:p-2">Status</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {orders ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                filteredOrders?.map((order: any, index: number) => (
                  <Order
                    key={order.id}
                    order={order}
                    index={index}
                    isOrderExpanded={isOrderExpanded}
                    setIsOrderExpanded={setIsOrderExpanded}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={9}>
                    <Skeleton className="w-full h-12" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* {addOrder && (
        <EmptyModal
          center
          centerClassName="max-w-md"
          isOpen={addOrder}
          onClose={() => setAddOrder(false)}>
          <AddOrderModal />
        </EmptyModal>
      )} */}
    </div>
  );
};

export default Orders;
