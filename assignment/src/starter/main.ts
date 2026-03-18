import { TaskManager } from './task-manager.js';
import { TaskStore } from './store.js';
import { View } from './view.js';
import type { FilterStatus, TaskHandlers } from './types.js';

const taskManager = new TaskManager(new TaskStore());
let currentFilter: FilterStatus = 'all';
let view: View;

function render(): void {
  view.render(taskManager.getFiltered(currentFilter), currentFilter);
}

const handlers: TaskHandlers = {
  onAdd(title, description) {
    taskManager.addTask(title, description);
    render();
  },
  onToggle(id) {
    taskManager.toggleTask(id);
    render();
  },
  onDelete(id) {
    taskManager.deleteTask(id);
    render();
  },
  onEdit(id, title, description) {
    taskManager.editTask(id, title, description);
    render();
  },
  onFilter(status) {
    currentFilter = status;
    render();
  },
};

const app = document.getElementById('app');
if (app) {
  view = new View(app, handlers);
  render();
}
