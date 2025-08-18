// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import ColorToggleSwitch from "./ColorToggleSwitch";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Product, ProductSize } from "@/db/schema";

// interface SizeByColorProps {
//   product: Product;
//   colorStatus: boolean;
//   sizes: ProductSize[];
//   colorId: string;
// }

// const SizeByColor: React.FC<SizeByColorProps> = ({
//   product,
//   colorStatus,
//   sizes,
//   colorId,
// }) => {
//   console.log(colorStatus);
//   return (
//     <div className="mt-5">
//       <div className="mb-5">
//         <ColorToggleSwitch
//           selectedColorStatus={colorStatus}
//           productId={product.id}
//           colorId={colorId}
//         />
//       </div>
//       <div className="flex justify-center items-center flex-col">
//         {sizes && sizes.length > 0 ? (
//           <table className="table-auto border-collapse border border-gray-300 dark:border-neutral-600 w-full text-sm">
//             <thead>
//               <tr className="bg-gray-100 dark:bg-neutral-800">
//                 <th className="border border-gray-300 dark:border-neutral-600 px-4 py-2 text-left">
//                   Taille
//                 </th>
//                 <th className="border border-gray-300 dark:border-neutral-600 px-4 py-2 text-left">
//                   Quantité
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {sizes.map((size) => (
//                 <tr key={size.id}>
//                   <td className="border border-gray-300 dark:border-neutral-600 px-4 py-2">
//                     {size.name}
//                   </td>
//                   <td className="border border-gray-300 dark:border-neutral-600 px-4 py-2">
//                     {size.quantity}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="text-center text-gray-500">
//             No sizes available for this color.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SizeByColor;
