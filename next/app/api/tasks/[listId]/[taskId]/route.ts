import { NextRequest, NextResponse } from "next/server";
import { mockTaskDatabase } from "@/lib/mock-db/tasks";
import { delay, simulateRandomError } from "@/lib/api-utils";

// PATCH /api/tasks/[listId]/[taskId] - Update a task (toggle or edit text)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string; taskId: string }> }
) {
  await delay(300);

  try {
    simulateRandomError("Failed to update task");
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }

  const { listId: listIdString, taskId: taskIdString } = await params;
  const listId = parseInt(listIdString);
  const taskId = parseInt(taskIdString);
  const body = await request.json();

  if (mockTaskDatabase[listId]) {
    const task = mockTaskDatabase[listId].find((t) => t.id === taskId);
    if (task) {
      if (body.completed !== undefined) {
        task.completed = body.completed;
      }
      if (body.text !== undefined) {
        task.text = body.text;
      }
      return NextResponse.json({
        ...task,
        createdAt: task.createdAt.toISOString(),
      });
    }
  }

  return NextResponse.json({ error: "Task not found" }, { status: 404 });
}

// DELETE /api/tasks/[listId]/[taskId] - Delete a task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string; taskId: string }> }
) {
  await delay(400);

  const { listId: listIdString, taskId: taskIdString } = await params;
  const listId = parseInt(listIdString);
  const taskId = parseInt(taskIdString);

  if (mockTaskDatabase[listId]) {
    mockTaskDatabase[listId] = mockTaskDatabase[listId].filter(
      (t) => t.id !== taskId
    );
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "List not found" }, { status: 404 });
}
