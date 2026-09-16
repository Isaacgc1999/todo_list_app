import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TodoTaskItemDialogComponent } from '../components/todo-task-item-dialog/todo-task-item-dialog.component';
import { WIDE_LAYOUT_QUERY } from '../constants/media.constants';
import {
  TASK_DETAILS_PANEL_CONFIG,
  TASK_DETAILS_SHEET_CONFIG,
} from '../constants/task-details.constants';
import { TaskDetailsResult } from '../models/task-details.models';
import { Task } from '../models/task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskDetailsService {
  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private breakpointObserver: BreakpointObserver
  ) {}

  open(task: Task): Observable<TaskDetailsResult | undefined> {
    if (this.breakpointObserver.isMatched(WIDE_LAYOUT_QUERY)) {
      return this.dialog
        .open<TodoTaskItemDialogComponent, Task, TaskDetailsResult>(
          TodoTaskItemDialogComponent,
          { ...TASK_DETAILS_PANEL_CONFIG, data: task }
        )
        .afterClosed();
    }

    return this.bottomSheet
      .open<TodoTaskItemDialogComponent, Task, TaskDetailsResult>(
        TodoTaskItemDialogComponent,
        { ...TASK_DETAILS_SHEET_CONFIG, data: task }
      )
      .afterDismissed();
  }
}
