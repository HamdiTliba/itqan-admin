// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState } from "react";
// import Input from "@/components/Input";
// import { useForm } from "react-hook-form";
// import Skeleton from "@/components/Skeleton";
// import CartCard from "./CartCard";
// import Cart from "./Cart";
// import useAllAddToCart from "@/reactQueryHook/getAllAddToCart";

// const CartPage = ({ onlyTable }: { onlyTable?: boolean }) => {
//   const { data: carts } = useAllAddToCart();
//   const [isOrderExpanded, setIsOrderExpanded] = useState(false);
//   const [searchInput, setsearchInput] = useState("");
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const filteredAddToCarts = carts?.filter((order: any) => {
//     const search = searchInput.toLowerCase().replace(/\s+/g, ""); // Remove all spaces

//     const matchProduct = order.addToCartproduct?.title
//       ?.toLowerCase()
//       .includes(search);

//     return matchProduct;
//   });

//   return (
//     <div className="flex flex-col gap-2 h-full w-full ">
//       {!onlyTable && (
//         <>
//           <CartCard carts={carts || []} />
//           <div className="flex items-center w-full gap-4">
//             <Input
//               id="search"
//               label="Chercher dans la panier"
//               register={register}
//               defaultValue={searchInput}
//               {...register("search", {
//                 onChange: (e) => {
//                   setsearchInput(e.target.value);
//                 },
//               })}
//               errors={errors}
//               className="max-w-md w-full"
//               smallPad
//               widthfull
//             />
//           </div>
//         </>
//       )}
//       <div className="overflow-hidden">
//         <div className="overflow-x-scroll h-full w-full border border-neutral-300 dark:border-neutral-600 rounded-xl">
//           <table className="w-full text-xs ">
//             <thead className="bg-neutral-50 border-b dark:bg-neutral-800 dark:border-neutral-600 ">
//               <tr>
//                 <th className="p-1 md:p-2 w-28">Panier ID</th>
//                 <th className="p-1 md:p-2">Total Price</th>
//                 <th className="p-1 md:p-2">Coupon</th>
//                 <th className="p-1 md:p-2">Products</th>
//                 <th className="p-1 md:p-2">Created At</th>
//                 <th className="p-1 md:p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="w-full">
//               {carts ? (
//                 filteredAddToCarts?.map((order: any, index: number) => (
//                   <Cart
//                     key={order.id}
//                     order={order}
//                     index={index}
//                     isOrderExpanded={isOrderExpanded}
//                     setIsOrderExpanded={setIsOrderExpanded}
//                   />
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={9}>
//                     <Skeleton className="w-full h-12" />
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
