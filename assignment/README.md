# To-Do List Assignment

A browser-based To-Do List application built with TypeScript and Vite.

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

To work on the starter version, change the script source in `index.html`:

```html
<!-- Change this: -->
<script type="module" src="/src/main.ts"></script>

<!-- To this: -->
<script type="module" src="/src/starter/main.ts"></script>
```

## Architecture

```
src/
  types.ts                  — shared type definitions
  store.ts                  — reads/writes tasks in localStorage
  task-manager.ts           — owns the task array, delegates persistence to TaskStore
  views/
    app-view.ts             — builds the app shell (form, filter bar), owns TaskListView
    task-list-view.ts       — renders the task list into <ul>
    task-edit-view.ts       — enterEditMode() replaces a task row with an inline edit form
    utils.ts                — escapeHtml helper
  main.ts                   — coordinator that creates all objects and defines handlers
```

Data flows in one direction: **user action → handler → mutate data (TaskManager) → re-render (AppView)**.

## Your Task

The `src/starter/` folder contains a working app — but it cheats. Type definitions are incomplete and `any` is used in several places, which means TypeScript can't catch mistakes. Your job is to make the code fully type-safe.

Start with two files: `types.ts` and `task-manager.ts`. The view files have a few `any` placeholders to fix as well once your types are in place.

### Step 1 — Complete the type definitions (`types.ts`)

The starter has stub types that compile but provide no safety:

```ts
export interface Task {}          // empty — no properties checked
export type FilterStatus = any;   // accepts anything, not just the 3 valid filters
```

`TaskHandlers` is already complete — you can use it as a reference.

Read the other files to discover what properties `Task` needs and what values `FilterStatus` should accept. Hints:

- `task-list-view.ts` accesses properties on each task (`.id`, `.title`, etc.) — what types should they be?
- The filter buttons in `app-view.ts` have `data-filter` attributes with the valid filter values.

### Step 2 — Implement the TaskManager methods (`task-manager.ts`)

Five methods have `// TODO` bodies. The method signatures tell you everything you need:

- `addTask(title, description)` — create a `Task` object and prepend it to `this.tasks`
- `deleteTask(id)` — remove the task with the given id
- `toggleTask(id)` — flip the `completed` flag on the matching task
- `editTask(id, title, description)` — update the title and description on the matching task
- `getFiltered(status)` — return tasks matching the filter status

Each method should call `this.save()` after modifying the array (except `getFiltered`, which is read-only).

### Step 3 — Replace `any` with proper types

Once your types are complete, search for `any` across the starter files and replace each one with the correct type. You'll find them in:

- `task-manager.ts` — `any[]` → `Task[]` (the tasks array and getFiltered return type)
- `app-view.ts` — `any[]` → `Task[]` (the render method)
- `task-list-view.ts` — `any[]` → `Task[]` (the render method)
- `task-edit-view.ts` — `any` → `Task` (the task parameter)

After replacing all `any` types, run `npx tsc --noEmit` from the `assignment/` folder — it should pass with zero errors.

## Checking Your Work

Run the type checker:

```bash
npx tsc --noEmit
```

Then test the app in the browser — you should be able to add, toggle, edit, delete, and filter tasks, with data persisting across page refreshes.

If you get stuck, the reference implementation in `src/` (outside `starter/`) contains the complete solution.

## Features

- Create tasks with a title and optional description
- Toggle task completion (checkbox + strikethrough)
- Edit tasks inline
- Delete tasks
- Filter by All / Pending / Completed
- Data persists across page refreshes (localStorage)
