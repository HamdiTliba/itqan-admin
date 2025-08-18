// "use client";

// import useAddProducts from "@/hooks/useAddProducts";
// import { Product, Size } from "@prisma/client";
// import { useForm } from "react-hook-form";
// import { blobImagesTypes, ColorItem, ProductFormValues } from "./AddProduct";
// import useCategories from "@/reactQueryHook/useCategories";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { Category } from "@/actions/categories/getAllCategories";
// import Input from "@/components/Input";
// import TextArea from "@/components/TextArea";
// import AddCategorySelect from "./AddCategorySelect ";
// import Link from "next/link";
// import Add from "@/components/svgs/Add";
// import Trash from "@/components/svgs/Trash";
// import Upload from "@/components/svgs/Upload";
// import Image from "next/image";
// import Sizes, { sizesData } from "@/components/Sizes";
// import Button from "@/components/Button";
// import { updateProduct } from "@/actions/products/updateProduct";
// import generateNumericId from "@/utils/generateNumericId";
// import { convertImagesToBlobs } from "@/utils/imagesToBlobs";
// interface EditProductFormProps {
//   product: Product;
// }
// const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
//   const [name, setName] = useState(product.name);
//   const [description, setDescription] = useState(product.description);
//   const [price, setPrice] = useState(product.price);
//   const [promotionPrice, setPromotionPrice] = useState(product.promotionPrice);
//   const [brand, setBrand] = useState(product.brand);
//   const [tags, setTags] = useState<string[]>(product.tags);
//   const { data: categories, isPending, isError } = useCategories();
//   const category = categories?.find((cat) => cat.id === product.categoryId);
//   const [selectedCategory, setSelectedCategory] = useState<
//     Category | undefined
//   >(category);
//   const [selectedColors, setSelectedColors] = useState<ColorItem[]>(
//     product.colors
//   );
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     reset,
//     clearErrors,
//     formState: { errors },
//   } = useForm<ProductFormValues>({
//     mode: "onBlur",
//     reValidateMode: "onChange",
//     defaultValues: {
//       name: name,
//       description: description,
//       price: price,
//       promotionPrice: promotionPrice,
//       brand: brand,
//       category: category,
//       status: false,
//       tags: tags,
//       colors: selectedColors,
//     },
//   });

//   const [blobImages, setBlobImages] = useState<blobImagesTypes[]>([]);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     imagesToBlobs();
//   }, []);
//   useEffect(() => {
//     setValue("colors", selectedColors);
//   }, [selectedColors, setValue]);
//   if (isError) return <p>Erreur lors du chargement des catégories</p>;
//   const handleImages = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     colorId: number
//   ) => {
//     const selectedFiles = e.target.files;
//     if (selectedFiles) {
//       const newImages = Array.from(selectedFiles).map((file) =>
//         URL.createObjectURL(file)
//       );
//       setBlobImages((prevColorImages) => {
//         const existingColor = prevColorImages.find(
//           (color) => color.colorId === colorId
//         );
//         if (existingColor) {
//           return prevColorImages.map((color) =>
//             color.colorId === colorId
//               ? { ...color, images: [...color.images, ...newImages] }
//               : color
//           );
//         } else {
//           return [...prevColorImages, { colorId, images: newImages }];
//         }
//       });
//     }
//   };

