import type { Task, FilterStatus, TaskHandlers } from "../types.js";
import {
  loadTasks,
  saveTasks,
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  filterTasks,
} from "./page.js";
import {
  createAppShell,
  renderTaskList,
  updateFilterButtons,
} from "./view.js";

// Application state
let tasks: Task[] = loadTasks();
let currentFilter: FilterStatus = "all";

/**
 * Re-render the visible task list and update the active filter button.
 */
function render(): void {
  const taskList = document.querySelector<HTMLUListElement>(".task-list");
  const filterBar = document.querySelector<HTMLDivElement>(".filter-bar");
  if (!taskList || !filterBar) return;

  const visible = filterTasks(tasks, currentFilter);
  renderTaskList(taskList, visible, handlers);
  updateFilterButtons(filterBar, currentFilter);
}

/**
 * Handlers passed to the View so it can notify Main of user actions.
 * Each handler updates the state, persists to localStorage, and re-renders.
 */
const handlers: TaskHandlers = {
  onAdd(title, description) {
    tasks = addTask(tasks, title, description);
    saveTasks(tasks);
    render();
  },
  onToggle(id) {
    tasks = toggleTask(tasks, id);
    saveTasks(tasks);
    render();
  },
  onDelete(id) {
    tasks = deleteTask(tasks, id);
    saveTasks(tasks);
    render();
  },
  onEdit(id, title, description) {
    tasks = editTask(tasks, id, title, description);
    saveTasks(tasks);
    render();
  },
  onFilter(status) {
    currentFilter = status;
    render();
  },
};

// Bootstrap the application
const app = document.getElementById("app");
if (app) {
  createAppShell(app, handlers);
  render();
}
