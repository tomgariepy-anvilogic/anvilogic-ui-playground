import { User } from "@/lib/types";

// Mock database - shared state across all API calls
export const mockContactDatabase: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

