import { NextRequest, NextResponse } from "next/server";
import { mockTaskDatabase } from "@/lib/mock-db/tasks";
import { delay, simulateRandomError } from "@/lib/api-utils";
import { TaskItem } from "@/lib/types";

// GET /api/tasks/[listId] - Fetch all tasks for a list
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  await delay(800);

  const { listId: listIdString } = await params;
  const listId = parseInt(listIdString);

  if (mockTaskDatabase[listId]) {
    // Deep clone and restore Date objects
    const tasks = mockTaskDatabase[listId].map((task) => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
    }));
    return NextResponse.json(tasks);
  }

  // Initialize empty array for new lists
  mockTaskDatabase[listId] = [];
  return NextResponse.json([]);
}

// POST /api/tasks/[listId] - Add a new task
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  await delay(500);

  const { listId: listIdString } = await params;
  const listId = parseInt(listIdString);
  const { text } = await request.json();

  const newTask: TaskItem = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date(),
  };

  // Add to mock database
  if (!mockTaskDatabase[listId]) {
    mockTaskDatabase[listId] = [];
  }
  mockTaskDatabase[listId].push(newTask);

  return NextResponse.json({
    ...newTask,
    createdAt: newTask.createdAt.toISOString(),
  });
}

