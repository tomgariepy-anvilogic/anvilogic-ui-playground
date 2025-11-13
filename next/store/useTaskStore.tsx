"use client";

import { createContext, useContext, useRef, ReactNode } from "react";
import { createStore, useStore } from "zustand";
import { TaskItem } from "@/lib/types";

// Mock API delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock database - shared state across all API calls
const mockDatabase: Record<number, TaskItem[]> = {
  1: [
    {
      id: 1,
      text: "Review quarterly reports",
      completed: false,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      text: "Team meeting at 2pm",
      completed: true,
      createdAt: new Date("2024-01-16"),
    },
    {
      id: 3,
      text: "Update project documentation",
      completed: false,
      createdAt: new Date("2024-01-17"),
    },
  ],
  2: [
    {
      id: 4,
      text: "Call dentist for appointment",
      completed: false,
      createdAt: new Date("2024-01-10"),
    },
    {
      id: 5,
      text: "Pay utility bills",
      completed: true,
      createdAt: new Date("2024-01-11"),
    },
    {
      id: 6,
      text: "Organize closet",
      completed: false,
      createdAt: new Date("2024-01-12"),
    },
    {
      id: 7,
      text: "Book vacation tickets",
      completed: false,
      createdAt: new Date("2024-01-13"),
    },
  ],
  3: [
    {
      id: 8,
      text: "Buy groceries",
      completed: false,
      createdAt: new Date("2024-01-20"),
    },
    {
      id: 9,
      text: "Get coffee beans",
      completed: true,
      createdAt: new Date("2024-01-20"),
    },
  ],
};

// Mock API functions
const mockApi = {
  fetchTasks: async (listId: number | null): Promise<TaskItem[]> => {
    await delay(800);

    // Return a copy of the data to prevent direct mutation
    if (listId && mockDatabase[listId]) {
      // Deep clone and restore Date objects
      return mockDatabase[listId].map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
    }

    // Initialize empty array for new lists
    if (listId) {
      mockDatabase[listId] = [];
    }

    return [];
  },
  addTask: async (listId: number | null, text: string): Promise<TaskItem> => {
    await delay(500);

    const newTask: TaskItem = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };

    // Add to mock database
    if (listId) {
      if (!mockDatabase[listId]) {
        mockDatabase[listId] = [];
      }
      mockDatabase[listId].push(newTask);
    }

    return newTask;
  },
  toggleTask: async (
    listId: number | null,
    id: number,
    completed: boolean
  ): Promise<void> => {
    await delay(300);

    // Simulate occasional API error (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Failed to update task");
    }

    // Update in mock database
    if (listId && mockDatabase[listId]) {
      const task = mockDatabase[listId].find((t) => t.id === id);
      if (task) {
        task.completed = completed;
      }
    }
  },
  updateTask: async (
    listId: number | null,
    id: number,
    text: string
  ): Promise<void> => {
    await delay(400);

    // Simulate occasional API error (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Failed to update task");
    }

    // Update in mock database
    if (listId && mockDatabase[listId]) {
      const task = mockDatabase[listId].find((t) => t.id === id);
      if (task) {
        task.text = text;
      }
    }
  },
  deleteTask: async (listId: number | null, id: number): Promise<void> => {
    await delay(400);

    // Remove from mock database
    if (listId && mockDatabase[listId]) {
      mockDatabase[listId] = mockDatabase[listId].filter((t) => t.id !== id);
    }
  },
};

type TaskStore = {
  tasks: TaskItem[];
  isLoading: boolean;
  error: string | null;
  isFetched: boolean;
  listId: number | null;
  listName: string;
  fetchTasks: () => TaskItem[];
  addTask: (text: string) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  updateTask: (id: number, text: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};

type TaskStoreApi = ReturnType<typeof createTaskStore>;

const createTaskStore = (listId: number | null, listName: string) => {
  return createStore<TaskStore>((set, get) => ({
    tasks: [],
    isLoading: false,
    error: null,
    isFetched: false,
    listId,
    listName,

    fetchTasks: () => {
      const state = get();

      // If already fetched or currently loading, return current tasks
      if (state.isFetched || state.isLoading) {
        return state.tasks;
      }

      // Trigger async fetch in the background
      (async () => {
        set({ isLoading: true, error: null });
        try {
          const tasks = await mockApi.fetchTasks(state.listId);
          set({ tasks, isLoading: false, isFetched: true });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to fetch tasks",
            isLoading: false,
          });
        }
      })();

      // Return current tasks (empty on first call)
      return state.tasks;
    },

    addTask: async (text: string) => {
      // Create temporary task for optimistic update
      const tempId = Date.now();
      const tempTask: TaskItem = {
        id: tempId,
        text,
        completed: false,
        createdAt: new Date(),
      };

      // Optimistic update - add task immediately
      set((state) => ({
        tasks: [...state.tasks, tempTask],
        error: null,
      }));

      try {
        const newTask = await mockApi.addTask(get().listId, text);
        // Replace temp task with real task from API
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === tempId ? newTask : t)),
        }));
      } catch (error) {
        // Rollback - remove temp task on error
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== tempId),
          error: error instanceof Error ? error.message : "Failed to add task",
        }));
      }
    },

    toggleTask: async (id: number) => {
      const task = get().tasks.find((t) => t.id === id);
      if (!task) return;

      // Optimistic update
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      }));

      try {
        await mockApi.toggleTask(get().listId, id, !task.completed);
      } catch (error) {
        // Rollback on error
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: task.completed } : t
          ),
          error:
            error instanceof Error ? error.message : "Failed to toggle task",
        }));
      }
    },

    updateTask: async (id: number, text: string) => {
      const task = get().tasks.find((t) => t.id === id);
      if (!task) return;

      const previousText = task.text;

      // Optimistic update
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, text } : t)),
        error: null,
      }));

      try {
        await mockApi.updateTask(get().listId, id, text);
      } catch (error) {
        // Rollback on error
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, text: previousText } : t
          ),
          error:
            error instanceof Error ? error.message : "Failed to update task",
        }));
      }
    },

    deleteTask: async (id: number) => {
      const task = get().tasks.find((t) => t.id === id);
      if (!task) return;

      // Optimistic update - remove task immediately
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        error: null,
      }));

      try {
        await mockApi.deleteTask(get().listId, id);
      } catch (error) {
        // Rollback - restore task on error
        set((state) => ({
          tasks: [...state.tasks, task],
          error:
            error instanceof Error ? error.message : "Failed to delete task",
        }));
      }
    },
  }));
};

const TaskStoreContext = createContext<TaskStoreApi | null>(null);

type TaskStoreProviderProps = {
  children: ReactNode;
  listId: number | null;
  listName: string;
};

export const TaskStoreProvider = ({
  children,
  listId,
  listName,
}: TaskStoreProviderProps) => {
  const storeRef = useRef<TaskStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createTaskStore(listId, listName);
  }

  return (
    <TaskStoreContext.Provider value={storeRef.current}>
      {children}
    </TaskStoreContext.Provider>
  );
};

export const useTaskStore = <T,>(selector: (state: TaskStore) => T): T => {
  const store = useContext(TaskStoreContext);
  if (!store) {
    throw new Error("useTaskStore must be used within TaskStoreProvider");
  }
  return useStore(store, selector);
};

