# React & Next.js Playground

A comparative implementation of a task management application built with modern React frameworks and TypeScript. This repository demonstrates the same application architecture implemented in both **Vite + React Router** and **Next.js App Router**, showcasing the differences and advantages of each approach.

## 🎯 Purpose

This repository serves as:
- **Learning resource** for comparing Vite and Next.js development patterns
- **Migration example** showing how to convert a Vite app to Next.js
- **Practical demonstration** of modern React development with TypeScript, state management, and routing
- **Reference implementation** for task management with CRUD operations, state persistence, and error handling

## 📁 Projects

### 1. Vite App (`/vite`)

A client-side React application built with Vite 7, React Router 6, and Zustand.

**Key Features:**
- ⚡ **Vite 7** - Lightning-fast HMR and builds
- 🗺️ **React Router 6** - Client-side routing
- 📦 **Zustand** - Lightweight state management with persistence
- 🎨 **CSS Modules** - Component-scoped styling
- 🌙 **Dark Mode** - Automatic system preference support

**Tech Stack:**
- React 19 + TypeScript 5
- Vite 7 + React Router 6
- Zustand 5 for state management
- React Icons 5

[📖 Full Documentation →](./vite/README.md)

**Quick Start:**
```bash
cd vite
nvm use          # Use Node.js 20
npm install
npm run dev      # http://localhost:5173
```

---

### 2. Next.js App (`/next`)

A server-side rendered Next.js application with API routes and optimized standalone builds.

**Key Features:**
- 🚀 **Next.js 16** - App Router with Server Components
- 🔄 **Server-Side Rendering (SSR)** - Initial data fetched on server
- 🛣️ **API Routes** - RESTful endpoints with Route Handlers
- ⚡ **Standalone Build** - Optimized for Docker/serverless (~80% smaller)
- 🎭 **Skeleton Loaders** - Smooth loading states with animations
- 🛡️ **Error Boundaries** - Graceful error handling per route
- 🌙 **Dark Mode** - Automatic system preference support

**Tech Stack:**
- Next.js 16 + React 19 + TypeScript 5
- Zustand 5 for client state management
- Next.js API Routes for backend
- React Icons 5

[📖 Full Documentation →](./next/README.md)

**Quick Start:**
```bash
cd next
nvm use          # Use Node.js 20
npm install
npm run dev      # http://localhost:3456
```

---

## 🔄 Key Differences

| Feature | Vite App | Next.js App |
|---------|----------|-------------|
| **Rendering** | Client-side only (CSR) | Server-side + Client (SSR/CSR) |
| **Routing** | React Router 6 | Next.js App Router |
| **API Layer** | Mock in Zustand stores | Next.js API Routes |
| **Data Fetching** | Client-side only | Server + Client hydration |
| **Loading States** | React state | `loading.tsx` components |
| **Error Handling** | Try/catch in components | `error.tsx` boundaries |
| **Build Output** | Static SPA | Standalone server bundle |
| **Initial Load** | Slower (client JS + data fetch) | Faster (SSR + hydrated data) |
| **SEO** | Limited | Full support |
| **Deployment** | Static hosting (Netlify, Vercel) | Node server, Docker, serverless |

## 🎓 What You'll Learn

### From the Vite Implementation:
- Modern Vite configuration and dev workflow
- Client-side routing with React Router
- State management patterns with Zustand
- Mock API integration in stores
- Component organization and CSS architecture

### From the Next.js Implementation:
- Next.js App Router and Server Components
- Server-side data fetching and hydration
- API Routes with Route Handlers
- Loading UI patterns with skeleton loaders
- Error boundary implementation
- Standalone build optimization
- SSR performance benefits

### Migration Insights:
- Converting React Router to Next.js routing
- Refactoring client components with `"use client"`
- Extracting mock APIs into proper API routes
- Implementing server-side data fetching
- Optimizing initial page loads with SSR

## 🏗️ Application Features

Both implementations include:

### Task Management
- ✅ Create multiple task lists
- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Optimistic updates with error rollback
- ✅ Data persistence

### Contacts
- 👥 View contact list with grid layout
- 🗑️ Delete contacts
- ✨ Smooth animations

### Counter Example
- 🔢 Simple counter with increment/decrement
- 💾 State persistence across sessions

### UI/UX
- 🎨 Modern, clean design
- 📱 Fully responsive
- 🌙 Dark mode support
- ⚡ Smooth animations and transitions
- 🦴 Skeleton loaders (Next.js)
- 🛡️ Error boundaries with retry (Next.js)

## 🛠️ Prerequisites

- **Node.js 20.19+** or **22.12+** (specified in `.nvmrc` files)
- npm or yarn package manager
- nvm (recommended for Node version management)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd playground

# Install dependencies for both projects
cd vite && npm install && cd ..
cd next && npm install && cd ..
```

## 🚀 Running the Projects

### Both simultaneously:
```bash
# Terminal 1 - Vite
cd vite && npm run dev

# Terminal 2 - Next.js
cd next && npm run dev
```

- Vite app: http://localhost:5173
- Next.js app: http://localhost:3456

## 📝 License

MIT

## 🤝 Contributing

This is a learning repository. Feel free to fork, experiment, and adapt for your own needs!

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Router Documentation](https://reactrouter.com/)

---

**Happy Coding!** 🚀

