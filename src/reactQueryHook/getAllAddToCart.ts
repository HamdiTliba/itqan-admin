// import { getAllAddToCart } from "@/actions/addToCart/getAllAddToCart";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// type Cart = {
//   id: string;
//   isCouponActive: boolean;
//   addToCartproduct: {
//     productId: string;
//     title: string;
//     price: number;
//     promotionPrice: number | null;
//     selectedColor: string;
//     selectedSize: string;
//     quantity: number;
//     image: string;
//   };
//   createdAt: Date;
//   updatedAt: Date;
// };
// export default function useAllAddToCart() {
//   const queryClient = useQueryClient();

//   // Retrieve previous data from the cache
//   const previousData = queryClient.getQueryData<Cart[]>(["carts"]);

//   return useQuery({
//     queryKey: ["carts"],
//     queryFn: () => getAllAddToCart(),
//     placeholderData: previousData,
//   });
// }
