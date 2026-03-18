import type { Task, FilterStatus, TaskHandlers } from "./types.js";
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

let tasks: Task[] = loadTasks();
let currentFilter: FilterStatus = "all";

function render(): void {
  const taskList = document.querySelector<HTMLUListElement>(".task-list");
  const filterBar = document.querySelector<HTMLDivElement>(".filter-bar");
  if (!taskList || !filterBar) return;

  const visible = filterTasks(tasks, currentFilter);
  renderTaskList(taskList, visible, handlers);
  updateFilterButtons(filterBar, currentFilter);
}

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

const app = document.getElementById("app");
if (app) {
  createAppShell(app, handlers);
  render();
}
