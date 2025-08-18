// import { getOrderById } from "@/actions/orders/getOrderById";
import { useQuery } from "@tanstack/react-query";

export default function useCategory(orderId: string) {
  return useQuery({
    queryKey: ["order"],
    // queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
    // staleTime: 1000 * 60 * 5,
  });
}
