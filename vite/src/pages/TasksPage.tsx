import { useState, useCallback, useMemo, useEffect } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";
import { useUserStore } from "../store/useUserStore";
import { useUIStore } from "../store/useUIStore";
import TaskList from "../components/tasks/TaskList";
import Button from "../components/common/Button";
import "./TasksPage.css";

const TasksPage = () => {
  const user = useUserStore((state) => state.user);
  const addTaskList = useUserStore((state) => state.addTaskList);
  const removeTaskList = useUserStore((state) => state.removeTaskList);
  const updateTaskListName = useUserStore((state) => state.updateTaskListName);

  const selectedListId = useUIStore((state) => state.selectedListId);
  const setSelectedListId = useUIStore((state) => state.setSelectedListId);

  const [newListName, setNewListName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  // Initialize selected list if not set or if it doesn't exist anymore
  useEffect(() => {
    if (
      user &&
      (!selectedListId || !user.taskLists.find((l) => l.id === selectedListId))
    ) {
      setSelectedListId(user.taskLists[0]?.id || null);
    }
  }, [user, selectedListId, setSelectedListId]);

  if (!user) {
    return <div>Not logged in</div>;
  }

  const selectedList = useMemo(
    () => user.taskLists.find((list) => list.id === selectedListId),
    [user.taskLists, selectedListId]
  );

  const handleAddList = useCallback(() => {
    if (newListName.trim()) {
      addTaskList(newListName);
      setNewListName("");
    }
  }, [newListName, addTaskList]);

  const handleStartEdit = useCallback((id: number, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  }, []);

  const handleSaveEdit = useCallback(
    (id: number) => {
      if (editingName.trim()) {
        updateTaskListName(id, editingName);
      }
      setEditingId(null);
      setEditingName("");
    },
    [editingName, updateTaskListName]
  );

  const handleDeleteList = useCallback(
    (id: number) => {
      removeTaskList(id);
      if (selectedListId === id) {
        setSelectedListId(user.taskLists[0]?.id || null);
      }
    },
    [removeTaskList, selectedListId, user.taskLists]
  );

  const handleSelectList = useCallback(
    (id: number) => {
      setSelectedListId(id);
    },
    [setSelectedListId]
  );

  const handleKeyPressNewList = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleAddList();
      }
    },
    [handleAddList]
  );

  return (
    <div className="tasks-page">
      <div className="tasks-page__sidebar">
        <div className="tasks-page__sidebar-header">
          <h2>Task Lists</h2>
          <p className="tasks-page__user">{user.name}</p>
        </div>
        <ul className="tasks-page__list">
          {user.taskLists.map((list) => (
            <li key={list.id} className="tasks-page__list-item-wrapper">
              {editingId === list.id ? (
                <div className="tasks-page__list-item-edit">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="tasks-page__list-item-input"
                    autoFocus
                  />
                  <div className="tasks-page__list-item-actions">
                    <Button onClick={() => handleSaveEdit(list.id)}>
                      <FiCheck size={14} />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditingId(null)}
                    >
                      <FiX size={14} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={`tasks-page__list-item ${
                    selectedListId === list.id
                      ? "tasks-page__list-item--active"
                      : ""
                  }`}
                >
                  <span
                    className="tasks-page__list-item-name"
                    onClick={() => handleSelectList(list.id)}
                  >
                    {list.name}
                  </span>
                  <div className="tasks-page__list-item-actions">
                    <button
                      className="tasks-page__icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(list.id, list.name);
                      }}
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      className="tasks-page__icon-btn tasks-page__icon-btn--danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteList(list.id);
                      }}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="tasks-page__add-list">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="New list name..."
            className="tasks-page__add-list-input"
            onKeyPress={handleKeyPressNewList}
          />
          <Button onClick={handleAddList}>
            <FiPlus size={16} />
          </Button>
        </div>
      </div>

      <div className="tasks-page__content">
        {selectedList ? (
          <TaskList listId={selectedListId} listName={selectedList.name} />
        ) : (
          <div className="tasks-page__empty">
            <p>Select a task list to view tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
