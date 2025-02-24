export interface Task {
  id: number;
  taskName: string;
  description?: string;
  created?: Date;
  completed?: boolean;
}
