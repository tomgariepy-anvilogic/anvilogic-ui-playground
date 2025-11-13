"use client";

import {
  ContactsStoreProvider,
  useContactsStore,
} from "@/store/useContactsStore";
import UserCard from "@/components/contacts/UserCard";
import { User } from "@/lib/types";

function ContactsPageContent() {
  const contacts = useContactsStore((state) => state.contacts);
  const isLoading = useContactsStore((state) => state.isLoading);
  const error = useContactsStore((state) => state.error);

  return (
    <div>
      <h2>Contacts</h2>

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

      {isLoading && contacts.length === 0 ? (
        <div className="contacts-loading">
          <div className="contacts-spinner"></div>
          <p>Loading contacts...</p>
        </div>
      ) : contacts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
          No contacts found
        </p>
      ) : (
        <div className="contacts-grid">
          {contacts.map((contact, index) => (
            <UserCard
              key={contact.id}
              user={contact}
              animationDelay={index * 0.05}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ContactsClient({
  initialContacts,
}: {
  initialContacts: User[];
}) {
  return (
    <ContactsStoreProvider initialContacts={initialContacts}>
      <ContactsPageContent />
    </ContactsStoreProvider>
  );
}

