import type { Task, TaskHandlers, FilterStatus } from "../types.js";

/**
 * Escape special HTML characters to prevent XSS when interpolating
 * user input into innerHTML templates.
 */
function escapeHtml(str: string): string {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Build the entire app shell inside the root element.
 *
 * Steps:
 * 1. Set root.innerHTML using a String.raw template with this structure:
 *      <h1>To-Do List</h1>
 *      <form class="todo-form">
 *        <input type="text" id="title-input" placeholder="Task title" required>
 *        <input type="text" id="desc-input" placeholder="Description (optional)">
 *        <button type="submit">Add Task</button>
 *      </form>
 *      <div class="filter-bar">
 *        <button type="button" data-filter="all" class="active">All</button>
 *        <button type="button" data-filter="pending">Pending</button>
 *        <button type="button" data-filter="completed">Completed</button>
 *      </div>
 *      <ul class="task-list"></ul>
 *
 * 2. Use querySelector to find the form, title input, and description input.
 * 3. Add a "submit" listener on the form that calls handlers.onAdd with the
 *    trimmed title and description, then resets the form.
 * 4. Use querySelectorAll to find filter buttons and add "click" listeners
 *    that call handlers.onFilter with the button's data-filter value.
 */
export function createAppShell(
  root: HTMLElement,
  handlers: TaskHandlers,
): void {
  // TODO: Set root.innerHTML using a String.raw template with the HTML above

  // TODO: querySelector for the form, #title-input, and #desc-input

  // TODO: addEventListener("submit") on the form — call handlers.onAdd

  // TODO: querySelectorAll filter buttons — addEventListener("click") for each
}

/**
 * Render the list of tasks into the container element.
 *
 * Steps:
 * 1. If tasks is empty, set container.innerHTML to a single
 *    <li class="empty-state">No tasks to show.</li> and return.
 * 2. Otherwise, set container.innerHTML by mapping tasks to HTML strings:
 *    Each task becomes a <li class="task-item" data-id="..."> containing:
 *      - <input type="checkbox"> (checked if completed)
 *      - <div class="task-content"> with .task-title and .task-description
 *      - <div class="task-actions"> with .edit-btn and .delete-btn buttons
 *    Use escapeHtml() on task.title and task.description!
 * 3. After setting innerHTML, querySelectorAll(".task-item") and for each li:
 *      - Find the checkbox → addEventListener("change") → handlers.onToggle(id)
 *      - Find .edit-btn → addEventListener("click") → enterEditMode(li, task, handlers)
 *      - Find .delete-btn → addEventListener("click") → handlers.onDelete(id)
 */
export function renderTaskList(
  container: HTMLElement,
  tasks: Task[],
  handlers: TaskHandlers,
): void {
  // TODO: Handle empty state — set innerHTML to empty-state li

  // TODO: Set container.innerHTML using tasks.map() with String.raw templates
  //       Remember to use escapeHtml() on title and description

  // TODO: querySelectorAll(".task-item") and attach event listeners
}

/**
 * Update the filter buttons to show which filter is currently active.
 * Find all buttons with a data-filter attribute inside the container,
 * and toggle the "active" class based on whether data-filter matches activeFilter.
 */
export function updateFilterButtons(
  container: HTMLElement,
  activeFilter: FilterStatus,
): void {
  // TODO: Query all buttons with [data-filter] and toggle the "active" class
}

/**
 * Reset the form fields to their default values.
 */
export function clearForm(form: HTMLFormElement): void {
  // TODO: Call form.reset()
}
