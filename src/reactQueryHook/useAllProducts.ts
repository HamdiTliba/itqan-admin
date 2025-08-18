import { getProducts } from "@/actions/products/getProducts";
import { useQuery } from "@tanstack/react-query";

export default function useAllProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
}
