import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../../models/task.models';
import { TodoTextFieldComponent } from '../utils/todo-text-field/todo-text-field.component';

@Component({
  selector: 'app-todo-task-item-dialog',
  imports: [TodoTextFieldComponent, MatDialogModule],
  templateUrl: './todo-task-item-dialog.component.html',
  styleUrl: './todo-task-item-dialog.component.scss',
})
export class TodoTaskItemDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Task) {}

  onDialogClose(): void {
    console.log('Dialog closed');
  }

  onCancel(): void {
    console.log('Dialog closed');
  }

  onSave(): void {
    console.log('Dialog closed');
  }
}
