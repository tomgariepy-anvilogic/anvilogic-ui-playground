"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIStore = {
  selectedListId: number | null;
  setSelectedListId: (id: number | null) => void;
};

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      selectedListId: null,
      setSelectedListId: (id) => set({ selectedListId: id }),
    }),
    {
      name: "ui-storage", // name of the item in localStorage
    }
  )
);

