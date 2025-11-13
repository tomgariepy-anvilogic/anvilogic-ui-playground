"use client";

import { useState, useCallback } from "react";
import { FiTrash2, FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { TaskItem } from "@/lib/types";
import { useTaskStore } from "@/store/useTaskStore";
import Button from "@/components/common/Button";

export type TaskListItemProps = {
  task: TaskItem;
  animationDelay?: number;
};

const TaskListItem = ({ task, animationDelay = 0 }: TaskListItemProps) => {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(() => {
    setIsDeleting(true);
    // Wait for animation to complete before actually deleting
    setTimeout(() => {
      deleteTask(task.id);
    }, 300); // Match the CSS animation duration
  }, [deleteTask, task.id]);

  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [toggleTask, task.id]);

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
    setEditText(task.text);
  }, [task.text]);

  const handleSaveEdit = useCallback(() => {
    if (editText.trim()) {
      updateTask(task.id, editText.trim());
      setIsEditing(false);
    }
  }, [editText, task.id, updateTask]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditText(task.text);
  }, [task.text]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (editText.trim()) {
          updateTask(task.id, editText.trim());
          setIsEditing(false);
        }
      } else if (e.key === "Escape") {
        setIsEditing(false);
        setEditText(task.text);
      }
    },
    [editText, task.id, task.text, updateTask]
  );

  return (
    <li
      className={`task-item ${isDeleting ? "task-item--deleting" : ""}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="task-item__content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="task-item__checkbox"
          disabled={isEditing}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="task-item__edit-input"
            autoFocus
          />
        ) : (
          <span
            className={`task-item__text ${
              task.completed ? "task-item__text--completed" : ""
            }`}
          >
            {task.text}
          </span>
        )}
        {!isEditing && (
          <span className="task-item__date">
            {task.createdAt.toLocaleDateString()}
          </span>
        )}
      </div>
      <div className="task-item__actions">
        {isEditing ? (
          <>
            <Button onClick={handleSaveEdit}>
              <FiCheck size={16} />
            </Button>
            <Button variant="secondary" onClick={handleCancelEdit}>
              <FiX size={16} />
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={handleStartEdit}>
              <FiEdit2 size={16} />
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <FiTrash2 size={16} />
            </Button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskListItem;