//   const blobImagesById = (colorId: number) => {
//     return blobImages.find((color) => color.colorId === colorId)?.images || [];
//   };
//   const removeBlobImage = (colorId: number, imageUrl: string) => {
//     setBlobImages((prevImages) => {
//       return prevImages.map((color) => {
//         if (color.colorId === colorId) {
//           return {
//             ...color,
//             images: color.images.filter((image) => image !== imageUrl),
//           };
//         }
//         return color;
//       });
//     });
//   };
//   const addColor = () => {
//     const newVariant: ColorItem = {
//       id: generateNumericId(),
//       color: { name: "", hexColor: "#000000" },
//       sizes: [],
//       images: [],
//       status: false,
//     };
//     setSelectedColors((prevColors) => [...prevColors, newVariant]);
//   };
//   const updateColor = (id: number, updatedColor: ColorItem) => {
//     setSelectedColors((prevColors) =>
//       prevColors.map((color) => (color.id === id ? updatedColor : color))
//     );
//   };
//   const addSizes = (colorId: number, newSize: Size) => {
//     setSelectedColors((prevColors) =>
//       prevColors.map((color) =>
//         color.id === colorId
//           ? {
//               ...color,
//               sizes: color.sizes.some((size) => size.id === newSize.id)
//                 ? color.sizes.filter((size) => size.id !== newSize.id) // Remove if it exists
//                 : [...color.sizes, newSize], // Add if it doesn't exist
//             }
//           : color
//       )
//     );
//   };

//   const handleSizeQuantity = (
//     index: number,
//     colorId: number,
//     quantity: number
//   ) => {
//     setSelectedColors((prevColors) =>
//       prevColors.map((color) =>
//         color.id === colorId
//           ? {
//               ...color,
//               sizes: color.sizes.map((size) =>
//                 size.id === index ? { ...size, quantity } : size
//               ),
//             }
//           : color
//       )
//     );
//   };
//   const colors = watch("colors");

//   const imagesToBlobs = async () => {
//     try {
//       const selectedColorsImages = selectedColors.map(({ id, images }) => ({
//         id,
//         images,
//       }));

//       const images = await convertImagesToBlobs(selectedColorsImages);

//       console.log("Converted images:", images);

//       setBlobImages(images);
//     } catch (error) {
//       console.error("Error converting images to blobs:", error);
//     }
//   };
//   console.log(imagesToBlobs);
//   console.log(selectedColors);
//   console.log(blobImages);
//   const onSubmit = async (data: ProductFormValues) => {
//     console.log("Data:", data); // Debugging: Log data
//     setLoading(true);

//     try {
//       console.log("Initial blobImages:", blobImages); // Debugging: Log blobImages
//       // Debugging: Log data.colors

//       const uploadedImages = await Promise.all(
//         blobImages.map(async (blobItem) => {
//           const { colorId, images } = blobItem;

//           const imageUrls = await Promise.all(
//             images.map(async (imageUrl) => {
//               try {
//                 const formData = new FormData();
//                 const blob = await fetch(imageUrl).then((res) => res.blob());
//                 formData.append("file", blob);
//                 formData.append("upload_preset", "store-exemple");
//                 formData.append("folder", "products/addProducts");

//                 const response = await fetch(
//                   "https://api.cloudinary.com/v1_1/dqna57kpy/image/upload",
//                   {
//                     method: "POST",
//                     body: formData,
//                   }
//                 );

//                 if (!response.ok) {
//                   throw new Error(
//                     `Image upload failed for colorId: ${colorId}`
//                   );
//                 }

//                 const result = await response.json();
//                 if (!result.secure_url) {
//                   console.error("Failed Cloudinary upload result:", result);
//                   throw new Error("Invalid Cloudinary upload response");
//                 }
//                 console.log(result);
//                 return result.secure_url;
//               } catch (error) {
//                 console.error(
//                   `Error uploading image for colorId ${colorId}:`,
//                   error
//                 );
//                 throw error;
//               }
//             })
//           );

//           console.log("Uploaded image URLs for colorId:", colorId, imageUrls);

//           return {
//             colorId,
//             images: imageUrls,
//           };
//         })
//       );

//       console.log("UploadedImages array:", uploadedImages); // Debugging: Log uploadedImages

