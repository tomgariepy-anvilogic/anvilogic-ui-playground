# React TypeScript Sample App

A sample React application built with TypeScript, demonstrating the use of `type` definitions instead of `interface`.

## Features

- ✅ React 18 with TypeScript
- ✅ Vite for fast development and building
- ✅ Type definitions using `type` instead of `interface`
- ✅ Sample components with TypeScript props
- ✅ Modern CSS with dark mode support
- ✅ Interactive examples (counter, user cards, todo list)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Button.tsx      # Button component with variants
│   ├── UserCard.tsx    # User display card
│   └── TodoList.tsx    # Todo list component
├── types.ts            # TypeScript type definitions (using 'type')
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## TypeScript Types

This project demonstrates using TypeScript `type` definitions instead of `interface`:

- `User` - User data structure
- `TodoItem` - Todo item structure
- `ButtonProps` - Button component props
- `UserCardProps` - UserCard component props
- `TodoListProps` - TodoList component props

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- React 18
- TypeScript 5
- Vite
- CSS3 with CSS Custom Properties
