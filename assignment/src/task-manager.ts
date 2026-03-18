import type { Task, FilterStatus } from "./types.js";
import type { TaskStore } from "./store.js";

export class TaskManager {
  private tasks: Task[] = [];

  constructor(private readonly store: TaskStore) {
    this.tasks = store.load();
  }

  private save(): void {
    this.store.save(this.tasks);
  }

  addTask(title: string, description: string): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
    };
    this.tasks = [newTask, ...this.tasks];
    this.save();
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.save();
  }

  toggleTask(id: string): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    this.save();
  }

  editTask(id: string, title: string, description: string): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, title, description } : task,
    );
    this.save();
  }

  getFiltered(status: FilterStatus): Task[] {
    switch (status) {
      case "all":
        return this.tasks;
      case "completed":
        return this.tasks.filter((task) => task.completed);
      case "pending":
        return this.tasks.filter((task) => !task.completed);
    }
  }
}
