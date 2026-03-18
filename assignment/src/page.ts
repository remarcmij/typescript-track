import type { Task, FilterStatus } from "./types.js";

const STORAGE_KEY = "todo-tasks";

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Task[];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(
  tasks: Task[],
  title: string,
  description: string,
): Task[] {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    description,
    completed: false,
  };
  return [newTask, ...tasks];
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id);
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
}

export function editTask(
  tasks: Task[],
  id: string,
  title: string,
  description: string,
): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, title, description } : task,
  );
}

export function filterTasks(tasks: Task[], status: FilterStatus): Task[] {
  switch (status) {
    case "all":
      return tasks;
    case "completed":
      return tasks.filter((task) => task.completed);
    case "pending":
      return tasks.filter((task) => !task.completed);
  }
}
