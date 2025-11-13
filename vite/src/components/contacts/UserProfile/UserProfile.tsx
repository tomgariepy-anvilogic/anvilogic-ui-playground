import { useState } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";
import { useUserStore } from "../../../store/useUserStore";
import Button from "../../common/Button";
import "./UserProfile.css";

const UserProfile = () => {
  const user = useUserStore((state) => state.user);
  const addTaskList = useUserStore((state) => state.addTaskList);
  const removeTaskList = useUserStore((state) => state.removeTaskList);
  const updateTaskListName = useUserStore((state) => state.updateTaskListName);

  const [newListName, setNewListName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  if (!user) {
    return <div className="user-profile">Not logged in</div>;
  }

  const handleAddList = () => {
    if (newListName.trim()) {
      addTaskList(newListName);
      setNewListName("");
    }
  };

  const handleStartEdit = (id: number, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleSaveEdit = (id: number) => {
    if (editingName.trim()) {
      updateTaskListName(id, editingName);
    }
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div className="user-profile">
      <div className="user-profile__header">
        <h2>Welcome, {user.name}</h2>
        <p className="user-profile__email">{user.email}</p>
      </div>

      <div className="user-profile__section">
        <h3>Your Task Lists</h3>
        <ul className="task-lists">
          {user.taskLists.map((list) => (
            <li key={list.id} className="task-list-item">
              {editingId === list.id ? (
                <div className="task-list-item__edit">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="task-list-item__input"
                  />
                  <Button onClick={() => handleSaveEdit(list.id)}>
                    <FiCheck size={16} />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setEditingId(null)}
                  >
                    <FiX size={16} />
                  </Button>
                </div>
              ) : (
                <div className="task-list-item__view">
                  <span className="task-list-item__name">{list.name}</span>
                  <div className="task-list-item__actions">
                    <Button
                      variant="secondary"
                      onClick={() => handleStartEdit(list.id, list.name)}
                    >
                      <FiEdit2 size={16} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeTaskList(list.id)}
                    >
                      <FiTrash2 size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="add-task-list">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="New list name..."
            className="add-task-list__input"
            onKeyPress={(e) => e.key === "Enter" && handleAddList()}
          />
          <Button onClick={handleAddList}>
            <FiPlus size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
