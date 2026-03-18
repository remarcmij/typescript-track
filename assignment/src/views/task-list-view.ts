import type { Task, TaskHandlers } from "../types.js";
import { escapeHtml } from "./utils.js";
import { enterEditMode } from "./task-edit-view.js";

export class TaskListView {
  constructor(
    private readonly root: HTMLUListElement,
    private readonly handlers: TaskHandlers,
  ) {}

  render(tasks: Task[]): void {
    if (tasks.length === 0) {
      this.root.innerHTML = `<li class="empty-state">No tasks to show.</li>`;
      return;
    }

    this.root.innerHTML = tasks
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

    for (const li of this.root.querySelectorAll<HTMLLIElement>(".task-item")) {
      const id = li.dataset.id!;
      const task = tasks.find((t) => t.id === id)!;

      li.querySelector<HTMLInputElement>("input[type='checkbox']")!
        .addEventListener("change", () => this.handlers.onToggle(id));

      li.querySelector<HTMLButtonElement>(".edit-btn")!
        .addEventListener("click", () => {
          enterEditMode(li, task, this.handlers);
        });

      li.querySelector<HTMLButtonElement>(".delete-btn")!
        .addEventListener("click", () => this.handlers.onDelete(id));
    }
  }
}
