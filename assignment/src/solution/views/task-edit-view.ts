import type { Task, TaskHandlers, FilterStatus } from "../types.js";
import { escapeHtml } from "./utils.js";

export function enterEditMode(
  li: HTMLLIElement,
  task: Task,
  handlers: TaskHandlers,
): void {
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

  checkbox.addEventListener("change", () => handlers.onToggle(task.id));

  li.querySelector<HTMLButtonElement>(".save-btn")!
    .addEventListener("click", () => {
      const newTitle = titleInput.value.trim();
      if (!newTitle) return;
      handlers.onEdit(task.id, newTitle, descInput.value.trim());
    });

  li.querySelector<HTMLButtonElement>(".cancel-btn")!
    .addEventListener("click", () => {
      const activeFilter =
        (document.querySelector(".filter-bar .active") as HTMLElement)?.dataset
          .filter as FilterStatus ?? "all";
      handlers.onFilter(activeFilter);
    });

  titleInput.focus();
}
