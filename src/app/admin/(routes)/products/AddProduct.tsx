"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { useForm } from "react-hook-form";
import AddCategorySelect from "./AddCategorySelect ";
import Add from "@/components/svgs/Add";
import Image from "next/image";
import Upload from "@/components/svgs/Upload";
import Trash from "@/components/svgs/Trash";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Product } from "@/db/schema";
import { addProduct } from "@/actions/products/addProduct";
import useAddProducts from "@/hooks/useAddProducts";
import generateNumericId from "@/utils/generateNumericId";
import QuillEditor from "@/components/QuillEditor";
const categories = [
  {
    id: "1",
    category: "Table",
    image:
      "https://www.westelm.co.uk/site/WE/Product%20Images/cannellini-coffee-table-h12195-202350-0161-cannellini-coffee-table-47-1-z.jpg?resizeid=64&resizeh=1200&resizew=1200",
  },
  {
    id: "2",
    category: "Table basse",
    image: "/coffeeTable.png",
  },
  {
    id: "3",
    category: "Table de nuit",
    image: "/nightstand.png",
  },
  {
    id: "4",
    category: "Commode",
    image: "/commode.png",
  },
];
export type Category = (typeof categories)[number];
export type BlobImagesTypes = {
  colorId: string;
  sizeId: string;
  images: string[];
  fileImages: File[];
};
export type BlobDimensionImageTypes = {
  colorId: string;
  sizeId: string;
  dimensionImage: string;
  fileDimensionImage: File;
};
export type ImagePreviewTypes = {
  colorId: string;
  texture: string;
  fileTexture: File;
};
export type MaterialQuillTypes = {
  colorId: string;
  materials: string;
};
export type DescriptionsQuillTypes = {
  colorId: string;
  descriptions: string;
};
export type DimensionsQuillTypes = {
  colorId: string;
  sizeId: string;
  dimensions: string;
};
const AddProduct = () => {
  const {
    productName,
    setProductName,
    book,
    setBook,
    selectedCategory,
    setSelectedCategory,
    selectedColors,
    setSelectedColors,
    addColor,
    updateColor,
    removeColor,
    addSizes,
    updateSize,
    removeSize,
  } = useAddProducts();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Product>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      book,
      category: selectedCategory?.category,
      colors: selectedColors,
    },
  });

  const [blobImages, setBlobImages] = useState<BlobImagesTypes[]>([]);
  const [blobDimensionImage, setBlobDimensionImage] = useState<
    BlobDimensionImageTypes[]
  >([]);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<
    ImagePreviewTypes[] | []
  >([]);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  // useEffect(() => {
  //   setValue("colors", selectedColors);
  // }, [selectedColors, setValue]);
  useEffect(() => {
    return () => {
      // Clean up texture preview URLs
      imagePreviewUrl.forEach(({ texture }) => {
        if (texture.startsWith("blob:")) {
          URL.revokeObjectURL(texture);
        }
      });
      // Clean up dimension image URLs
      blobDimensionImage.forEach(({ dimensionImage }) => {
        if (dimensionImage.startsWith("blob:")) {
          URL.revokeObjectURL(dimensionImage);
        }
      });
      // Clean up size image preview URLs
      blobImages.forEach(({ images }) => {
        images.forEach((img) => {
          if (img.startsWith("blob:")) {
            URL.revokeObjectURL(img);
          }
        });
      });
    };
  }, [imagePreviewUrl, blobImages, blobDimensionImage]);
  const handleTexture = (
    e: React.ChangeEvent<HTMLInputElement>,
    colorId: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      console.log("imageFile:", file);
      // setImageFile(file);

      // Update selectedColors with the new texture
      const updatedColors = selectedColors.map((color) =>
        color.id === colorId ? { ...color, texture: imageUrl } : color
      );
      setSelectedColors(updatedColors);

      // Update imagePreviewUrl state
      setImagePreviewUrl((prev) => {
        // Remove existing entry for this color if it exists
        const filtered = prev.filter((image) => image.colorId !== colorId);
        // Add new preview URL
        return [...filtered, { colorId, texture: imageUrl, fileTexture: file }];
      });
    }
  };
  const handleDimensionImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    colorId: string,
    sizeId: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      console.log("imageFile:", file);
      // setDimensionImageFile(file);

      const color = selectedColors.find((c) => c.id === colorId);
      if (!color) return;

      const size = color.sizes.find((s) => s.id === sizeId);
      if (!size) return;

      const updatedSize = {
        ...size,
        dimensionImage: imageUrl,
      };
      console.log("updated size:", updatedSize);
      updateSize(colorId, sizeId, updatedSize);

      setBlobDimensionImage((prevImage) => {
        const existingColor = prevImage.find(
          (color) => color.colorId === colorId && color.sizeId === sizeId
        );

        if (existingColor) {
          return prevImage.map((color) =>
            color.colorId === colorId && color.sizeId === sizeId
              ? {
                  ...color,
                  dimensionImage: imageUrl,
                  fileDimensionImage: file,
                }
              : color
          );
        } else {
          return [
            ...prevImage,
            {
              colorId,
              sizeId,
              dimensionImage: imageUrl,
              fileDimensionImage: file,
            },
          ];
        }
      });
    }
  };
  console.log("blobDimensionImage", blobDimensionImage);
  // useEffect(() => {
  //   setSelectedColors([]);
  // }, [setSelectedColors]);
  const handleSizeImages = (
    e: React.ChangeEvent<HTMLInputElement>,
    colorId: string,
    sizeId: string
  ) => {
    const files = e.target.files;
    if (!files) return;

    const imageURLs = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    const color = selectedColors.find((c) => c.id === colorId);
    if (!color) return;

    const size = color.sizes.find((s) => s.id === sizeId);
    if (!size) return;

    const updatedSize = {
      ...size,
      images: [...(size.images || []), ...imageURLs],
    };
    console.log("updated size:", updatedSize);
    updateSize(colorId, sizeId, updatedSize);
    setBlobImages((prevImages) => {
      const fileArray = Array.from(files);

      const existingColor = prevImages.find(
        (color) => color.colorId === colorId && color.sizeId === sizeId
      );

      if (existingColor) {
        return prevImages.map((color) =>
          color.colorId === colorId && color.sizeId === sizeId
            ? {
                ...color,
                images: [...color.images, ...imageURLs],
                fileImages: [...color.fileImages, ...fileArray],
              }
            : color
        );
      } else {
        return [
          ...prevImages,
          {
            colorId,
            sizeId,
            images: imageURLs,
            fileImages: fileArray,
          },
        ];
      }
    });
  };
  const colors = watch("colors");
  const blobImagesById = (colorId: string, sizeId: string) => {
    return (
      selectedColors
        .find((color) => color.id === colorId)
        ?.sizes.find((size) => size.id === sizeId)?.images || []
    );
  };
  console.log("Blob images:", blobImages);
  console.log("imagePreviewUrl:", imagePreviewUrl);
  const removeSizeImage = (
    colorId: string,
    sizeId: string,
    imageUrl: string
  ) => {
    const updatedColors = selectedColors.map((color) => {
      if (color.id === colorId) {
        const updatedSizes = color.sizes.map((size) => {
          if (size.id === sizeId) {
            return {
              ...size,
              images: size.images.filter((img) => img !== imageUrl),
            };
          }
          return size;
        });
        return { ...color, sizes: updatedSizes };
      }
      return color;
    });
    setSelectedColors(updatedColors);
  };
  const removeDimensionImage = (colorId: string, sizeId: string) => {
    const updatedColors = selectedColors.map((color) => {
      if (color.id === colorId) {
        const updatedSizes = color.sizes.map((size) => {
          if (size.id === sizeId) {
            return {
              ...size,
              dimensionImage: "",
            };
          }
          return size;
        });
        return { ...color, sizes: updatedSizes };
      }
      return color;
    });
    setSelectedColors(updatedColors);
  };
  const onSubmit = async (data: Product) => {
    console.log("Submitting product...");

    setLoading(true);

    try {
      // Upload textures from selectedColors instead of imagePreviewUrl
      const uploadedTextures = await Promise.all(
        imagePreviewUrl.map(async (color) => {
          // If no fileTexture, just skip
          if (!color.fileTexture) {
            return { colorId: color.colorId, texture: "" };
          }

          try {
            const formData = new FormData();
            formData.append("file", color.fileTexture);
            formData.append("upload_preset", "Itqan-store");
            formData.append("folder", "Itqan/textures");

            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dqna57kpy/image/upload",
              { method: "POST", body: formData }
            );

            if (!response.ok) throw new Error("Texture upload failed");

            const result = await response.json();
            return { colorId: color.colorId, texture: result.secure_url };
          } catch (error) {
            console.error(
              `Error uploading texture for color ${color.colorId}:`,
              error
            );
            return { colorId: color.colorId, texture: "" };
          }
        })
      );
      console.log("uploadedTextures", uploadedTextures);

      const uploadedDimensionImage = await Promise.all(
        blobDimensionImage.map(async (color) => {
          if (!color.dimensionImage)
            return {
              colorId: color.colorId,
              sizeId: color.sizeId,
              dimensionImage: "",
              fileDimensionImage: "",
            };

          try {
            const formData = new FormData();
            // const blob = await fetch(color.fileTexture).then((res) =>
            //   res.blob()
            // );

            formData.append("file", color.fileDimensionImage);
            formData.append("upload_preset", "Itqan-store");
            formData.append("folder", "Itqan/dimension");

            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dqna57kpy/image/upload",
              { method: "POST", body: formData }
            );

            if (!response.ok) throw new Error("Texture upload failed");

            const result = await response.json();
            return {
              colorId: color.colorId,
              sizeId: color.sizeId,
              dimensionImage: result.secure_url,
            };
          } catch (error) {
            console.error(
              `Error uploading texture for color ${color.colorId}:`,
              error
            );
            return {
              colorId: color.colorId,
              sizeId: color.sizeId,
              dimensionImage: "",
              fileDimensionImage: "",
            };
          }
        })
      );

      // Upload size images
      const uploadedSizeImages = await Promise.all(
        blobImages.map(async (blobItem) => {
          const { colorId, sizeId, fileImages } = blobItem;

          const imageUrls = await Promise.all(
            fileImages.map(async (imageUrl) => {
              try {
                const formData = new FormData();
                // const blob = await fetch(imageUrl).then((res) => res.blob());
                formData.append("file", imageUrl);
                formData.append("upload_preset", "Itqan-store");
                formData.append("folder", "Itqan/products");

                const response = await fetch(
                  "https://api.cloudinary.com/v1_1/dqna57kpy/image/upload",
                  { method: "POST", body: formData }
                );

                if (!response.ok) throw new Error("Image upload failed");
                return (await response.json()).secure_url;
              } catch (error) {
                console.error(`Error uploading image:`, error);
                return;
              }
            })
          );

          return {
            colorId,
            sizeId,
            images: imageUrls,
          };
        })
      );

      // Prepare final data structure
      const productData = {
        book: data.book,
        category: selectedCategory?.category,
        productName: data.productName,
        colors: selectedColors.map((color) => ({
          id: color.id,
          color: color.color,
          hex: color.hex,
          description: color.description,
          status: true,
          name: color.name,
          materials: color.materials,
          texture:
            uploadedTextures.find((t) => t.colorId === color.id)?.texture || "",
          sizes: color.sizes.map((size) => ({
            id: size.id,
            width: size.width,
            height: size.height,
            length: size.length,
            price: size.price,
            dimensions: size.dimensions,
            dimensionImage:
              uploadedDimensionImage.find(
                (d) => d.colorId === color.id && d.sizeId === size.id
              )?.dimensionImage || "",
            promotionPrice: size.promotionPrice,
            images:
              uploadedSizeImages.find(
                (img) => img.colorId === color.id && img.sizeId === size.id
              )?.images || [],
          })),
        })),
      };

      console.log("Final product data:", productData);

      // Submit to backend
      const result = await addProduct(productData);

      if (result) {
        toast.success("Product added successfully");
        queryClient.invalidateQueries({ queryKey: ["products"] });
        // router.push("/admin/products");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      throw new Error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const addVariant = () => {
    addColor();
  };

  const removeVariant = (id: string) => {
    removeColor(id);
  };
  console.log("selectedColorss", selectedColors);
  // const selectedColorById = (selectedColorId: string) => {
  //   return selectedColors.find((color) => color.id === selectedColorId);
  // };
  const isValid = productName && selectedCategory && selectedColors.length > 0;
  console.log(blobImages);
  console.log("colors", colors);
  return (
    <div className="mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 h-full">
        <Input
          id={`productName`}
          label="Nom du produit"
          defaultValue={productName}
          register={register}
          {...register(`productName`, {
            onChange: (e) => setProductName(e.target.value),
          })}
          errors={errors}
          smallPad
        />
        <TextArea
          id="book"
          label="book du produit"
          register={register}
          defaultValue={book}
          {...register("book", {
            onChange: (e) => setBook(e.target.value),
          })}
          errors={errors}
          className="rounded-xl"
        />

        {/* Categories Section */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 w-full justify-center items-center">
          {categories ? (
            categories.map((category) => (
              <AddCategorySelect
                key={category.id}
                category={category}
                isSelected={selectedCategory?.id === category.id}
                onClick={() => handleCategoryClick(category)}
              />
            ))
          ) : (
            <div>
              <p className="text-sm font-semibold">
                {" "}
                Pas de categories disponibles
              </p>
              <Link
                href="/admin/categories"
                className="flex justify-center items-center px-4 py-2 text-base gap-1 border-[1px]  font-semibold  rounded-full bg-neutral-50 hover:bg-white dark:bg-neutral-800 dark:hover:bg-black dark:border-neutral-600 transition-all cursor-pointer">
                <Add className="size-6" /> Ajouter categorie
              </Link>
            </div>
          )}
        </div>

        {/* Variants Section */}
        <div>
          <h4 className="font-bold">Couleurs</h4>
          <div className="bg-cyan-50">
            {selectedColors.map((variant, index) => (
              <div key={variant.id} className="relative space-y-3">
                <button
                  type="button"
                  className="absolute right-2 top-2 text-xs font-semibold border border-red-600 dark:border-neutral-600  rounded-lg mb-1 flex justify-center items-center gap-1 cursor-pointer text-red-600  "
                  onClick={() => removeVariant(variant.id)}>
                  <Trash className="w-6 inline p-1" />
                </button>
                <div className="space-y-2 ">
                  <div className="w-[90%]">
                    {" "}
                    <Input
                      id={`colors.${index}.name`}
                      label="Nom du couleur"
                      register={register}
                      defaultValue={variant.name}
                      {...register(`colors.${index}.name`, {
                        required: "Le nom du produit est obligatoire",
                        minLength: {
                          value: 3,
                          message:
                            "Le nom du produit doit contenir au moins 3 caractères",
                        },
                        onChange: (value) =>
                          updateColor(variant.id, {
                            ...variant,
                            name: value.target.value,
                          }),
                      })}
                      className=""
                      widthfull
                      errors={errors}
                    />
                  </div>
                  <div className="">
                    <h4 className="font-bold">Matériels</h4>
                    <QuillEditor
                      value={variant.materials ?? ""}
                      onChange={(html) => {
                        updateColor(variant.id, {
                          ...variant,
                          materials: html,
                        }); // patch only
                        setValue(`colors.${index}.materials`, html); // optional RHF mirror
                      }}
                    />
                    <h4 className="text-lg font-bold mb-2">Preview:</h4>
                    <div className=" p-2 border rounded min-h-[200px]">
                      <div
                        className="q1-editor"
                        dangerouslySetInnerHTML={{ __html: variant.materials }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Input
                    id={`colors.${index}.color`}
                    label="Nom de la couleur"
                    defaultValue={variant.color}
                    register={register}
                    {...register(`colors.${index}.color`, {
                      onChange: (e) =>
                        updateColor(variant.id, {
                          ...variant,
                          color: e.target.value,
                        }),
                    })}
                    errors={errors}
                    smallPad
                  />
                  <div className="size-[36px] aspect-square cursor-pointer">
                    <Input
                      type="color"
                      id={`colors.${index}.hex`}
                      label="Color Hex"
                      defaultValue={variant.hex}
                      register={register}
                      {...register(`colors.${index}.hex`, {
                        onChange: (e) =>
                          updateColor(variant.id, {
                            ...variant,
                            hex: e.target.value,
                          }),
                      })}
                      errors={errors}
                      noPadding
                      className="size-[36px] rounded-lg cursor-pointer hover:scale-105 transition-all border-none"
                    />
                  </div>
                </div>

                {/* Image Texture */}
                <div>
                  <Input
                    id={`colors.${index}.texture`}
                    label="Votre image"
                    defaultValue={variant.texture}
                    register={register}
                    {...register(`colors.${index}.texture`, {
                      onChange: (e) => handleTexture(e, variant.id),
                    })}
                    errors={errors}
                    type="file"
                    accept="image/*"
                    isHidden
                  />
                  <label htmlFor={`colors.${index}.texture`} className="w-full">
                    <h4 className="font-bold">Texture</h4>
                    <Upload
                      className="w-full h-[75px] aspect-square hover:bg-white transition-all bg-neutral-50 rounded-xl dark:bg-neutral-800 dark:hover:bg-black"
                      strokeWidth={0.2}
                      id={`image`}
                      errors={errors}
                    />
                  </label>
                  {variant.texture && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={variant.texture}
                          alt={`texture-preview-${variant.id}`}
                          fill
                          className="rounded-md border object-contain"
                        />
                        <Trash
                          className="absolute size-8 p-1 top-0 right-0 bg-white dark:bg-black rounded border border-neutral-300 dark:border-neutral-600 hover:scale-110 transition-transform cursor-pointer"
                          onClick={() => {
                            // Remove the texture
                            const updatedColors = selectedColors.map((color) =>
                              color.id === variant.id
                                ? { ...color, texture: "" }
                                : color
                            );
                            setSelectedColors(updatedColors);

                            // Remove from preview URLs
                            setImagePreviewUrl((prev) =>
                              prev.filter((img) => img.colorId !== variant.id)
                            );

                            // Clean up the URL
                            URL.revokeObjectURL(variant.texture!);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="">
                  <h4 className="font-bold">Descriptions</h4>
                  <QuillEditor
                    value={variant.description ?? ""}
                    onChange={(html) => {
                      // Update Zustand (merge only this field)
                      updateColor(variant.id, {
                        ...variant,
                        description: html,
                      });
                      setValue(`colors.${index}.description`, html);
                    }}
                  />
                  <h4 className="text-lg font-bold mb-2">Preview:</h4>
                  <div className=" p-2 border rounded min-h-[200px]">
                    <div
                      className="q1-editor"
                      dangerouslySetInnerHTML={{ __html: variant.description }}
                    />
                  </div>
                </div>
                <div className="bg-pink-50">
                  {" "}
                  {variant.sizes?.map((size) => (
                    <div key={size.id} className="mt-2 ">
                      <div className="grid grid-cols-3 gap-2 pb-2">
                        <Input
                          id={`colors.${parseInt(variant.id)}.sizes.${parseInt(
                            size.id
                          )}.width`}
                          label="Width (cm)"
                          defaultValue={size.width}
                          register={register}
                          {...register(
                            `colors.${parseInt(variant.id)}.sizes.${parseInt(
                              size.id
                            )}.width`,
                            {
                              onChange: (e) =>
                                updateSize(variant.id, size.id, {
                                  ...size,
                                  width: e.target.value,
                                }),
                            }
                          )}
                          errors={errors}
                        />
                        <Input
                          id={`colors.${parseInt(variant.id)}.sizes.${parseInt(
                            size.id
                          )}.length`}
                          label="Length (cm)"
                          defaultValue={size.length}
                          register={register}
                          {...register(
                            `colors.${parseInt(variant.id)}.sizes.${parseInt(
                              size.id
                            )}.length`,
                            {
                              onChange: (e) =>
                                updateSize(variant.id, size.id, {
                                  ...size,
                                  length: e.target.value,
                                }),
                            }
                          )}
                          errors={errors}
                        />
                        <Input
                          id={`colors.${parseInt(variant.id)}.sizes.${parseInt(
                            size.id
                          )}.height`}
                          label="Height (cm)"
                          defaultValue={size.height}
                          register={register}
                          {...register(
                            `colors.${parseInt(variant.id)}.sizes.${parseInt(
                              size.id
                            )}.height`,
                            {
                              onChange: (e) =>
                                updateSize(variant.id, size.id, {
                                  ...size,
                                  height: e.target.value,
                                }),
                            }
                          )}
                          errors={errors}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 pb-2">
                        <Input
                          id={`colors.${parseInt(variant.id)}.sizes.${parseInt(
                            size.id
                          )}.price`}
                          label="Price"
                          defaultValue={size.price}
                          register={register}
                          {...register(
                            `colors.${parseInt(variant.id)}.sizes.${parseInt(
                              size.id
                            )}.price`,
                            {
                              onChange: (e) =>
                                updateSize(variant.id, size.id, {
                                  ...size,
                                  price: e.target.value,
                                }),
                            }
                          )}
                          errors={errors}
                        />
                        <Input
                          id={`colors.${parseInt(variant.id)}.sizes.${parseInt(
                            size.id
                          )}.promotionPrice`}
                          label="Promotion price"
                          defaultValue={size.promotionPrice}
                          register={register}
                          {...register(
                            `colors.${parseInt(variant.id)}.sizes.${parseInt(
                              size.id
                            )}.promotionPrice`,
                            {
                              onChange: (e) =>
                                updateSize(variant.id, size.id, {
                                  ...size,
                                  promotionPrice: e.target.value,
                                }),
                            }
                          )}
                          errors={errors}
                        />
                      </div>
                      <div className="mb-2">
                        <Input
                          id={`colors.${parseInt(variant.id)}.sizes.${parseInt(
                            size.id
                          )}.dimensionImage`}
                          label="Votre image"
                          register={register}
                          {...register(
                            `colors.${parseInt(variant.id)}.sizes.${parseInt(
                              size.id
                            )}.dimensionImage`,
                            {
                              onChange: (e) =>
                                handleDimensionImage(e, variant.id, size.id),
                            }
                          )}
                          errors={errors}
                          type="file"
                          accept="image/*"
                          isHidden
                        />
                        <label
                          htmlFor={`colors.${parseInt(
                            variant.id
                          )}.sizes.${parseInt(size.id)}.dimensionImage`}
                          className="w-full">
                          <h4 className="font-bold">
                            Dimension de cette taille
                          </h4>
                          <Upload
                            className="w-full h-[75px] aspect-square hover:bg-white transition-all bg-neutral-50 rounded-xl dark:bg-neutral-800 dark:hover:bg-black"
                            strokeWidth={0.2}
                            id={`dimensionImage`}
                            errors={errors}
                          />
                        </label>
                        {size.dimensionImage && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            <div className="relative w-full aspect-square">
                              <Image
                                src={size.dimensionImage}
                                alt={`texture-dimension-${size.dimensionImage}`}
                                fill
                                className="rounded-md border object-contain"
                              />
                              <Trash
                                className="absolute size-8 p-1 top-0 right-0 bg-white dark:bg-black rounded border border-neutral-300 dark:border-neutral-600 hover:scale-110 transition-transform cursor-pointer"
                                onClick={() => {
                                  removeDimensionImage(variant.id, size.id);

                                  // Remove from preview URLs
                                  setBlobDimensionImage((prev) =>
                                    prev.filter(
                                      (img) =>
                                        img.colorId !== variant.id &&
                                        img.sizeId !== size.id
                                    )
                                  );

                                  // Clean up the URL
                                  URL.revokeObjectURL(size.dimensionImage!);
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="">
                        <h4 className="font-bold">Dimensions</h4>
                        <QuillEditor
                          value={size.dimensions ?? ""}
                          onChange={(value) =>
                            updateSize(variant.id, size.id, {
                              ...size,
                              dimensions: value,
                            })
                          }
                        />
                        <h4 className="text-lg font-bold mb-2">Preview:</h4>
                        <div className=" p-2 border rounded min-h-[200px]">
                          <div
                            className="q1-editor"
                            dangerouslySetInnerHTML={{
                              __html: size.dimensions,
                            }}
                          />
                        </div>
                      </div>
                      <Input
                        id={`colors.${parseInt(variant.id)}.sizes.${parseInt(
                          size.id
                        )}.images`}
                        label="Images pour cette taille"
                        type="file"
                        accept="image/*"
                        multiple
                        register={register}
                        {...register(
                          `colors.${parseInt(variant.id)}.sizes.${parseInt(
                            size.id
                          )}.images`,
                          {
                            onChange: (e) =>
                              handleSizeImages(e, variant.id, size.id),
                          }
                        )}
                        isHidden
                        errors={errors}
                      />
                      <label
                        htmlFor={`colors.${parseInt(
                          variant.id
                        )}.sizes.${parseInt(size.id)}.images`}
                        className="w-full">
                        <h4 className="font-bold">Images de cette taille</h4>
                        <Upload
                          className="w-full h-[75px] aspect-square hover:bg-white transition-all bg-neutral-50 rounded-xl dark:bg-neutral-800 dark:hover:bg-black"
                          strokeWidth={0.2}
                          id={`colors.${parseInt(variant.id)}.sizes.${parseInt(
                            size.id
                          )}.images`}
                          errors={errors}
                        />
                      </label>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {blobImages &&
                          blobImagesById(variant.id, size.id).map((img, i) => (
                            <div
                              key={i}
                              className="relative w-[100px] h-[100px] aspect-square">
                              <Image
                                src={img}
                                alt={`size-image-${i}`}
                                fill
                                className="object-cover rounded-md"
                                onLoad={() => URL.revokeObjectURL(img)} // Clean up object URLs
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeSizeImage(variant.id, size.id, img)
                                }
                                className="absolute top-0 right-0 p-1 bg-white rounded-lg cursor-pointer">
                                <Trash className="size-5" />
                              </button>
                            </div>
                          ))}
                      </div>
                      <button
                        type="button"
                        className="text-xs font-semibold border border-red-600 dark:border-neutral-600  rounded-lg mb-1 flex justify-center items-center gap-1 cursor-pointer text-red-600  "
                        onClick={() => removeSize(variant.id, size.id)}>
                        <Trash className="w-6 inline p-1" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex w-full justify-end">
                  <button
                    type="button"
                    className="text-xs font-semibold border border-neutral-300 dark:border-neutral-600 px-2 py-1 rounded-full mb-1 flex justify-center items-center gap-1 cursor-pointer bg-blue-600 text-white hover:bg-white hover:text-blue-600 dark:bg-neutral-800 "
                    onClick={() =>
                      addSizes(variant.id, {
                        id: generateNumericId(),
                        width: "",
                        height: "",
                        length: "",
                        price: "",
                        promotionPrice: "",
                        images: [],
                        dimensionImage: "",
                        dimensions: "",
                      })
                    }>
                    <Add className="size-5 inline" />
                    Ajouter une taille
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-start mt-2">
            <div
              className="text-xs font-semibold border border-neutral-300 dark:border-neutral-600 px-2 py-1 rounded-full mb-1 flex justify-center items-center gap-1 cursor-pointer bg-neutral-100 hover:bg-white dark:bg-neutral-800"
              onClick={addVariant}>
              <Add className="size-5 inline" /> Ajouter un Couleur
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          label="Ajouter le produit"
          className="h-10"
          type="submit"
          black
          widthFull
          disabled={loading || !isValid}
          loading={loading}
        />
      </form>
    </div>
  );
};

export default AddProduct;
