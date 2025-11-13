import { User, TaskItem } from "@/lib/types";
import { mockContactDatabase } from "@/lib/mock-db/contacts";
import { mockTaskDatabase } from "@/lib/mock-db/tasks";

/**
 * Server-side API functions for fetching initial data
 * These run only on the server and can directly access the mock database
 */

export async function getContacts(): Promise<User[]> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  // Return a copy of the data
  return mockContactDatabase.map((contact) => ({ ...contact }));
}

export async function getTasks(listId: number): Promise<TaskItem[]> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  if (mockTaskDatabase[listId]) {
    // Deep clone and ensure dates are serializable
    return mockTaskDatabase[listId].map((task) => ({
      ...task,
      createdAt: task.createdAt,
    }));
  }
  
  return [];
}

export async function getUserData() {
  // This could fetch from a database or API
  // For now, return the mock user data
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  return {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    taskLists: [
      { id: 1, name: "Work Tasks" },
      { id: 2, name: "Personal Tasks" },
      { id: 3, name: "Shopping List" },
    ],
  };
}

