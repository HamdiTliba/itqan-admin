import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GlobalProps {
  account: "Login" | "Register";
  setAccount: (account: "Login" | "Register") => void;
  isSelectedLink: string;
  setIsSelectedLink: (link: string) => void;
  activeIndex: number | null;
  setActiveIndex: (activeIndex: number | null) => void;
}

const useGlobal = create<GlobalProps>()(
  persist(
    (set) => ({
      account: "Login",
      setAccount: (account) => set({ account }),
      isSelectedLink: "/admin",
      setIsSelectedLink: (link) => set({ isSelectedLink: link }),
      activeIndex: null,
      setActiveIndex: (activeIndex) => set({ activeIndex }),
    }),
    {
      name: "global",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGlobal;