//       const finalData = {
//         ...data,
//         category: selectedCategory?.id as string,
//         price: data.price && parseFloat(data.price.toString()), // Convert price to Float
//         promotionPrice: data.promotionPrice
//           ? parseFloat(data.promotionPrice.toString())
//           : null,
//         colors: selectedColors.map((color) => {
//           const uploadedColor = uploadedImages.find(
//             (item) => item.colorId === color.id
//           );
//           if (!uploadedColor) {
//             console.warn(`No uploaded images found for colorId: ${color.id}`);
//           }
//           return {
//             ...color,
//             images: uploadedColor?.images as string[],
//           };
//         }),
//       };

//       console.log("Final product data:", finalData);
//       const addProductResponse = await updateProduct(product.id, {
//         ...finalData,
//         category: selectedCategory as Category | null,
//       });
//       if (addProductResponse) {
//         // reset();
//         // resetData();
//         queryClient.invalidateQueries({ queryKey: ["products"] });
//         toast.success("Produit mis à jour avec succès");
//       }
//     } catch (error) {
//       console.error("Error uploading images or submitting product:", error);
//       toast.error("Une erreur s'est produite lors de l'ajout du produit");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryClick = (category: Category) => {
//     setSelectedCategory(category);
//   };

//   const removeVariant = (id: number) => {
//     setSelectedColors((prevColors) =>
//       prevColors.filter((color) => color.id !== id)
//     );
//   };

//   const selectedColorById = (selectedColorId: number) => {
//     return selectedColors.find((color) => color.id === selectedColorId);
//   };
//   console.log("SelectedColors:", selectedColors);
//   const isValid =
//     name &&
//     price &&
//     selectedColors.map((color) => color.id === selectedColorById(1)?.id)
//       .length > 0;
//   return (
//     <div className="mt-10  rounded-lg shadow-lg p-2">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col gap-2 h-full">
//         <Input
//           id="name"
//           label="Nom du produit"
//           register={register}
//           defaultValue={product.name}
//           {...register("name", {
//             required: "Le nom du produit est obligatoire",
//             minLength: {
//               value: 3,
//               message: "Le nom du produit doit contenir au moins 3 caractères",
//             },
//             onChange: (e) => setName(e.target.value),
//           })}
//           errors={errors}
//         />
//         <TextArea
//           id="description"
//           label="Description du produit"
//           register={register}
//           defaultValue={product.description}
//           {...register("description", {
//             required: "La description du produit est obligatoire",
//             minLength: {
//               value: 20,
//               message: "La description doit contenir au moins 20 caractères",
//             },
//             onChange: (e) => setDescription(e.target.value),
//           })}
//           errors={errors}
//           className="rounded-xl"
//         />
//         <Input
//           id="price"
//           label="Prix du produit"
//           register={register}
//           defaultValue={product.price}
//           {...register("price", {
//             required: "Le prix du produit est obligatoire",
//             pattern: {
//               value: /^[0-9]+(\.[0-9]{1,2})?$/,
//               message: "Le prix doit être un nombre",
//             },
//             onChange: (e) => setPrice(e.target.value),
//           })}
//           type="number"
//           errors={errors}
//         />
//         <Input
//           id="promotionPrice"
//           label="Prix avec la promotion du produit"
//           register={register}
//           defaultValue={product.promotionPrice}
//           {...register("promotionPrice", {
//             pattern: {
//               value: /^[0-9]+(\.[0-9]{1,2})?$/,
//               message: "Le prix doit être un nombre",
//             },
//             onChange: (e) => setPromotionPrice(e.target.value),
//           })}
//           type="number"
//           errors={errors}
//         />
//         <Input
//           id="brand"
//           label="Brand du produit"
//           register={register}
//           defaultValue={product.brand}
//           {...register("brand", {
//             minLength: {
//               value: 3,
//               message:
//                 "Le brand du produit doit contenir au moins 3 caractères",
//             },
//             onChange: (e) => setBrand(e.target.value),
//           })}
//           errors={errors}
//         />

