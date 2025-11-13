# Next.js TypeScript Sample App

A modern web application built with Next.js 14, TypeScript, and Zustand for state management. This app demonstrates a complete task management system with contacts and a counter example.

## Features

- **Task Management**: Create, edit, delete, and organize tasks in multiple lists
- **Contacts**: View and manage a contact list with full CRUD operations
- **Counter**: Simple counter example demonstrating state persistence
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Responsive Design**: Mobile-friendly interface
- **Type Safety**: Full TypeScript implementation
- **State Management**: Zustand for efficient global state management

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Zustand** - Lightweight state management
- **React Icons** - Icon library
- **CSS** - Custom styling with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
next/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (Next.js Route Handlers)
│   │   ├── tasks/        # Task API endpoints
│   │   │   └── [listId]/
│   │   │       ├── route.ts          # GET, POST /api/tasks/[listId]
│   │   │       └── [taskId]/
│   │   │           └── route.ts      # PATCH, DELETE /api/tasks/[listId]/[taskId]
│   │   └── contacts/     # Contact API endpoints
│   │       ├── route.ts              # GET, POST /api/contacts
│   │       └── [id]/
│   │           └── route.ts          # PATCH, DELETE /api/contacts/[id]
│   ├── tasks/             # Task management page
│   ├── contacts/          # Contacts page
│   ├── counter/           # Counter example page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (redirects to tasks)
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── common/           # Shared components (Button, Header, Navigation)
│   ├── contacts/         # Contact-related components
│   └── tasks/            # Task-related components
├── store/                # Zustand store definitions
│   ├── useTaskStore.tsx
│   ├── useContactsStore.tsx
│   ├── useCounterStore.ts
│   ├── useUserStore.ts
│   └── useUIStore.ts
├── lib/                  # Utility functions and types
│   ├── types.ts
│   ├── api-utils.ts      # Shared API utilities
│   └── mock-db/          # Mock database (in-memory)
│       ├── tasks.ts
│       └── contacts.ts
└── public/              # Static assets
```

## API Routes

The app includes proper Next.js API routes for a realistic architecture:

### Tasks API

- `GET /api/tasks/[listId]` - Fetch all tasks for a list
- `POST /api/tasks/[listId]` - Create a new task
- `PATCH /api/tasks/[listId]/[taskId]` - Update task (toggle completion or edit text)
- `DELETE /api/tasks/[listId]/[taskId]` - Delete a task

### Contacts API

- `GET /api/contacts` - Fetch all contacts
- `POST /api/contacts` - Create a new contact
- `PATCH /api/contacts/[id]` - Update a contact
- `DELETE /api/contacts/[id]` - Delete a contact

### Mock Database

All API routes use an in-memory mock database located in `lib/mock-db/`:
- Simulates network latency (300-800ms delays)
- Includes random error simulation (10% chance) for testing error handling
- Data persists during the session but resets on server restart

## State Management

This app uses Zustand for state management with the following stores:

- **TaskStore**: Manages tasks with optimistic updates and error handling, calls Task API
- **ContactsStore**: Handles contact CRUD operations, calls Contacts API
- **CounterStore**: Simple counter with localStorage persistence
- **UserStore**: Manages user data and task lists
- **UIStore**: Handles UI state like selected list

All stores implement optimistic updates with automatic rollback on API failures.

## Features in Detail

### Task Management

- Create multiple task lists
- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Optimistic updates for better UX
- Error handling with rollback functionality
- Loading states and animations

### Contacts

- View contact list with grid layout
- Delete contacts
- Animated card entries
- Loading states

### Styling

- Custom CSS with component-scoped styles
- Automatic dark mode support
- Responsive design for mobile and desktop
- Smooth animations and transitions

## Migration Notes

This app was migrated from a Vite + React Router setup to Next.js 14 with App Router:

- React Router → Next.js App Router
- Vite config → Next.js config
- Added "use client" directives for client components
- Maintained all functionality and styling
- Improved with Next.js features (better routing, metadata, etc.)

## License

MIT

## Author

Migrated from Vite to Next.js

