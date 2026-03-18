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

export class View {
  private taskList: HTMLUListElement;
  private filterBar: HTMLDivElement;

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
   * 2. Use querySelector to find the form, title input, description input,
   *    .task-list, and .filter-bar. Store taskList and filterBar on `this`.
   * 3. Add a "submit" listener on the form that calls handlers.onAdd with the
   *    trimmed title and description, then resets the form.
   * 4. Use querySelectorAll to find filter buttons and add "click" listeners
   *    that call handlers.onFilter with the button's data-filter value.
   */
  constructor(root: HTMLElement, handlers: TaskHandlers) {
    // TODO: Set root.innerHTML using a String.raw template with the HTML above

    // TODO: querySelector for the form, #title-input, #desc-input
    // TODO: querySelector .task-list and .filter-bar — assign to this.taskList and this.filterBar

    // TODO: addEventListener("submit") on the form — call handlers.onAdd

    // TODO: querySelectorAll filter buttons — addEventListener("click") for each

    // These placeholder assignments satisfy tsc — replace them with real queries
    this.taskList = root.querySelector(".task-list")!;
    this.filterBar = root.querySelector(".filter-bar")!;
  }

  /**
   * Render the list of tasks into the task list element.
   *
   * Steps:
   * 1. If tasks is empty, set this.taskList.innerHTML to a single
   *    <li class="empty-state">No tasks to show.</li> and return.
   * 2. Otherwise, set this.taskList.innerHTML by mapping tasks to HTML strings:
   *    Each task becomes a <li class="task-item" data-id="..."> containing:
   *      - <input type="checkbox"> (checked if completed)
   *      - <div class="task-content"> with .task-title and .task-description
   *      - <div class="task-actions"> with .edit-btn and .delete-btn buttons
   *    Use escapeHtml() on task.title and task.description!
   * 3. After setting innerHTML, querySelectorAll(".task-item") and for each li:
   *      - Find the checkbox → addEventListener("change") → handlers.onToggle(id)
   *      - Find .edit-btn → addEventListener("click") → this.enterEditMode(li, task, handlers)
   *      - Find .delete-btn → addEventListener("click") → handlers.onDelete(id)
   */
  renderTaskList(tasks: Task[], handlers: TaskHandlers): void {
    // TODO: Handle empty state — set this.taskList.innerHTML to empty-state li

    // TODO: Set this.taskList.innerHTML using tasks.map() with String.raw templates
    //       Remember to use escapeHtml() on title and description

    // TODO: querySelectorAll(".task-item") and attach event listeners
  }

  /**
   * Update the filter buttons to show which filter is currently active.
   * Find all buttons with a data-filter attribute inside this.filterBar,
   * and toggle the "active" class based on whether data-filter matches activeFilter.
   */
  updateFilterButtons(activeFilter: FilterStatus): void {
    // TODO: Query all buttons with [data-filter] and toggle the "active" class
  }

  /**
   * Replace a task's display HTML with an inline edit form.
   *
   * Steps:
   * 1. Set li.innerHTML to an edit form with:
   *    - A checkbox (checked if task.completed)
   *    - Two text inputs (.edit-title, .edit-desc) pre-filled with task values
   *    - Save and Cancel buttons
   * 2. Attach listeners:
   *    - checkbox change → handlers.onToggle(task.id)
   *    - save click → handlers.onEdit with trimmed values (skip if title empty)
   *    - cancel click → handlers.onFilter with current active filter to re-render
   * 3. Focus the title input
   */
  private enterEditMode(
    li: HTMLLIElement,
    task: Task,
    handlers: TaskHandlers,
  ): void {
    // TODO: Set li.innerHTML with edit form template

    // TODO: querySelector for checkbox, .edit-title, .edit-desc

    // TODO: Attach event listeners for checkbox, save, and cancel

    // TODO: Focus the title input
  }
}
