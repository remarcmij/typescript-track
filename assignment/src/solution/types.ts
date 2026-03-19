export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export type FilterStatus = "all" | "completed" | "pending";

export interface TaskHandlers {
  onAdd: (title: string, description: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
  onFilter: (status: FilterStatus) => void;
}
