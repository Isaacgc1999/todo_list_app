import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  TASK_DIALOG_CONFIG,
  TASK_META_DATE_FORMAT,
} from '../../constants/task.constants';
import { Task } from '../../models/task.models';
import { TodoTaskItemDialogComponent } from '../todo-task-item-dialog/todo-task-item-dialog.component';

@Component({
  selector: 'app-todo-item',
  imports: [DatePipe, MatIconModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  standalone: true,
})
export class TodoItemComponent {
  @Input() task!: Task;
  @Input() showBin: boolean = false;
  @Input() completed: boolean = false;
  @Output() taskChecked = new EventEmitter<Task>();
  @Output() deletedTask = new EventEmitter<number>();

  readonly metaDateFormat = TASK_META_DATE_FORMAT;

  constructor(private dialog: MatDialog) {}

  onToggle(): void {
    this.task = {
      ...this.task,
      completed: !this.completed,
    };
    this.taskChecked.emit(this.task);
  }

  openDetails(): void {
    this.dialog.open(TodoTaskItemDialogComponent, {
      ...TASK_DIALOG_CONFIG,
      data: this.task,
    });
  }

  onBinClick(): void {
    this.deletedTask.emit(this.task.id);
  }
}