//         {/* Categories Section */}
//         <div className="flex flex-wrap gap-2 w-full justify-center items-center">
//           {categories ? (
//             categories.map((category) => (
//               <AddCategorySelect
//                 key={category.id}
//                 category={category}
//                 selectedCategory={selectedCategory as Category | null}
//                 onClick={() => handleCategoryClick(category)}
//               />
//             ))
//           ) : (
//             <div>
//               <p className="text-sm font-semibold">
//                 {" "}
//                 Pas de categories disponibles
//               </p>
//               <Link
//                 href="/admin/categories"
//                 className="flex justify-center items-center px-4 py-2 text-base gap-1 border-[1px] font-semibold  rounded-full bg-neutral-50 hover:bg-white dark:border-neutral-600 dark:bg-neutral-800 dark:hover:bg-black transition-all cursor-pointer">
//                 <Add className="size-6" /> Ajouter categorie
//               </Link>
//             </div>
//           )}
//         </div>
//         <div className="flex justify-center items-center w-full gap-1">
//           <Input
//             id={`tags.${0}`}
//             label="Tag 1"
//             register={register}
//             defaultValue={product.tags[0] || ""}
//             {...register(`tags.${0}`, {
//               onChange: (e) => {
//                 const updatedTags = [...tags];
//                 updatedTags[0] = e.target.value; // Update the first tag
//                 setTags(updatedTags);
//               },
//             })}
//             errors={errors}
//             smallPad
//             className=""
//           />
//           <Input
//             id={`tags.${1}`}
//             label="Tag 2"
//             register={register}
//             defaultValue={product.tags[1] || ""}
//             {...register(`tags.${1}`, {
//               onChange: (e) => {
//                 const updatedTags = [...tags];
//                 updatedTags[1] = e.target.value; // Update the second tag
//                 setTags(updatedTags);
//               },
//             })}
//             errors={errors}
//             smallPad
//             className=""
//           />
//           <Input
//             id={`tags.${2}`}
//             label="Tag 3"
//             register={register}
//             defaultValue={product.tags[2] || ""}
//             {...register(`tags.${2}`, {
//               onChange: (e) => {
//                 const updatedTags = [...tags];
//                 updatedTags[2] = e.target.value; // Update the third tag
//                 setTags(updatedTags);
//               },
//             })}
//             errors={errors}
//             smallPad
//             className=""
//           />
//         </div>

//         {/* Variants Section */}
//         <div>
//           <h2 className="font-bold">Couleurs</h2>
//           <div>
//             {selectedColors.map((variant) => (
//               <div key={variant.id} className="relative space-y-3">
//                 <button
//                   onClick={() => removeVariant(variant.id)}
//                   className="absolute top-2 right-0 border dark:border-neutral-600 pb-1 size-8 bg-white m-auto rounded-md flex justify-center items-center text-3xl font-semibold text-red-500 z-50 hover:scale-110 transition">
//                   <Trash className="size-5 inline" />
//                 </button>
//                 <div className="flex justify-center items-center gap-2">
//                   <Input
//                     id={`colors.${variant.id}.color.name`}
//                     label="Nom de la couleur"
//                     defaultValue={selectedColorById(variant.id)?.color.name}
//                     register={register}
//                     {...register(`colors.${variant.id}.color.name`, {
//                       onChange: (e) =>
//                         updateColor(variant.id, {
//                           ...variant,
//                           color: {
//                             ...variant.color,
//                             name: e.target.value,
//                           },
//                         }),
//                     })}
//                     errors={errors}
//                     smallPad
//                   />
//                   <div className="size-[36px] aspect-square cursor-pointer">
//                     <Input
//                       type="color"
//                       id={`colors.${variant.id}.color.hexColor`}
//                       label="Color Hex"
//                       defaultValue={
//                         selectedColorById(variant.id)?.color.hexColor
//                       }
//                       register={register}
//                       {...register(`colors.${variant.id}.color.hexColor`, {
//                         onChange: (e) =>
//                           updateColor(variant.id, {
//                             ...variant,
//                             color: {
//                               ...variant.color,
//                               hexColor: e.target.value,
//                             },
//                           }),
//                       })}
//                       errors={errors}
//                       noPadding
//                       className="size-[36px] rounded-lg cursor-pointer hover:scale-105 transition-all border-none"
//                     />
//                   </div>
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <Input
//                     id={`colors.${variant.id}`}
//                     label="Votre image"
//                     register={register}
//                     defaultValue={""}
//                     {...register(`colors.${variant.id}`, {
//                       onChange: (e) => handleImages(e, variant.id),
//                     })}
//                     errors={errors}
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     isHidden
//                   />
//                   <label htmlFor={`colors.${variant.id}`} className="w-full">
//                     <Upload
//                       className="w-full h-[75px] aspect-square hover:bg-white transition-all bg-neutral-50 rounded-xl dark:bg-neutral-800 dark:hover:bg-black"
//                       strokeWidth={0.2}
//                       id={`colors.${variant.id}`}
//                       errors={errors}
//                     />
//                   </label>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {blobImagesById(variant.id).map((imageUrl, index) => (
//                       <div key={index} className="relative">
//                         <Image
//                           src={imageUrl}
//                           alt={`Image for color ${variant.color.name}`}
//                           width={75}
//                           height={75}
//                           loading="eager"
//                           className="rounded-md"
//                         />

