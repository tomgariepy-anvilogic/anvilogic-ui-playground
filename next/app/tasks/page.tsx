import { getUserData, getTasks } from "@/lib/server-api";
import TasksClient from "./TasksClient";

export default async function TasksPage() {
  // Fetch user data on the server
  const initialUser = await getUserData();
  
  // Fetch initial tasks for the first task list
  const firstListId = initialUser.taskLists[0]?.id;
  const initialTasks = firstListId ? await getTasks(firstListId) : [];

  // Pass data to client component
  return (
    <TasksClient
      initialUser={initialUser}
      initialTasks={initialTasks}
      initialListId={firstListId || null}
    />
  );
}
