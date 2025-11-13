import { create } from "zustand";
import { persist } from "zustand/middleware";

type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (amount: number) => void;
  decrementBy: (amount: number) => void;
};

export const useCounterStore = create<CounterStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
      incrementBy: (amount) =>
        set((state) => ({ count: state.count + amount })),
      decrementBy: (amount) =>
        set((state) => ({ count: state.count - amount })),
    }),
    {
      name: "counter-storage", // name of the item in localStorage
    }
  )
);