//                         <Trash
//                           className="absolute size-6 top-0 right-0 bg-white dark:bg-black rounded border dark:border-neutral-600 hover:scale-110 transition-transform  cursor-pointer"
//                           onClick={() => removeBlobImage(variant.id, imageUrl)}
//                         />
//                       </div>
//                     ))}
//                     {/* {selectedColorById(variant.id)?.images.map(
//                       (imageUrl, index) => (
//                         <div
//                           key={index}
//                           className="relative ring-[1px] ring-red-600"
//                         >
//                           <Image
//                             src={imageUrl}
//                             alt={`Image for color ${variant.color.name}`}
//                             width={75}
//                             height={75}
//                             loading="eager"
//                             className="rounded-md"
//                           />

//                           <Trash
//                             className="absolute size-6 top-0 right-0 bg-white rounded border hover:scale-110 transition-transform  cursor-pointer"
//                             onClick={() =>
//                               remove(
//                                 product.id,
//                                 variant.id,
//                                 imageUrl
//                               )
//                             }
//                           />
//                         </div>
//                       )
//                     )} */}
//                   </div>
//                 </div>

//                 {/* Size Section */}
//                 <div className="grid grid-cols-7 gap-2 w-full place-content-center">
//                   {sizesData.map((item) => (
//                     <Sizes
//                       sizes={item}
//                       key={item.id}
//                       selectedSize={selectedColorById(variant.id)?.sizes}
//                       onClick={() => addSizes(variant.id, item)}
//                       register={register}
//                       errors={errors}
//                       id={variant.id}
//                       index={item.id}
//                       quanityDefaultValue={
//                         selectedColorById(variant.id)?.sizes.find(
//                           (size) => size.id === item.id
//                         )?.quantity || null
//                       }
//                       onQuantityChange={(e) =>
//                         handleSizeQuantity(item.id, variant.id, Number(e))
//                       }
//                     />
//                   ))}
//                 </div>
//                 {colors.length > 1 && (
//                   <hr className="border-neutral-400 dark:border-neutral-600" />
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="w-full flex justify-start mt-2">
//             <h1
//               className="text-xs font-semibold border dark:border-neutral-600 px-2 py-1 rounded-full mb-1 flex justify-center items-center gap-1 cursor-pointer bg-neutral-100 hover:bg-white"
//               onClick={addColor}>
//               <Add className="size-5 inline" /> Ajouter Couleur
//             </h1>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <Button
//           label="Mettre à jour le produit"
//           className="h-10"
//           type="submit"
//           black
//           widthFull
//           disabled={!isValid}
//           loading={loading}
//         />
//       </form>
//     </div>
//   );
// };

// export default EditProductForm;
