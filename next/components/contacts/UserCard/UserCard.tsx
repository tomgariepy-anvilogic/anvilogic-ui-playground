"use client";

import { useCallback } from "react";
import { User } from "@/lib/types";
import { useContactsStore } from "@/store/useContactsStore";
import Button from "@/components/common/Button";
import "./UserCard.css";

export type UserCardProps = {
  user: User;
  animationDelay?: number;
};

const UserCard = ({ user, animationDelay = 0 }: UserCardProps) => {
  const deleteContact = useContactsStore((state) => state.deleteContact);

  const handleEdit = useCallback(() => {
    alert(`Editing contact: ${user.name}`);
    // In a real app, you'd open an edit modal or form
  }, [user.name]);

  const handleDelete = useCallback(() => {
    deleteContact(user.id);
  }, [deleteContact, user.id]);

  return (
    <div className="user-card" style={{ animationDelay: `${animationDelay}s` }}>
      <div className="user-card__header">
        <h3>{user.name}</h3>
        {user.age && <span className="user-card__age">Age: {user.age}</span>}
      </div>
      <div className="user-card__body">
        <p className="user-card__email">{user.email}</p>
      </div>
      <div className="user-card__actions">
        <Button variant="secondary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default UserCard;

