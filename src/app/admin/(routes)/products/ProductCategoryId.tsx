// "use client";
// import useCategories from "@/reactQueryHook/useCategories";
// import Image from "next/image";
// import Link from "next/link";

// interface ProductCategoryIdProps {
//   categoryId: string;
// }
// const ProductCategoryId: React.FC<ProductCategoryIdProps> = ({
//   categoryId,
// }) => {
//   const { data: categories } = useCategories();
//   const category = categories?.find((cat) => cat.id === categoryId);

//   if (!category) return;
//   return (
//     <div className="flex flex-col m-auto w-full justify-center">
//       <Link
//         href={`https://store-exemple.vercel.app/catalogues/${category.name.toLocaleLowerCase()}`}
//         className="relative w-[65%] aspect-square flex justify-center m-auto">
//         <Image
//           src={category.image}
//           alt=""
//           fill
//           className="object-cover stillShadow cursor-pointer"
//         />
//       </Link>
//       <div className="text-center font-semibold mt-1 text-sm">
//         {category.name}
//       </div>
//     </div>
//   );
// };

// export default ProductCategoryId;
