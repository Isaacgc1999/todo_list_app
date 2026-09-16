import { BreakpointObserver } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TodoTaskItemDialogComponent } from '../components/todo-task-item-dialog/todo-task-item-dialog.component';
import {
  TASK_DETAILS_PANEL_CONFIG,
  TASK_DETAILS_SHEET_CONFIG,
} from '../constants/task-details.constants';
import { Task } from '../models/task.models';
import { TaskDetailsService } from './task-details.service';

describe('TaskDetailsService', () => {
  let service: TaskDetailsService;
  let dialog: jasmine.SpyObj<MatDialog>;
  let bottomSheet: jasmine.SpyObj<MatBottomSheet>;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;

  const testTask: Task = { id: 1, taskName: 'Test Task', completed: false };

  beforeEach(() => {
    dialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    dialog.open.and.returnValue({
      afterClosed: () => of({ action: 'delete' }),
    } as MatDialogRef<unknown>);

    bottomSheet = jasmine.createSpyObj<MatBottomSheet>('MatBottomSheet', [
      'open',
    ]);
    bottomSheet.open.and.returnValue({
      afterDismissed: () => of(undefined),
    } as MatBottomSheetRef<unknown>);

    breakpointObserver = jasmine.createSpyObj<BreakpointObserver>(
      'BreakpointObserver',
      ['isMatched']
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: dialog },
        { provide: MatBottomSheet, useValue: bottomSheet },
        { provide: BreakpointObserver, useValue: breakpointObserver },
      ],
    });
    service = TestBed.inject(TaskDetailsService);
  });

  it('should open a side panel on wide screens', () => {
    breakpointObserver.isMatched.and.returnValue(true);
    let result: unknown;

    service.open(testTask).subscribe((value) => (result = value));

    expect(dialog.open).toHaveBeenCalledWith(TodoTaskItemDialogComponent, {
      ...TASK_DETAILS_PANEL_CONFIG,
      data: testTask,
    });
    expect(bottomSheet.open).not.toHaveBeenCalled();
    expect(result).toEqual({ action: 'delete' });
  });

  it('should open a bottom sheet on narrow screens', () => {
    breakpointObserver.isMatched.and.returnValue(false);

    service.open(testTask).subscribe();

    const [component, config] = bottomSheet.open.calls.mostRecent()
      .args as unknown[];
    expect(component).toBe(TodoTaskItemDialogComponent);
    expect(config).toEqual({ ...TASK_DETAILS_SHEET_CONFIG, data: testTask });
    expect(dialog.open).not.toHaveBeenCalled();
  });
});
