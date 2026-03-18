# To-Do List Assignment

A browser-based To-Do List application built with TypeScript and Vite. This assignment practices CRUD operations, DOM manipulation, localStorage persistence, and modular code architecture.

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Architecture

The app is split into four modules:

| Module        | File       | Responsibility                                        |
| ------------- | ---------- | ----------------------------------------------------- |
| **TaskStore** | `store.ts` | Class that reads/writes tasks in localStorage          |
| **Page**      | `page.ts`  | Class that owns the task array, delegates persistence to TaskStore |
| **View**      | `view.ts`  | Class that owns the DOM — renders and wires events     |
| **Main**      | `main.ts`  | Coordinator that creates all objects and defines handlers |

Data flows in one direction: **user action → handler → mutate data (Page) → re-render (View)**.

### Types (`src/types.ts`)

Shared type definitions used by all modules:

- `Task` — the data model (id, title, description, completed)
- `FilterStatus` — `"all" | "completed" | "pending"`
- `TaskHandlers` — callback signatures that View uses to notify Main of user actions

### TaskStore (`src/store.ts`)

A small class that isolates all localStorage access:

- `load()` — reads and parses tasks from localStorage (returns `[]` on missing/invalid data)
- `save(tasks)` — serializes the task array to localStorage

Main creates a `TaskStore` and injects it into `Page`. Because `Page` never touches `localStorage` directly, you could swap in a different store (e.g. an in-memory fake) for testing.

### Page (`src/page.ts`)

A class that encapsulates the task array. It has no DOM or localStorage access:

- **Constructor** — takes a `TaskStore` and loads the initial tasks from it
- `addTask(title, description)` — creates a new task, prepends it, and saves via the store
- `deleteTask(id)` — removes a task by id and saves
- `toggleTask(id)` — flips a task's `completed` flag and saves
- `editTask(id, title, description)` — updates a task's text and saves
- `getFiltered(status)` — returns tasks matching the current filter

### View (`src/view.ts`)

A class that owns the DOM elements. It never touches localStorage or task data directly:

- **Constructor** — receives the root element and handlers, builds the app shell (form, filter bar, task list), and wires form/filter events
- `renderTaskList(tasks, handlers)` — clears and rebuilds the `<ul>` from the given task array, attaching checkbox/edit/delete listeners
- `updateFilterButtons(activeFilter)` — highlights the active filter button

### Main (`src/main.ts`)

The coordinator script — not a class, just top-level code that wires everything together:

- Creates a `TaskStore`, injects it into a new `Page`, and creates a `View`
- Holds `currentFilter` (the only piece of state that doesn't belong to either class)
- Defines a `handlers` object whose callbacks call Page methods then re-render via View
- Bootstraps the app on load

### Why do handlers live in main.ts?

`Page` knows nothing about the DOM and `View` knows nothing about localStorage. Each handler needs to coordinate both: mutate data (Page) then update the screen (View). That coordination doesn't belong inside either class — it's the job of a separate coordinator.

Look at `onAdd` as an example: it calls `page.addTask()` then calls `render()`, which asks Page for filtered data and hands it to View. Neither class could do both steps on its own without knowing about the other.

`onFilter` makes the pattern even clearer — it only updates `currentFilter` and re-renders. It never touches Page at all, which proves these handlers aren't data logic. They're glue code that sits between the two classes.

This separation keeps each class independently testable: you can test Page without a DOM and View without localStorage.

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
