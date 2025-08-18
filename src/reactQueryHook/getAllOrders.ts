import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getOrders } from "@/actions/orders/getOrders";
import { Order } from "@/db/schema";
// type Order = {
//   id: string;
//   fullName: string;
//   email: string | null;
//   phone: string | null;
//   address: string | null;
//   totalPrice: number;
//   status: OrderStatus;
//   isCouponActive: boolean;
//   paymentMethod: PaymentMethod;
//   orderproducts: {
//     productId: string;
//     title: string;
//     price: number;
//     promotionPrice: number | null;
//     selectedColor: string;
//     selectedSize: string;
//     quantity: number;
//     image: string;
//   }[];
//   userId: string;
//   createdAt: Date;
//   updatedAt: Date;
// };
export default function useAllOrders() {
  const queryClient = useQueryClient();

  // Retrieve previous data from the cache
  const previousData = queryClient.getQueryData<Order[]>(["orders"]);

  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    placeholderData: previousData,
  });
}
