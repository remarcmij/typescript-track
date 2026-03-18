# To-Do List Assignment

A browser-based To-Do List application built with TypeScript and Vite. This assignment practices CRUD operations, DOM manipulation, localStorage persistence, and modular code architecture.

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Architecture

The app is split into three modules:

| Module   | File      | Responsibility                          |
| -------- | --------- | --------------------------------------- |
| **Page** | `page.ts` | Business logic, localStorage, pure functions |
| **View** | `view.ts` | All DOM creation and manipulation       |
| **Main** | `main.ts` | Owns state, wires handlers, calls render |

Data flows in one direction: **user action → handler → update state → save → re-render**.

### Types (`src/types.ts`)

Shared type definitions used by all modules:

- `Task` — the data model (id, title, description, completed)
- `FilterStatus` — `"all" | "completed" | "pending"`
- `TaskHandlers` — callback signatures that View uses to notify Main of user actions

### Page (`src/page.ts`)

Pure functions with no DOM access:

- `loadTasks()` / `saveTasks()` — localStorage read/write
- `addTask()`, `deleteTask()`, `toggleTask()`, `editTask()` — return new arrays (immutable pattern)
- `filterTasks()` — returns a subset based on filter status

### View (`src/view.ts`)

All DOM creation and event wiring:

- `createAppShell()` — builds the form, filter bar, and task list container
- `renderTaskList()` — clears and rebuilds the task list from current data
- `updateFilterButtons()` — highlights the active filter

### Main (`src/main.ts`)

The coordinator:

- Holds mutable state (`tasks` and `currentFilter`)
- Creates handler functions that update state → save → render
- Bootstraps the app on load

## Your Task

The `src/starter/` directory contains stub versions of `page.ts` and `view.ts` with full type signatures and TODO comments. The `main.ts` in the starter folder is provided complete.

To work on the starter version, change the script source in `index.html`:

```html
<!-- Change this: -->
<script type="module" src="/src/main.ts"></script>

<!-- To this: -->
<script type="module" src="/src/starter/main.ts"></script>
```

Implement the TODO functions in `src/starter/page.ts` and `src/starter/view.ts`. Use the reference implementation in `src/` if you get stuck.

## Features

- Create tasks with a title and optional description
- Toggle task completion (checkbox + strikethrough)
- Edit tasks inline
- Delete tasks
- Filter by All / Pending / Completed
- Data persists across page refreshes (localStorage)
