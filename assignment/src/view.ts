import type { Task, TaskHandlers, FilterStatus } from "./types.js";

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
  private handlers: TaskHandlers;

  constructor(root: HTMLElement, handlers: TaskHandlers) {
    this.handlers = handlers;

    root.innerHTML = String.raw`
    <h1>To-Do List</h1>
    <form class="todo-form">
      <input type="text" id="title-input" placeholder="Task title" required>
      <input type="text" id="desc-input" placeholder="Description (optional)">
      <button type="submit">Add Task</button>
    </form>
    <div class="filter-bar">
      <button type="button" data-filter="all" class="active">All</button>
      <button type="button" data-filter="pending">Pending</button>
      <button type="button" data-filter="completed">Completed</button>
    </div>
    <ul class="task-list"></ul>`;

    const form = root.querySelector<HTMLFormElement>(".todo-form")!;
    const titleInput = root.querySelector<HTMLInputElement>("#title-input")!;
    const descInput = root.querySelector<HTMLInputElement>("#desc-input")!;
    this.taskList = root.querySelector<HTMLUListElement>(".task-list")!;
    this.filterBar = root.querySelector<HTMLDivElement>(".filter-bar")!;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = titleInput.value.trim();
      if (!title) return;
      this.handlers.onAdd(title, descInput.value.trim());
      form.reset();
    });

    for (const btn of root.querySelectorAll<HTMLButtonElement>(
      ".filter-bar button",
    )) {
      btn.addEventListener("click", () => {
        this.handlers.onFilter(btn.dataset.filter as FilterStatus);
      });
    }
  }

  render(tasks: Task[], activeFilter: FilterStatus): void {
    this.renderTaskList(tasks);
    this.updateFilterButtons(activeFilter);
  }

  private renderTaskList(tasks: Task[]): void {
    if (tasks.length === 0) {
      this.taskList.innerHTML = `<li class="empty-state">No tasks to show.</li>`;
      return;
    }

    this.taskList.innerHTML = tasks
      .map(
        (task) => String.raw`
      <li class="task-item${task.completed ? " completed" : ""}" data-id="${task.id}">
        <input type="checkbox"${task.completed ? " checked" : ""}>
        <div class="task-content">
          <div class="task-title">${escapeHtml(task.title)}</div>
          <div class="task-description">${escapeHtml(task.description)}</div>
        </div>
        <div class="task-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </li>`,
      )
      .join("");

    for (const li of this.taskList.querySelectorAll<HTMLLIElement>(".task-item")) {
      const id = li.dataset.id!;
      const task = tasks.find((t) => t.id === id)!;

      li.querySelector<HTMLInputElement>("input[type='checkbox']")!
        .addEventListener("change", () => this.handlers.onToggle(id));

      li.querySelector<HTMLButtonElement>(".edit-btn")!
        .addEventListener("click", () => this.enterEditMode(li, task));

      li.querySelector<HTMLButtonElement>(".delete-btn")!
        .addEventListener("click", () => this.handlers.onDelete(id));
    }
  }

  private updateFilterButtons(activeFilter: FilterStatus): void {
    const buttons = this.filterBar.querySelectorAll<HTMLButtonElement>("[data-filter]");
    for (const btn of buttons) {
      btn.classList.toggle("active", btn.dataset.filter === activeFilter);
    }
  }

  private enterEditMode(li: HTMLLIElement, task: Task): void {
    li.innerHTML = String.raw`
    <input type="checkbox"${task.completed ? " checked" : ""}>
    <div class="edit-form">
      <input type="text" class="edit-title" value="${escapeHtml(task.title)}">
      <input type="text" class="edit-desc" value="${escapeHtml(task.description)}">
      <div class="edit-actions">
        <button class="save-btn">Save</button>
        <button class="cancel-btn">Cancel</button>
      </div>
    </div>`;

    const checkbox = li.querySelector<HTMLInputElement>("input[type='checkbox']")!;
    const titleInput = li.querySelector<HTMLInputElement>(".edit-title")!;
    const descInput = li.querySelector<HTMLInputElement>(".edit-desc")!;

    checkbox.addEventListener("change", () => this.handlers.onToggle(task.id));

    li.querySelector<HTMLButtonElement>(".save-btn")!
      .addEventListener("click", () => {
        const newTitle = titleInput.value.trim();
        if (!newTitle) return;
        this.handlers.onEdit(task.id, newTitle, descInput.value.trim());
      });

    li.querySelector<HTMLButtonElement>(".cancel-btn")!
      .addEventListener("click", () => {
        const activeFilter =
          (document.querySelector(".filter-bar .active") as HTMLElement)?.dataset
            .filter as FilterStatus ?? "all";
        this.handlers.onFilter(activeFilter);
      });

    titleInput.focus();
  }
}
