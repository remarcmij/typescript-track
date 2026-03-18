import type { Task, FilterStatus } from "../types.js";

const STORAGE_KEY = "todo-tasks";

/**
 * Load tasks from localStorage.
 * Parse the JSON string and return the array of tasks.
 * If there is no data or parsing fails, return an empty array.
 */
export function loadTasks(): Task[] {
  // TODO: Read from localStorage using STORAGE_KEY
  // TODO: Parse the JSON string into an array of Task objects
  // TODO: Return an empty array if nothing is stored or if parsing fails
  return [];
}

/**
 * Save the tasks array to localStorage as a JSON string.
 */
export function saveTasks(tasks: Task[]): void {
  // TODO: Convert the tasks array to a JSON string
  // TODO: Store it in localStorage using STORAGE_KEY
}

/**
 * Create a new task and return a new array with the task prepended.
 * Use crypto.randomUUID() to generate a unique id.
 */
export function addTask(
  tasks: Task[],
  title: string,
  description: string,
): Task[] {
  // TODO: Create a new Task object with a unique id, the given title and
  //       description, and completed set to false
  // TODO: Return a new array with the new task at the beginning
  return [];
}

/**
 * Return a new array with the task matching the given id removed.
 */
export function deleteTask(tasks: Task[], id: string): Task[] {
  // TODO: Filter out the task with the matching id
  return [];
}

/**
 * Return a new array where the task with the given id has its
 * completed status flipped.
 */
export function toggleTask(tasks: Task[], id: string): Task[] {
  // TODO: Map over the tasks and flip the completed property of the
  //       task that matches the id
  return [];
}

/**
 * Return a new array where the task with the given id has its
 * title and description updated.
 */
export function editTask(
  tasks: Task[],
  id: string,
  title: string,
  description: string,
): Task[] {
  // TODO: Map over the tasks and update the title and description of
  //       the task that matches the id
  return [];
}

/**
 * Return a filtered view of the tasks based on the given status.
 * "all" → all tasks, "completed" → only completed, "pending" → only not completed.
 */
export function filterTasks(tasks: Task[], status: FilterStatus): Task[] {
  // TODO: Return the appropriate subset of tasks based on the status
  return [];
}
