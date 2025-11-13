// User types using 'type' instead of 'interface'
export type User = {
  id: number;
  name: string;
  email: string;
  age?: number;
};

export type TaskItem = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
};

export type TaskList = {
  id: number;
  name: string;
};

export type LoggedInUser = {
  id: number;
  name: string;
  email: string;
  taskLists: TaskList[];
};

