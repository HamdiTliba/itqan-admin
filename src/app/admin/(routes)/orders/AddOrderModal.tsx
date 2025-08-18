// "use client";
// import Button from "@/components/Button";
// import Input from "@/components/Input";
// import useAllProducts from "@/reactQueryHook/useAllProducts";
// import { Product } from "@prisma/client";
// import { useQueryClient } from "@tanstack/react-query";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { ColorItem, Size } from "../products/AddProduct";
// import Back from "@/components/svgs/Back";
// import { addOrder } from "@/actions/orders/addOrder";
// export interface CartItem {
//   id: string;
//   title: string;
//   price: number;
//   promotionPrice?: number;
//   selectedColor: string;
//   selectedSize: string;
//   quantity: number;
//   image: string;
// }
// type SelectedColor = {
//   productId: string;
//   colorId: number | null;
//   sizeId: number | null;
//   hexName: string;
//   size: string;
// };
// const AddOrderModal = () => {
//   const [loading, setLoading] = useState(false);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [searchProduct, setSearchProduct] = useState("");
//   const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([]);
//   const [isProductList, setIsProductList] = useState(false);
//   const [selectedColor, setSelectedColor] = useState<SelectedColor>({
//     productId: "",
//     colorId: null,
//     sizeId: null,
//     hexName: "",
//     size: "",
//   });
//   const [isSizePresent, setIsSizePresent] = useState(false);

//   const { data: products, isFetching } = useAllProducts();
//   const pathname = usePathname();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const orderId = crypto.randomUUID();
//   const onSubmit = async () => {
//     setLoading(true);
//     const postOrderResponse = await addOrder({
//       fullName,
//       email,
//       address,
//       phone,
//       totalPrice: selectedProducts
//         .reduce((total, product) => total + product.price * product.quantity, 0)
//         .toString(),
//       orderProducts: selectedProducts.map((product) => ({
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         promotionPrice: product.promotionPrice as number | undefined,
//         quantity: product.quantity,
//         image: product.image,
//         selectedColor: product.selectedColor,
//         selectedSize: product.selectedSize,
//       })),
//       status: "EnAttente",
//     });

