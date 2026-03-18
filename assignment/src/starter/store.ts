import type { Task } from "../types.js";

export class TaskStore {
  private readonly STORAGE_KEY = "todo-tasks";

  load(): Task[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as Task[];
    } catch {
      return [];
    }
  }

  save(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }
}
