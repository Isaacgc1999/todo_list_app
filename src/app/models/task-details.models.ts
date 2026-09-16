import { Task } from './task.models';

export type TaskDetailsResult =
  | { action: 'save'; task: Task }
  | { action: 'delete' };
