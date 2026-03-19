# To-Do List Assignment

A browser-based To-Do List application. The app is fully working — but it's written in JavaScript. Your job is to convert it to TypeScript.

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Run the app in the browser and try it out — add, toggle, edit, delete, and filter tasks. Everything works. Now your goal is to make it type-safe.

## Architecture

```
src/
  main.js                   — coordinator that creates all objects and defines handlers
  store.js                  — reads/writes tasks in localStorage
  task-manager.js           — owns the task array, delegates persistence to TaskStore
  views/
    app-view.js             — builds the app shell (form, filter bar), owns TaskListView
    task-list-view.js       — renders the task list into <ul>
    task-edit-view.js       — enterEditMode() replaces a task row with an inline edit form
    utils.js                — escapeHtml helper
```

Data flows in one direction: **user action → handler → mutate data (TaskManager) → re-render (AppView)**.

## Your Task

Convert the JavaScript app in `src/` to TypeScript. Work through the steps below in order.

### Step 1 — Rename `.js` files to `.ts`

Rename every `.js` file in `src/` (and `src/views/`) to `.ts`. Update the script source in `index.html` accordingly:

```html
<script type="module" src="/src/main.ts"></script>
```

After renaming, the app will still run in the browser (Vite handles `.ts` files), but `npx tsc --noEmit` will report errors. The rest of the steps fix those errors.

### Step 2 — Create a `types.ts` file

Create `src/types.ts` with the shared type definitions the app needs:

1. A `Task` interface — read the other files to discover what properties a task has (look at `task-list-view.ts` and `task-manager.ts` for clues).
2. A `FilterStatus` type — the filter buttons in `app-view.ts` have `data-filter` attributes with the valid values.
3. A `TaskHandlers` interface — look at how the `handlers` object is used in `main.ts` to determine the shape.

### Step 3 — Add type annotations

Go through each file and add TypeScript annotations:

- **Function parameters and return types** — every function and method should have typed parameters. Add return types where they aren't obvious.
- **Class properties** — declare typed properties for fields like `tasks`, `store`, `root`, `handlers`, etc. Mark properties that shouldn't change as `readonly`, and properties that shouldn't be accessed from outside as `private`.
- **Constructor shorthand** — where a constructor just assigns a parameter to `this`, you can use TypeScript's parameter property shorthand: `constructor(private readonly store: TaskStore)`.
- **Import your types** — add `import type { ... }` statements to pull in `Task`, `FilterStatus`, and `TaskHandlers` where needed.

### Step 4 — Type the DOM queries

The `querySelector` calls currently return `Element | null`. TypeScript doesn't know you're getting an `HTMLInputElement` or `HTMLButtonElement`. Fix this by:

- Adding a generic type parameter: `querySelector<HTMLInputElement>(".edit-title")`
- Using the non-null assertion operator (`!`) where you're certain the element exists.

### Step 5 — Handle type casts

A couple of places need explicit type assertions:

- `btn.dataset.filter` returns `string | undefined`, but you know it's a valid `FilterStatus` — use `as FilterStatus`.
- Similar patterns appear in the edit view's cancel button handler.

## Checking Your Work

Run the type checker from the `assignment/` folder:

```bash
npx tsc --noEmit
```

It should pass with zero errors. Then test the app in the browser — everything should still work exactly as before.

## Features

- Create tasks with a title and optional description
- Toggle task completion (checkbox + strikethrough)
- Edit tasks inline
- Delete tasks
- Filter by All / Pending / Completed
- Data persists across page refreshes (localStorage)
