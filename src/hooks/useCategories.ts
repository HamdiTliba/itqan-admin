import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CategoriesProps {
  name: null | string;
  setName: (name: string) => void;
  description: null | string;
  setDescription: (description: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  fileUrl: string | null;
  setFileUrl: (url: string | null) => void;
  referenceUrl: string | null;
  setReferenceUrl: (url: string | null) => void;
  reset: () => void;
}

const useCategories = create<CategoriesProps>()(
  persist(
    (set) => ({
      name: null,
      setName: (name: string) => set({ name }),
      description: null,
      setDescription: (description: string) => set({ description }),
      file: null,
      setFile: (fileImage: File | null) => set({ file: fileImage }),
      fileUrl: null,
      setFileUrl: (url: string | null) => set({ fileUrl: url }),
      referenceUrl: null,
      setReferenceUrl: (url: string | null) => set({ referenceUrl: url }),
      reset: () =>
        set({
          name: null,
          description: null,
          file: null,
          fileUrl: null,
          referenceUrl: null,
        }),
    }),
    {
      name: "categories",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCategories;
