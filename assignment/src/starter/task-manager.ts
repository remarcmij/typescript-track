import type { Task, FilterStatus } from './types.js';
import type { TaskStore } from './store.js';

export class TaskManager {
  // TODO: Replace `any[]` with `Task[]`
  private tasks: any[] = [];

  constructor(private readonly store: TaskStore) {
    this.tasks = store.load();
  }

  private save(): void {
    this.store.save(this.tasks);
  }

  addTask(title: string, description: string): void {
    // TODO
  }

  deleteTask(id: string): void {
    // TODO
  }

  toggleTask(id: string): void {
    // TODO
  }

  editTask(id: string, title: string, description: string): void {
    // TODO
  }

  // TODO: Replace `any[]` with `Task[]`
  getFiltered(status: FilterStatus): any[] {
    // TODO
    return [];
  }
}
