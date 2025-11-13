import { TaskItem } from "@/lib/types";

// Mock database - shared state across all API calls
export const mockTaskDatabase: Record<number, TaskItem[]> = {
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

