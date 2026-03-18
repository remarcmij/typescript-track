import type { Task, FilterStatus } from "../types.js";
import type { TaskStore } from "./store.js";

export class Page {
  private tasks: Task[] = [];

  constructor(private readonly store: TaskStore) {
    this.tasks = store.load();
  }

  /**
   * Save the tasks array by delegating to the injected store.
   */
  private save(): void {
    // TODO: Call this.store.save() with this.tasks
  }

  /**
   * Create a new task and prepend it to this.tasks.
   * Use crypto.randomUUID() to generate a unique id.
   * Don't forget to call this.save() after updating.
   */
  addTask(title: string, description: string): void {
    // TODO: Create a new Task object with a unique id, the given title and
    //       description, and completed set to false
    // TODO: Prepend it to this.tasks
    // TODO: Call this.save()
  }

  /**
   * Remove the task with the given id from this.tasks.
   * Don't forget to call this.save() after updating.
   */
  deleteTask(id: string): void {
    // TODO: Filter out the task with the matching id
    // TODO: Call this.save()
  }

  /**
   * Flip the completed status of the task with the given id.
   * Don't forget to call this.save() after updating.
   */
  toggleTask(id: string): void {
    // TODO: Map over this.tasks and flip the completed property of the
    //       task that matches the id
    // TODO: Call this.save()
  }

  /**
   * Update the title and description of the task with the given id.
   * Don't forget to call this.save() after updating.
   */
  editTask(id: string, title: string, description: string): void {
    // TODO: Map over this.tasks and update the title and description of
    //       the task that matches the id
    // TODO: Call this.save()
  }

  /**
   * Return a filtered view of the tasks based on the given status.
   * "all" → all tasks, "completed" → only completed, "pending" → only not completed.
   */
  getFiltered(status: FilterStatus): Task[] {
    // TODO: Return the appropriate subset of this.tasks based on the status
    return [];
  }
}
