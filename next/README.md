# Next.js TypeScript Sample App

A modern web application built with Next.js 16, TypeScript, and Zustand for state management. This app demonstrates a complete task management system with contacts and a counter example, featuring server-side rendering and optimized standalone builds.

## Features

- **Task Management**: Create, edit, delete, and organize tasks in multiple lists
- **Contacts**: View and manage a contact list with full CRUD operations
- **Counter**: Simple counter example demonstrating state persistence
- **Server-Side Rendering (SSR)**: Initial data fetched on the server for optimal performance
- **Skeleton Loaders**: Animated loading states with custom CSS
- **Error Boundaries**: Graceful error handling with recovery options
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Responsive Design**: Mobile-friendly interface
- **Type Safety**: Full TypeScript implementation
- **State Management**: Zustand for efficient global state management
- **Standalone Build**: Optimized production builds for Docker and serverless deployments

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with improved performance
- **TypeScript 5** - Type-safe development
- **Zustand 5** - Lightweight state management
- **React Icons 5** - Icon library
- **ESLint 9** - Code linting
- **CSS** - Custom styling with dark mode support

## Getting Started

### Prerequisites

- **Node.js 20.19+** or **22.12+** (required for Next.js 16 and Vite 7)
- npm or yarn package manager

### Node Version Management

This project includes an `.nvmrc` file to ensure the correct Node.js version:

```bash
# Install Node.js 20 (if not already installed)
nvm install 20

# Use the correct Node.js version
nvm use
```

**Tip**: Add automatic Node version switching to your shell. See [nvm documentation](https://github.com/nvm-sh/nvm#deeper-shell-integration) for details.

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3456](http://localhost:3456) in your browser

### Available Scripts

- `npm run dev` - Start development server (port 3456)
- `npm run build` - Build for production with standalone output
- `npm run start` - Start production server (port 3456)
- `npm run start:standalone` - Run optimized standalone server
- `npm run lint` - Run ESLint

### Standalone Build

This project is configured for standalone builds, perfect for Docker containers and serverless deployments:

```bash
# Build the standalone version
npm run build

# Run the standalone server (much smaller footprint)
npm run start:standalone
```

The standalone build:
- **~80% smaller** than regular builds
- Only includes necessary dependencies
- Ideal for containerized deployments
- Faster cold starts

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
│   │   ├── page.tsx      # Server Component (SSR)
│   │   ├── TasksClient.tsx  # Client Component
│   │   ├── loading.tsx   # Loading UI with skeleton
│   │   └── error.tsx     # Error boundary
│   ├── contacts/          # Contacts page
│   │   ├── page.tsx      # Server Component (SSR)
│   │   ├── ContactsClient.tsx  # Client Component
│   │   ├── loading.tsx   # Loading UI with skeleton
│   │   └── error.tsx     # Error boundary
│   ├── counter/           # Counter example page
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (redirects to tasks)
│   ├── globals.css        # Global styles
│   └── skeleton.css       # Skeleton loader styles
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
│   ├── server-api.ts     # Server-side data fetching
│   └── mock-db/          # Mock database (in-memory)
│       ├── tasks.ts
│       └── contacts.ts
├── public/              # Static assets
├── .nvmrc               # Node.js version specification
└── next.config.js       # Next.js configuration (standalone mode)
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

## Server-Side Rendering (SSR)

This app leverages Next.js Server Components for optimal performance:

- **Initial data fetching**: User data, tasks, and contacts are fetched on the server
- **Faster page loads**: No client-side waterfalls
- **SEO-friendly**: Full HTML rendered on the server
- **Hydration**: Server data seamlessly hydrates client-side Zustand stores

Server-side fetching is done via `lib/server-api.ts` which reads directly from the mock database.

## State Management

This app uses Zustand for state management with the following stores:

- **TaskStore**: Manages tasks with optimistic updates and error handling, calls Task API
- **ContactsStore**: Handles contact CRUD operations, calls Contacts API
- **CounterStore**: Simple counter with localStorage persistence
- **UserStore**: Manages user data and task lists
- **UIStore**: Handles UI state like selected list

All stores implement:
- Optimistic updates with automatic rollback on API failures
- Server-side hydration support for SSR
- TypeScript for type safety

## Features in Detail

### Task Management

- Create multiple task lists
- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Optimistic updates for better UX
- Error handling with rollback functionality
- Animated skeleton loading states
- Server-side rendering for initial load

### Contacts

- View contact list with grid layout
- Delete contacts
- Animated card entries
- Skeleton loading states
- Error boundaries with retry functionality

### Loading States

- **Skeleton Loaders**: Animated placeholders that mimic content structure
- **Page-specific loading UI**: Each route has custom loading states
- **Consistent design**: Soft colors (#fafbfc) with dark mode support

### Error Handling

- **Error Boundaries**: Each page has an error.tsx for graceful error handling
- **Retry functionality**: Users can attempt to recover from errors
- **User-friendly messages**: Clear error descriptions

### Styling

- Custom CSS with component-scoped styles
- Centralized skeleton loader styles (`skeleton.css`)
- Automatic dark mode support
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Soft color palette for reduced eye strain

## Migration Notes

This app was migrated from a Vite + React Router setup to Next.js 16 with App Router:

- React Router → Next.js App Router
- Vite config → Next.js config
- Added "use client" directives for client components
- Implemented server-side rendering with data hydration
- Added loading and error components
- Replaced spinners with skeleton loaders
- Configured standalone build mode
- Maintained all functionality and styling
- Improved with Next.js features (better routing, metadata, SSR, etc.)

## Configuration

### Custom Port

The app runs on **port 3456** (instead of the default 3000) to avoid conflicts. You can change this in `package.json`:

```json
"scripts": {
  "dev": "next dev -p 3456",
  "start": "next start -p 3456"
}
```

### Standalone Output

Configured in `next.config.js`:

```javascript
module.exports = {
  output: 'standalone',
}
```

This creates an optimized, self-contained build perfect for Docker and serverless deployments.

## License

MIT

## Author

Migrated from Vite to Next.js with comprehensive improvements
