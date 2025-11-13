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
│   └── types.ts
└── public/              # Static assets
```

## State Management

This app uses Zustand for state management with the following stores:

- **TaskStore**: Manages tasks with optimistic updates and error handling
- **ContactsStore**: Handles contact CRUD operations
- **CounterStore**: Simple counter with localStorage persistence
- **UserStore**: Manages user data and task lists
- **UIStore**: Handles UI state like selected list

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

