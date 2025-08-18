"use client";
import EmptyModal from "@/components/EmptyModal";
import { Suspense, useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import useAllProducts from "@/reactQueryHook/useAllProducts";
import Image from "next/image";
import Link from "next/link";
import { shortText } from "@/utils/shortText";
// import SizeByColor from "./SizeByColor";
import { useRouter } from "next/navigation";
// import ProductActions from "./ProductActions";
import AddButton from "@/components/AddButton";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { Product, ProductSize } from "@/db/schema";

const ProductsTable = ({ onlyTable }: { onlyTable?: boolean }) => {
  const [isAddProductModal, setIsAddProductModal] = useState(false);
  const [IsColorSize, setIsColorSize] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [colorStatus, setcolorStatus] = useState<boolean>();
  const [product, setProduct] = useState<Product>();
  const { data: products, isLoading, isError } = useAllProducts();

  const router = useRouter();
  const [searchInput, setsearchInput] = useState("");
  const {
    register,
    formState: { errors },
  } = useForm();
  const filteredProducts = products?.filter((product) => {
    const search = searchInput.toLowerCase().replace(/\s+/g, "");
    const matchProduct = product.productName.toLowerCase().includes(search);
    const productStatus = product.status ? "Actif" : "Inactif";
    const matchStatus =
      productStatus.toLowerCase() === searchInput.toLowerCase();
    return matchProduct || matchStatus;
  });
  console.log(products);
  const addProduct = () => {
    setIsAddProductModal(true);
  };
  const colorMatch = product?.colors.find(
    (color) => color.hex === selectedColor
  );
  useEffect(() => {
    if (product) {
      console.log(colorMatch);
      setcolorStatus(colorMatch?.status);
    }
  }, [colorMatch, product, products, router, selectedColor, IsColorSize]);

  return (
    <div className="flex flex-col gap-2 h-full w-full ">
      {!onlyTable && (
        <>
          <div className="flex justify-between items-center w-full gap-4 mt-2">
            <Input
              id="search"
              label="Chercher une commonde"
              register={register}
              defaultValue={searchInput}
              {...register("search", {
                onChange: (e) => {
                  setsearchInput(e.target.value);
                },
              })}
              errors={errors}
              className="max-w-md w-full"
              smallPad
              widthfull
            />
            <AddButton label="Ajouter" onClick={addProduct} />
          </div>
        </>
      )}
      <div className="overflow-hidden">
        <div className="overflow-scroll h-full w-full border border-neutral-300 dark:border-neutral-600 rounded-xl">
          <table className=" w-full text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-300 dark:bg-neutral-800 dark:border-neutral-600">
              <tr className="p-4">
                <th className="p-1 md:p-2">Image</th>
                <th className="p-1 md:p-2">Nom</th>
                <th className="p-1 md:p-2">Reviews</th>
                <th className="p-1 md:p-2">Catégorie</th>
                <th className="p-1 w-10">Promo prix</th>
                <th className="p-1 md:p-2">Prix</th>
                <th className="p-1 md:p-2">Color</th>
                <th className="p-1 md:p-2">Actions</th>
                <th className="p-1 md:p-2">Status</th>
              </tr>
            </thead>
            <tbody className="h-full overflow-y-auto">
              {filteredProducts?.map((product, index) => (
                <tr
                  key={product.id}
                  className={`h-full ${
                    index % 2 !== 0 ? "bg-neutral-100 dark:bg-neutral-800" : ""
                  }`}>
                  <td className="p-1 md:p-2 border-r border-neutral-300 dark:border-neutral-600 w-24">
                    <Suspense fallback={null}>
                      {product.colors.length > 0 &&
                      product.colors[0].sizes[0].images.length > 0 ? (
                        <Link
                          href={`https://itqan.tn/products/${product.id}`}
                          className="relative flex justify-center ">
                          <Image
                            src={product.colors[0].sizes[0].images[0]}
                            alt="product image"
                            width={50}
                            height={50}
                            className="object-contain  cursor-pointer"
                          />
                        </Link>
                      ) : (
                        <p className="text-center text-red-500">
                          pas d&apos;image
                        </p>
                      )}
                    </Suspense>
                  </td>
                  <td className="p-1 md:p-2 font-semibold border-r border-neutral-300 dark:border-neutral-600 w-20 break-words text-sm leading-4">
                    {shortText(product.productName, 18)}
                  </td>

                  <td className="p-1 md:p-2 border-r border-neutral-300 dark:border-neutral-600 max-w-20">
                    reviews
                  </td>
                  <td className="p-1 md:p-2 border-r border-neutral-300 dark:border-neutral-600 max-w-20">
                    {product.category}
                  </td>
                  <td className="p-1 md:p-2 border-r border-neutral-300 dark:border-neutral-600 max-w-16 text-center font-semibold">
                    {product.colors.map((c) =>
                      c.sizes.map((s) => s.promotionPrice).join(", ")
                    )}
                  </td>
                  <td className="p-1 md:p-2 border-r border-neutral-300 dark:border-neutral-600 max-w-16 text-center font-semibold">
                    {product.colors.map((c) =>
                      c.sizes.map((s) => s.price).join(", ")
                    )}
                  </td>
                  <td className="p-1 md:p-2 border-r border-neutral-300 dark:border-neutral-600 h-full min-w-16">
                    <Suspense fallback={null}>
                      <div className="flex justify-center items-center gap-1 flex-wrap h-full">
                        {product.colors.map((c) => (
                          <div
                            key={c.id}
                            className={` size-4 rounded cursor-pointer`}
                            style={{ background: c.color }}
                            onClick={() => {
                              setProduct(product);
                              setSelectedColor(c.hex!); // Then select the color
                              setIsColorSize(true);
                              router.refresh(); // Refresh the page to reflect the latest state
                            }}
                          />
                        ))}
                      </div>
                    </Suspense>
                  </td>

                  <td className="border-r border-neutral-300 dark:border-neutral-600 p-1 md:p-2">
                    {/* <ProductActions product={product} /> */}
                  </td>
                  <td>{/* <ProductStatusComp product={product} /> */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EmptyModal
        center
        centerClassName="max-w-lg"
        isOpen={isAddProductModal}
        onClose={() => setIsAddProductModal(false)}>
        <AddProduct />
      </EmptyModal>
      {/* <EmptyModal
        center
        centerClassName="max-w-lg"
        isOpen={IsColorSize}
        onClose={() => {
          router.refresh();
          setIsColorSize(false);
        }}>
        <SizeByColor
          product={product as Product}
          colorStatus={colorStatus as boolean}
          sizes={colorMatch?.sizes as ProductSize[]}
          colorId={colorMatch?.id as string}
        />
      </EmptyModal> */}
    </div>
  );
};

export default ProductsTable;
