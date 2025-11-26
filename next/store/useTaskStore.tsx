"use client";

import { createContext, useContext, useRef, ReactNode } from "react";
import { createStore, useStore } from "zustand";
import { TaskItem } from "@/lib/types";

// API functions that call Next.js API routes
const taskApi = {
  fetchTasks: async (listId: number | null): Promise<TaskItem[]> => {
    if (!listId) return [];

    const response = await fetch(`/api/tasks/${listId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await response.json();
    // Convert date strings back to Date objects
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }));
  },

  addTask: async (listId: number | null, text: string): Promise<TaskItem> => {
    if (!listId) throw new Error("No list selected");

    const response = await fetch(`/api/tasks/${listId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }

    const task = await response.json();
    return {
      ...task,
      createdAt: new Date(task.createdAt),
    };
  },

  toggleTask: async (
    listId: number | null,
    id: number,
    completed: boolean
  ): Promise<void> => {
    if (!listId) throw new Error("No list selected");

    const response = await fetch(`/api/tasks/${listId}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to toggle task");
    }
  },

  updateTask: async (
    listId: number | null,
    id: number,
    text: string
  ): Promise<void> => {
    if (!listId) throw new Error("No list selected");

    const response = await fetch(`/api/tasks/${listId}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update task");
    }
  },

  deleteTask: async (listId: number | null, id: number): Promise<void> => {
    if (!listId) throw new Error("No list selected");

    const response = await fetch(`/api/tasks/${listId}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
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

const createTaskStore = (
  listId: number | null,
  listName: string,
  initialTasks?: TaskItem[]
) => {
  return createStore<TaskStore>((set, get) => ({
    tasks: initialTasks || [],
    isLoading: false,
    error: null,
    isFetched: !!initialTasks, // If we have initial data, mark as fetched
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
          const tasks = await taskApi.fetchTasks(state.listId);
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
        const newTask = await taskApi.addTask(get().listId, text);
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
        await taskApi.toggleTask(get().listId, id, !task.completed);
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
        await taskApi.updateTask(get().listId, id, text);
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
        await taskApi.deleteTask(get().listId, id);
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
  initialTasks?: TaskItem[];
};

export const TaskStoreProvider = ({
  children,
  listId,
  listName,
  initialTasks,
}: TaskStoreProviderProps) => {
  const storeRef = useRef<TaskStoreApi>(undefined);
  if (!storeRef.current) {
    storeRef.current = createTaskStore(listId, listName, initialTasks);
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
