import { createContext, useContext, useRef, ReactNode } from "react";
import { createStore, useStore } from "zustand";
import { User } from "../types";

// Mock API delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock database - shared state across all API calls
const mockDatabase: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

// Mock API functions
const mockApi = {
  fetchContacts: async (): Promise<User[]> => {
    await delay(800);
    // Return a copy of the data
    return mockDatabase.map((contact) => ({ ...contact }));
  },
  addContact: async (contact: Omit<User, "id">): Promise<User> => {
    await delay(500);

    const newContact: User = {
      id: Date.now(),
      ...contact,
    };

    // Add to mock database
    mockDatabase.push(newContact);

    return newContact;
  },
  updateContact: async (id: number, updates: Partial<User>): Promise<void> => {
    await delay(400);

    // Simulate occasional API error (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Failed to update contact");
    }

    // Update in mock database
    const contact = mockDatabase.find((c) => c.id === id);
    if (contact) {
      Object.assign(contact, updates);
    }
  },
  deleteContact: async (id: number): Promise<void> => {
    await delay(400);

    // Remove from mock database
    const index = mockDatabase.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockDatabase.splice(index, 1);
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

export const createContactsStore = () => {
  return createStore<ContactsStore>((set, get) => ({
    contacts: [],
    isLoading: false,
    error: null,
    isFetched: false,

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
          const contacts = await mockApi.fetchContacts();
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
        const newContact = await mockApi.addContact(contactData);
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
        await mockApi.updateContact(id, updates);
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
        await mockApi.deleteContact(id);
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
}: {
  children: ReactNode;
}) => {
  const storeRef = useRef<ContactsStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createContactsStore();
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
