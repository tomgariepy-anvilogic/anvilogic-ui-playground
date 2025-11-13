"use client";

import { create } from "zustand";
import { LoggedInUser, TaskList } from "@/lib/types";

type UserStore = {
  user: LoggedInUser | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: LoggedInUser) => void;
  addTaskList: (name: string) => void;
  removeTaskList: (id: number) => void;
  updateTaskListName: (id: number, name: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    taskLists: [
      { id: 1, name: "Work Tasks" },
      { id: 2, name: "Personal Tasks" },
      { id: 3, name: "Shopping List" },
    ],
  },
  isLoading: false,
  error: null,

  setUser: (user: LoggedInUser) => set({ user }),

  addTaskList: (name: string) =>
    set((state) => {
      if (!state.user) return state;

      const newTaskList: TaskList = {
        id: Date.now(),
        name,
      };

      return {
        user: {
          ...state.user,
          taskLists: [...state.user.taskLists, newTaskList],
        },
      };
    }),

  removeTaskList: (id: number) =>
    set((state) => {
      if (!state.user) return state;

      return {
        user: {
          ...state.user,
          taskLists: state.user.taskLists.filter((list) => list.id !== id),
        },
      };
    }),

  updateTaskListName: (id: number, name: string) =>
    set((state) => {
      if (!state.user) return state;

      return {
        user: {
          ...state.user,
          taskLists: state.user.taskLists.map((list) =>
            list.id === id ? { ...list, name } : list
          ),
        },
      };
    }),

  logout: () => set({ user: null, error: null }),
}));

