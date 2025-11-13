"use client";

import { useState, useCallback } from "react";
import { FiPlus } from "react-icons/fi";
import { TaskStoreProvider, useTaskStore } from "@/store/useTaskStore";
import TaskListItem from "../TaskListItem";
import Button from "@/components/common/Button";
import { TaskItem } from "@/lib/types";
import "./TaskList.css";

type TaskListProps = {
  listId: number | null;
  listName: string;
  initialTasks?: TaskItem[];
};

const TaskListContent = () => {
  const tasks = useTaskStore((state) => state.fetchTasks());
  const isLoading = useTaskStore((state) => state.isLoading);
  const error = useTaskStore((state) => state.error);
  const addTask = useTaskStore((state) => state.addTask);
  const listName = useTaskStore((state) => state.listName);
  const [newTaskText, setNewTaskText] = useState("");
  const [inputError, setInputError] = useState("");

  const handleAddTask = useCallback(() => {
    if (!newTaskText.trim()) {
      setInputError("Task cannot be empty");
      return;
    }

    setInputError("");
    addTask(newTaskText);
    setNewTaskText("");
  }, [newTaskText, addTask]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleAddTask();
      }
    },
    [handleAddTask]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTaskText(e.target.value);
      setInputError("");
    },
    []
  );

  return (
    <div className="task-list">
      <h2>{listName || "Task List"}</h2>

      {error && (
        <div
          style={{
            color: "#d32f2f",
            backgroundColor: "#ffebee",
            padding: "0.75rem",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        >
          Error: {error}
        </div>
      )}

      {isLoading && tasks.length === 0 ? (
        <div className="task-list__loading">
          <div className="task-list__spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <p className="task-list__empty">No tasks yet!</p>
      ) : (
        <ul className="task-list__items">
          {tasks.map((task, index) => (
            <TaskListItem
              key={task.id}
              task={task}
              animationDelay={index * 0.05}
            />
          ))}
        </ul>
      )}

      <div className="task-list__add-section">
        <div className="task-list__add">
          <input
            type="text"
            value={newTaskText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter new task..."
            className={`task-list__input ${
              inputError ? "task-list__input--error" : ""
            }`}
          />
          <Button onClick={handleAddTask}>
            <FiPlus size={18} />
          </Button>
        </div>
        {inputError && <div className="task-list__error">{inputError}</div>}
      </div>
    </div>
  );
};

const TaskList = ({ listId, listName, initialTasks }: TaskListProps) => {
  return (
    <TaskStoreProvider
      key={listId}
      listId={listId}
      listName={listName}
      initialTasks={initialTasks}
    >
      <TaskListContent />
    </TaskStoreProvider>
  );
};

export default TaskList;

