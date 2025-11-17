# React TypeScript Sample App

A sample React application built with TypeScript, Vite, React Router, and Zustand for state management. This app demonstrates modern React development patterns with a task management system, contacts, and interactive examples.

## Features

- ✅ **React 19** with TypeScript
- ✅ **Vite 7** for fast development and building
- ✅ **React Router 6** for client-side routing
- ✅ **Zustand** for lightweight state management
- ✅ Type definitions using `type` instead of `interface`
- ✅ Modern CSS with dark mode support
- ✅ Interactive examples (tasks, contacts, counter)
- ✅ Component animations and transitions
- ✅ Responsive design

## Tech Stack

- **React 19** - Latest React with improved performance
- **TypeScript 5** - Type-safe development
- **Vite 7** - Next generation frontend tooling
- **React Router DOM 6** - Client-side routing
- **Zustand 5** - Lightweight state management
- **React Icons 5** - Icon library
- **CSS3** - Modern styling with dark mode support

## Getting Started

### Prerequisites

- **Node.js 20.19+** or **22.12+** (required for Vite 7)
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

2. Start the development server:

```bash
npm run dev
```

3. Open your browser to [http://localhost:5173](http://localhost:5173)

## Project Structure

```
vite/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── common/         # Shared components
│   │   │   ├── Button/     # Button component with variants
│   │   │   ├── Header/     # App header
│   │   │   └── Navigation/ # Navigation menu
│   │   ├── contacts/       # Contact-related components
│   │   │   ├── UserCard/   # User display card
│   │   │   └── UserProfile/
│   │   └── tasks/          # Task-related components
│   │       ├── TaskList/   # Todo list component
│   │       └── TaskListItem/
│   ├── pages/              # Route pages
│   │   ├── TasksPage.tsx   # Task management page
│   │   ├── ContactsPage.tsx # Contacts page
│   │   └── CounterPage.tsx # Counter example
│   ├── store/              # Zustand stores
│   │   ├── useTaskStore.tsx
│   │   ├── useContactsStore.tsx
│   │   ├── useCounterStore.ts
│   │   ├── useUserStore.ts
│   │   └── useUIStore.ts
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main application component with router
│   ├── main.tsx            # Application entry point
│   ├── App.css             # App-level styles
│   └── index.css           # Global styles
├── public/                 # Static assets
├── .nvmrc                  # Node.js version specification
└── vite.config.ts          # Vite configuration
```

## TypeScript Types

This project demonstrates using TypeScript `type` definitions instead of `interface`:

- `User` - User data structure
- `TaskItem` - Task item structure
- `TaskList` - Task list structure
- `LoggedInUser` - Authenticated user with task lists
- Component props types (ButtonProps, etc.)

## Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## State Management

This app uses Zustand for state management with the following stores:

- **TaskStore**: Manages tasks with mock API calls and persistence
- **ContactsStore**: Handles contact data with mock API
- **CounterStore**: Simple counter with localStorage persistence
- **UserStore**: Manages user data and task lists
- **UIStore**: Handles UI state

All stores use Zustand's `persist` middleware for localStorage persistence where applicable.

## Features in Detail

### Task Management

- Create multiple task lists
- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Data persistence with localStorage
- Loading states with mock API delays
- Smooth animations

### Contacts

- View contact list with grid layout
- Delete contacts
- Animated card entries
- Mock API integration

### Counter

- Simple counter example
- Increment/decrement functionality
- State persistence across page reloads

### Styling

- Custom CSS with component-scoped styles
- Automatic dark mode support
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Modern color palette

## Development

### Fast Refresh

Vite provides instant HMR (Hot Module Replacement) for a smooth development experience.

### TypeScript

Full TypeScript support with strict type checking. All components and utilities are fully typed.

### Code Organization

- Components are organized by feature (common, contacts, tasks)
- Each component has its own directory with `.tsx`, `.css`, and `index.ts` files
- Stores are centralized in the `store/` directory
- Types are defined in `types.ts` for reusability

## Building for Production

```bash
npm run build
```

This will:
1. Run TypeScript compiler (`tsc`)
2. Bundle the application with Vite
3. Output optimized files to `dist/`

Preview the production build:

```bash
npm run preview
```

## Migration Path

This Vite app served as the original implementation before being migrated to Next.js. It demonstrates:

- Client-side routing with React Router
- State management patterns with Zustand
- Component architecture
- TypeScript best practices
- Modern CSS techniques

See the `../next/` directory for the Next.js version with server-side rendering, API routes, and additional optimizations.

## Technologies Used

- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Vite 7** - Build tool and dev server
- **React Router DOM 6** - Client-side routing
- **Zustand 5** - State management
- **React Icons 5** - Icon library
- **CSS3** - Styling with CSS Custom Properties

## License

MIT
