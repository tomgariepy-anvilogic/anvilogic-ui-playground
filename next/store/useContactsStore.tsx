"use client";

import { createContext, useContext, useRef, ReactNode } from "react";
import { createStore, useStore } from "zustand";
import { User } from "@/lib/types";

// API functions that call Next.js API routes
const contactApi = {
  fetchContacts: async (): Promise<User[]> => {
    const response = await fetch("/api/contacts");
    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }
    return response.json();
  },

  addContact: async (contact: Omit<User, "id">): Promise<User> => {
    const response = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error("Failed to add contact");
    }

    return response.json();
  },

  updateContact: async (id: number, updates: Partial<User>): Promise<void> => {
    const response = await fetch(`/api/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update contact");
    }
  },

  deleteContact: async (id: number): Promise<void> => {
    const response = await fetch(`/api/contacts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete contact");
    }
  },
};

type ContactsStore = {
  contacts: User[];
  isLoading: boolean;
  error: string | null;
  isFetched: boolean;

  fetchContacts: () => User[];
  addContact: (contact: Omit<User, "id">) => Promise<void>;
  updateContact: (id: number, updates: Partial<User>) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
};

export const createContactsStore = (initialContacts?: User[]) => {
  return createStore<ContactsStore>((set, get) => ({
    contacts: initialContacts || [],
    isLoading: false,
    error: null,
    isFetched: !!initialContacts, // If we have initial data, mark as fetched

    fetchContacts: () => {
      const state = get();

      // If already fetched or currently loading, return current contacts
      if (state.isFetched || state.isLoading) {
        return state.contacts;
      }

      // Trigger async fetch in the background
      (async () => {
        set({ isLoading: true, error: null });
        try {
          const contacts = await contactApi.fetchContacts();
          set({ contacts, isLoading: false, isFetched: true });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch contacts",
            isLoading: false,
          });
        }
      })();

      // Return current contacts (empty on first call)
      return state.contacts;
    },

    addContact: async (contactData: Omit<User, "id">) => {
      // Create temporary contact for optimistic update
      const tempId = Date.now();
      const tempContact: User = {
        id: tempId,
        ...contactData,
      };

      // Optimistic update - add contact immediately
      set((state) => ({
        contacts: [...state.contacts, tempContact],
        error: null,
      }));

      try {
        const newContact = await contactApi.addContact(contactData);
        // Replace temp contact with real contact from API
        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.id === tempId ? newContact : c
          ),
        }));
      } catch (error) {
        // Rollback - remove temp contact on error
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== tempId),
          error:
            error instanceof Error ? error.message : "Failed to add contact",
        }));
      }
    },

    updateContact: async (id: number, updates: Partial<User>) => {
      const contact = get().contacts.find((c) => c.id === id);
      if (!contact) return;

      // Optimistic update
      set((state) => ({
        contacts: state.contacts.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        ),
      }));

      try {
        await contactApi.updateContact(id, updates);
      } catch (error) {
        // Rollback on error
        set((state) => ({
          contacts: state.contacts.map((c) => (c.id === id ? contact : c)),
          error:
            error instanceof Error ? error.message : "Failed to update contact",
        }));
      }
    },

    deleteContact: async (id: number) => {
      const contact = get().contacts.find((c) => c.id === id);
      if (!contact) return;

      // Optimistic update - remove contact immediately
      set((state) => ({
        contacts: state.contacts.filter((c) => c.id !== id),
        error: null,
      }));

      try {
        await contactApi.deleteContact(id);
      } catch (error) {
        // Rollback - restore contact on error
        set((state) => ({
          contacts: [...state.contacts, contact],
          error:
            error instanceof Error ? error.message : "Failed to delete contact",
        }));
      }
    },
  }));
};

type ContactsStoreApi = ReturnType<typeof createContactsStore>;

const ContactsStoreContext = createContext<ContactsStoreApi | undefined>(
  undefined
);

export const ContactsStoreProvider = ({
  children,
  initialContacts,
}: {
  children: ReactNode;
  initialContacts?: User[];
}) => {
  const storeRef = useRef<ContactsStoreApi>(undefined);
  if (!storeRef.current) {
    storeRef.current = createContactsStore(initialContacts);
  }

  return (
    <ContactsStoreContext.Provider value={storeRef.current}>
      {children}
    </ContactsStoreContext.Provider>
  );
};

export const useContactsStore = <T,>(
  selector: (state: ContactsStore) => T
): T => {
  const store = useContext(ContactsStoreContext);
  if (!store) {
    throw new Error(
      "useContactsStore must be used within ContactsStoreProvider"
    );
  }
  return useStore(store, selector);
};
