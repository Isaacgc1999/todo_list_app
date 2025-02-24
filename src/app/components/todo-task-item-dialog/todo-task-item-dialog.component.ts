import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Task } from '../../models/task.models';
import { TodoTextFieldComponent } from '../utils/todo-text-field/todo-text-field.component';

@Component({
  selector: 'app-todo-task-item-dialog',
  imports: [TodoTextFieldComponent, MatDialogModule, DatePipe],
  templateUrl: './todo-task-item-dialog.component.html',
  styleUrl: './todo-task-item-dialog.component.scss',
})
export class TodoTaskItemDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private dialogRef: MatDialogRef<TodoTaskItemDialogComponent>
  ) {}

  onCancel(): void {
    console.log('Dialog closed');
    this.dialogRef.close();
  }

  onSave(): void {
    console.log('Saved data');
  }

  getDescription(description: string | null): void {
    console.log('Description:', description);
  }
}
