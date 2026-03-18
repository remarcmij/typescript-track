// TODO: Make the type definitions below fully type-safe

export interface Task {}

export type FilterStatus = any;

export interface TaskHandlers {
  onAdd: (title: string, description: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
  onFilter: (status: FilterStatus) => void;
}
