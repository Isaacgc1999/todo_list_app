import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TASK_DETAILS_HEADING_ID } from '../../constants/task-details.constants';
import {
  TASK_CREATED_DATE_FORMAT,
  TASK_NAME_PATTERN,
} from '../../constants/task.constants';
import { TaskDetailsResult } from '../../models/task-details.models';
import { Task } from '../../models/task.models';

@Component({
  selector: 'app-todo-task-item-dialog',
  imports: [DatePipe, FormsModule],
  templateUrl: './todo-task-item-dialog.component.html',
  styleUrl: './todo-task-item-dialog.component.scss',
})
export class TodoTaskItemDialogComponent {
  private dialogRef = inject<
    MatDialogRef<TodoTaskItemDialogComponent, TaskDetailsResult>
  >(MatDialogRef, { optional: true });
  private sheetRef = inject<
    MatBottomSheetRef<TodoTaskItemDialogComponent, TaskDetailsResult>
  >(MatBottomSheetRef, { optional: true });

  readonly data: Task =
    inject<Task>(MAT_DIALOG_DATA, { optional: true }) ??
    inject<Task>(MAT_BOTTOM_SHEET_DATA);
  readonly isSheet = this.sheetRef !== null;
  readonly headingId = TASK_DETAILS_HEADING_ID;
  readonly createdDateFormat = TASK_CREATED_DATE_FORMAT;

  taskName = this.data.taskName;
  description = this.data.description ?? '';

  get canSave(): boolean {
    return TASK_NAME_PATTERN.test(this.taskName);
  }

  onCancel(): void {
    this.close();
  }

  onDone(): void {
    if (!this.canSave) {
      return;
    }

    this.close({
      action: 'save',
      task: {
        ...this.data,
        taskName: this.taskName.trim(),
        description: this.description.trim() || undefined,
      },
    });
  }

  onDelete(): void {
    this.close({ action: 'delete' });
  }

  private close(result?: TaskDetailsResult): void {
    this.dialogRef?.close(result);
    this.sheetRef?.dismiss(result);
  }
}
