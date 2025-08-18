import { Category } from "@/app/admin/(routes)/products/AddProduct";
import { ProductColor, ProductSize } from "@/db/schema";
import generateNumericId from "@/utils/generateNumericId";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AddProducts {
  productName: string;
  setProductName: (productName: string) => void;
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  materials: string;
  setMaterials: (materials: string) => void;
  book: string;
  setBook: (book: string) => void;

  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
  selectedColors: ProductColor[];
  setSelectedColors: (colors: ProductColor[]) => void;
  addColor: () => void;
  updateColor: (index: string, updatedColor: ProductColor) => void;
  removeColor: (index: string) => void;
  addSizes: (colorId: string, newSize: ProductSize) => void;
  handleSizeQuantity: (
    index: string,
    colorId: string,
    newQuantity: number
  ) => void;
  addImages: (colorId: string, newImages: string[]) => void;

  updateSize: (
    colorId: string,
    sizeId: string,
    updatedSize: ProductSize
  ) => void;
  removeSize: (colorId: string, sizeId: string) => void;

  resetData: () => void;
}
const mergeDefined = <T extends object>(base: T, patch: Partial<T>): T => {
  const next = { ...base } as T;
  (Object.keys(patch) as (keyof T)[]).forEach((k) => {
    const v = patch[k];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (v !== undefined) (next as any)[k] = v;
  });
  return next;
};

const useAddProducts = create<AddProducts>()(
  persist(
    (set) => ({
      productName: "",
      setProductName: (productName: string) => set({ productName }),
      name: "",
      setName: (name: string) => set({ name }),
      description: "",
      setDescription: (description: string) => set({ description }),
      materials: "",
      setMaterials: (materials: string) => set({ materials }),
      book: "",
      setBook: (book: string) => set({ book }),
      selectedCategory: null,
      setSelectedCategory: (selectedCategory: Category) =>
        set({ selectedCategory }),
      selectedColors: [],
      setSelectedColors: (colors: ProductColor[]) =>
        set({ selectedColors: colors }),
      addColor: () =>
        set((state) => {
          const newVariant: ProductColor = {
            id: generateNumericId(),
            color: "",
            hex: "#000000",
            texture: "",
            sizes: [],
            description: "",
            status: false,
            materials: "",
            name: "",
          };
          return { selectedColors: [...state.selectedColors, newVariant] };
        }),
      updateColor: (id, patch) =>
        set((state) => ({
          selectedColors: state.selectedColors.map((c) =>
            c.id === id ? mergeDefined(c, patch) : c
          ),
        })),
      removeColor: (id: string) =>
        set((state) => ({
          selectedColors: state.selectedColors.filter(
            (variant) => variant.id !== id
          ),
        })),

      addSizes: (colorId, newSize) =>
        set((state) => ({
          selectedColors: state.selectedColors.map((color) =>
            color.id === colorId
              ? {
                  ...color,
                  sizes: color.sizes.some((s) => s.id === newSize.id)
                    ? color.sizes
                    : [...color.sizes, newSize],
                }
              : color
          ),
        })),

      updateSize: (colorId, sizeId, patch) =>
        set((state) => ({
          selectedColors: state.selectedColors.map((c) =>
            c.id === colorId
              ? {
                  ...c,
                  sizes: c.sizes.map((s) =>
                    s.id === sizeId ? mergeDefined(s, patch) : s
                  ),
                }
              : c
          ),
        })),

      removeSize: (colorId, sizeId) =>
        set((state) => ({
          selectedColors: state.selectedColors.map((color) =>
            color.id === colorId
              ? {
                  ...color,
                  sizes: color.sizes.filter((size) => size.id !== sizeId),
                }
              : color
          ),
        })),

      handleSizeQuantity: (sizeId, colorId, quantity) =>
        set((state) => ({
          selectedColors: state.selectedColors.map((color) =>
            color.id === colorId
              ? {
                  ...color,
                  sizes: color.sizes.map((size) =>
                    size.id === sizeId ? { ...size, quantity } : size
                  ),
                }
              : color
          ),
        })),
      addImages: (colorId: string, newImages: string[]) =>
        set((state) => ({
          selectedColors: state.selectedColors.map((color) =>
            color.id === colorId
              ? {
                  ...color,
                  images: [...color.sizes[0].images, ...newImages],
                }
              : color
          ),
        })),
      resetData: () =>
        set({
          name: "",
          description: "",
          selectedCategory: null,
          selectedColors: [],
        }),
    }),
    {
      name: "add-products",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAddProducts;