//     if (postOrderResponse) {
//       toast.success("Votre commande a été enregistrée avec succès!");
//       setLoading(false);
//       setSelectedProducts([]);
//       // setIsEmptyModal(false);
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//     } else {
//       toast.error(
//         "Une erreur est survenue lors de l'enregistrement de votre commande!"
//       );
//     }
//   };
//   console.log(selectedProducts);
//   console.log(selectedColor);
//   const filteredProducts = products?.filter((product) => {
//     const search = searchProduct.toLowerCase().replace(/\s+/g, "");
//     const matchProduct = product.name.toLowerCase().includes(search);
//     return matchProduct;
//   });
//   const addProduct = (prodctId: string, color: ColorItem) => {
//     setSelectedColor({
//       productId: prodctId,
//       colorId: color.id,
//       sizeId: null,
//       hexName: color.color.hexColor,
//       size: "",
//     });
//     setIsSizePresent(true);
//   };
//   const colorSizesById = (colorId: number | null) => {
//     const colorSize = products
//       ?.find((product) => product.colors.some((color) => color.id === colorId))
//       ?.colors.find((color) => color.id === colorId);
//     return colorSize;
//   };
//   console.log(colorSizesById(selectedColor.colorId));
//   console.log(selectedProducts);
//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="flex flex-col gap-3 mt-5 my-auto">
//       <Input
//         id="fullName"
//         label="Nom et Prénom"
//         register={register}
//         defaultValue={fullName}
//         {...register("fullName", {
//           required: "Le nom et prénom est requis",
//           minLength: {
//             value: 3,
//             message: "Le nom et prénom doivent être au minimum 3 caractères",
//           },
//           maxLength: {
//             value: 50,
//             message: "Le nom et prénom ne peut pas dépasser 50 caractères",
//           },
//           onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
//             setFullName(e.target.value),
//         })}
//         errors={errors}
//         className="pl-5 py-3 md:py-5"
//       />
//       <Input
//         id="email"
//         label="Email"
//         register={register}
//         defaultValue={email}
//         {...register("email", {
//           pattern: {
//             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//             message: "Veuillez saisir un email valide.",
//           },
//           onChange: (e) => setEmail(e.target.value),
//         })}
//         errors={errors}
//         className="pl-5 py-3 md:py-5"
//         type="email"
//       />
//       <Input
//         id="phone"
//         label="Numéro de téléphone"
//         defaultValue={phone}
//         register={register}
//         {...register("phone", {
//           required: "Le numéro de téléphone est obligatoire",
//           pattern: {
//             value: /^\d{8}$/,
//             message: "Veuillez saisir un numéro de téléphone valide.",
//           },
//           onChange: (e) => setPhone(e.target.value),
//         })}
//         errors={errors}
//         type="number"
//         className="pl-5 py-3 md:py-5"
//       />
//       <Input
//         id="address"
//         label="Adresse"
//         register={register}
//         defaultValue={address}
//         {...register("address", {
//           required: "L'adresse est obligatoire",
//           minLength: {
//             value: 5,
//             message: "L'adresse doit être au minimum 5 caractères",
//           },
//           maxLength: {
//             value: 100,
//             message: "L'adresse ne peut pas dépasser 100 caractères",
//           },
//           onChange: (e) => setAddress(e.target.value),
//         })}
//         errors={errors}
//         className="pl-5 py-3 md:py-5"
//       />
//       <div>
//         {isProductList ? (
//           <Input
//             id="searchProduct"
//             label="Chercher un produit"
//             register={register}
//             defaultValue={searchProduct}
//             {...register("searchProduct", {
//               onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
//                 setSearchProduct(e.target.value),
//             })}
//             errors={errors}
//             className="pl-5 py-3 md:py-5"
//           />
//         ) : (
//           <div
//             onClick={() => setIsProductList(true)}
//             className="w-full border dark:border-neutral-600 rounded-xl text-center font-bold text-lg py-3 cursor-pointer bg-neutral-100 dark:bg-neutral-700 shadow">
//             Ajouter une commande
//           </div>
//         )}
//         {isProductList && (
//           <div className="mt-2 space-y-2 border dark:border-neutral-600 rounded-xl shadow-md max-h-[500px] overflow-auto p-1">
//             {filteredProducts?.map((product: Product) => (
//               <div
//                 key={product.id}
//                 className="grid grid-cols-5 gap-2 items- border-b dark:border-neutral-600">
//                 <div className="relative flex w-full justify-center aspect-square col-span-1">
//                   <Image
//                     src={product.colors[0].images[0]}
//                     alt={product.name}
//                     fill
//                     className="object-contain"
//                   />
//                 </div>
//                 <div className="col-span-4">
//                   <h1>{product.name}</h1>
//                   <h2>
//                     {product.promotionPrice
//                       ? `${product.promotionPrice.toFixed(3)} dt`
//                       : `${product.price.toFixed(3)} dt`}
//                   </h2>
//                   <div className="flex flex-col mb-2">
//                     <div className="flex  justify-center w-full gap-2 mb-2">
//                       {product.colors.map((color: ColorItem) => (
//                         <div key={color.id} className="flex  gap-2">
//                           <div
//                             className={`size-8 rounded-full cursor-pointer transition-all ${
//                               color.id === selectedColor?.colorId &&
//                               selectedColor.hexName === color.color.hexColor &&
//                               "ring ring-sky-500"
//                             }`}
//                             style={{ background: `${color.color.hexColor}` }}
//                             onClick={() => addProduct(product.id, color)}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex justify-center gap-2">
//                       {isSizePresent &&
//                         product.colors.map((color) => {
//                           if (color.id !== selectedColor.colorId) return null; // Render only sizes of selected color

//                           return (
//                             color.id === colorSizesById(color.id)?.id && (
//                               <div
//                                 key={color.id}
//                                 className="flex justify-center  w-full gap-2">
//                                 {color.sizes.map((size, index) => (
//                                   <div
//                                     key={index}
//                                     className={`size-10 flex justify-center items-center rounded-lg hover:scale-105 transition-all bg-neutral-50 dark:bg-neutral-800 cursor-pointer text-xs ${
//                                       selectedColor.size === size.name &&
//                                       product.id === selectedColor.productId &&
//                                       selectedColor.hexName ===
//                                         color.color.hexColor &&
//                                       selectedColor.colorId === color.id
//                                         ? "ring-2 ring-sky-500"
//                                         : "border dark:border-neutral-600"
//                                     }`}
//                                     onClick={() => {
//                                       setSelectedColor((prev) => ({
//                                         ...prev,
//                                         productId: product.id,
//                                         colorId: color.id,
//                                         sizeId: size.id,
//                                         size: size.name,
//                                         hexName: color.color.hexColor,
//                                       }));
//                                       setSelectedProducts((prev) => [
//                                         {
//                                           id: product.id,
//                                           title: product.name,
//                                           price: product.price,
//                                           promotionPrice:
//                                             product.promotionPrice || undefined,
//                                           selectedColor: color.color.hexColor,
//                                           selectedSize: size.name,
//                                           quantity: 1,
//                                           image: color.images[0],
//                                         },
//                                       ]);
//                                     }}>
//                                     {size.name}
//                                   </div>
//                                 ))}
//                               </div>
//                             )
//                           );
//                         })}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <Button
//         label="Commander"
//         className="w-full "
//         black
//         widthFull
//         disabled={loading}
//         loading={loading}
//       />
//     </form>
//   );
// };

// export default AddOrderModal;
