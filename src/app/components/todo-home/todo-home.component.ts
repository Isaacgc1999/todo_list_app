import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NEW_TASK_SHORTCUT_KEY } from '../../constants/composer.constants';
import {
  COMPLETED_TASKS_STORAGE_KEY,
  HOME_SUBTITLE_DATE_FORMAT,
  HOME_TITLE_DATE_FORMAT,
  LAST_TASK_ID_STORAGE_KEY,
  TASKS_STORAGE_KEY,
} from '../../constants/task.constants';
import {
  UNDO_ACTION_LABEL,
  UNDO_TOAST_CONFIG,
  completedToastMessage,
  deletedToastMessage,
} from '../../constants/toast.constants';
import { Task } from '../../models/task.models';
import { TaskDetailsService } from '../../services/task-details.service';
import { TodoFooterInputComponent } from '../todo-footer-input/todo-footer-input.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoSummaryComponent } from '../todo-summary/todo-summary.component';
import { TodoAppearanceControlComponent } from '../utils/todo-appearance-control/todo-appearance-control.component';

@Component({
  selector: 'app-todo-home',
  imports: [
    DatePipe,
    UpperCasePipe,
    MatIconModule,
    TodoAppearanceControlComponent,
    TodoFooterInputComponent,
    TodoListComponent,
    TodoSummaryComponent,
  ],
  standalone: true,
  templateUrl: './todo-home.component.html',
  styleUrl: './todo-home.component.scss',
})
export class TodoHomeComponent {
  readonly today = new Date();
  readonly titleDateFormat = HOME_TITLE_DATE_FORMAT;
  readonly subtitleDateFormat = HOME_SUBTITLE_DATE_FORMAT;
  readonly shortcutKey = NEW_TASK_SHORTCUT_KEY;

  tasks: Task[] = [];
  completed_tasks: Task[] = [];
  completedExpanded = true;

  constructor(
    private snackBar: MatSnackBar,
    private taskDetails: TaskDetailsService
  ) {
    this.savedTasks();
  }

  get totalCount(): number {
    return this.tasks.length + this.completed_tasks.length;
  }

  savedTasks(): void {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    const storedCompletedTasks = localStorage.getItem(
      COMPLETED_TASKS_STORAGE_KEY
    );

    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.completed_tasks = storedCompletedTasks
      ? JSON.parse(storedCompletedTasks)
      : [];
  }

  addTask(event: string): void {
    const lastId = localStorage.getItem(LAST_TASK_ID_STORAGE_KEY);
    const newId = lastId ? parseInt(lastId, 10) + 1 : 1;
    const newTask: Task = {
      id: newId,
      taskName: event,
      completed: false,
      created: new Date(),
    };

    this.tasks = [...this.tasks, newTask];
    this.saveTasks();
    localStorage.setItem(LAST_TASK_ID_STORAGE_KEY, newId.toString());
  }

  onCurrentTaskChecked(task: Task): void {
    this.moveTask(task);

    if (task.completed) {
      this.showUndo(completedToastMessage(task.taskName), () =>
        this.moveTask({ ...task, completed: false })
      );
    }
  }

  onTaskOpened(task: Task): void {
    this.taskDetails.open(task).subscribe((result) => {
      if (result?.action === 'save') {
        this.updateTask(result.task);
      } else if (result?.action === 'delete') {
        this.deleteTask(task.id);
      }
    });
  }

  onDeletedTask(taskId: number): void {
    this.deleteTask(taskId);
  }

  toggleCompleted(): void {
    this.completedExpanded = !this.completedExpanded;
  }

  scrollToSection(sectionId: string): void {
    if (sectionId === 'completed-section') {
      this.completedExpanded = true;
    }
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private moveTask(task: Task): void {
    const openTasks = this.tasks.filter((t) => t.id !== task.id);
    const completedTasks = this.completed_tasks.filter((t) => t.id !== task.id);

    if (task.completed) {
      this.tasks = openTasks;
      this.completed_tasks = [...completedTasks, task];
    } else {
      this.tasks = [...openTasks, task];
      this.completed_tasks = completedTasks;
    }

    this.saveTasks();
  }

  private updateTask(updated: Task): void {
    const replace = (t: Task): Task => (t.id === updated.id ? updated : t);
    this.tasks = this.tasks.map(replace);
    this.completed_tasks = this.completed_tasks.map(replace);
    this.saveTasks();
  }

  private deleteTask(taskId: number): void {
    const isOpen = this.tasks.some((t) => t.id === taskId);
    const source = isOpen ? this.tasks : this.completed_tasks;
    const index = source.findIndex((t) => t.id === taskId);
    if (index === -1) {
      return;
    }

    const removed = source[index];
    const remaining = source.filter((t) => t.id !== taskId);
    this.setList(isOpen, remaining);
    this.saveTasks();

    this.showUndo(deletedToastMessage(removed.taskName), () => {
      const current = isOpen ? this.tasks : this.completed_tasks;
      const restored = [...current];
      restored.splice(Math.min(index, restored.length), 0, removed);
      this.setList(isOpen, restored);
      this.saveTasks();
    });
  }

  private setList(isOpen: boolean, list: Task[]): void {
    if (isOpen) {
      this.tasks = list;
    } else {
      this.completed_tasks = list;
    }
  }

  private showUndo(message: string, undo: () => void): void {
    this.snackBar
      .open(message, UNDO_ACTION_LABEL, UNDO_TOAST_CONFIG)
      .onAction()
      .subscribe(undo);
  }

  private saveTasks(): void {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(this.tasks));
    localStorage.setItem(
      COMPLETED_TASKS_STORAGE_KEY,
      JSON.stringify(this.completed_tasks)
    );
  }
}
