import { Page } from "./page.js";
import { TaskStore } from "./store.js";
import { View } from "./view.js";
import type { FilterStatus, TaskHandlers } from "./types.js";

const page = new Page(new TaskStore());
let currentFilter: FilterStatus = "all";
let view: View;

function render(): void {
  view.renderTaskList(page.getFiltered(currentFilter), handlers);
  view.updateFilterButtons(currentFilter);
}

const handlers: TaskHandlers = {
  onAdd(title, description) {
    page.addTask(title, description);
    render();
  },
  onToggle(id) {
    page.toggleTask(id);
    render();
  },
  onDelete(id) {
    page.deleteTask(id);
    render();
  },
  onEdit(id, title, description) {
    page.editTask(id, title, description);
    render();
  },
  onFilter(status) {
    currentFilter = status;
    render();
  },
};

const app = document.getElementById("app");
if (app) {
  view = new View(app, handlers);
  render();
}
