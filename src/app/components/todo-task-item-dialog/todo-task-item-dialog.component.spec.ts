import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Task } from '../../models/task.models';
import { TodoTaskItemDialogComponent } from './todo-task-item-dialog.component';

describe('TodoTaskItemDialogComponent', () => {
  let component: TodoTaskItemDialogComponent;
  let fixture: ComponentFixture<TodoTaskItemDialogComponent>;

  const testTask: Task = {
    id: 1,
    taskName: 'Test Task',
    description: 'Old note',
    completed: false,
    created: new Date(2026, 8, 15, 8, 40),
  };

  const query = <T extends HTMLElement>(selector: string): T =>
    fixture.nativeElement.querySelector(selector);

  describe('as a side panel', () => {
    let dialogRef: jasmine.SpyObj<MatDialogRef<TodoTaskItemDialogComponent>>;

    beforeEach(async () => {
      dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

      await TestBed.configureTestingModule({
        imports: [TodoTaskItemDialogComponent],
        providers: [
          provideNoopAnimations(),
          { provide: MAT_DIALOG_DATA, useValue: testTask },
          { provide: MatDialogRef, useValue: dialogRef },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(TodoTaskItemDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show the task name and notes', () => {
      expect(query<HTMLInputElement>('#task-details-name').value).toBe(
        'Test Task'
      );
      expect(query<HTMLTextAreaElement>('#task-details-notes').value).toBe(
        'Old note'
      );
    });

    it('should show when the task was created', () => {
      expect(fixture.nativeElement.textContent).toContain('15 Sep 2026, 08:40');
    });

    it('should save the trimmed changes when Done is clicked', () => {
      component.taskName = '  Renamed task  ';
      component.description = '  New note  ';

      component.onDone();

      expect(dialogRef.close).toHaveBeenCalledWith({
        action: 'save',
        task: { ...testTask, taskName: 'Renamed task', description: 'New note' },
      });
    });

    it('should drop an empty note when saving', () => {
      component.description = '   ';

      component.onDone();

      expect(dialogRef.close).toHaveBeenCalledWith({
        action: 'save',
        task: { ...testTask, description: undefined },
      });
    });

    it('should not save a blank task name', () => {
      component.taskName = '   ';
      fixture.detectChanges();

      component.onDone();

      expect(
        query<HTMLButtonElement>('.details__nav-button--primary').disabled
      ).toBeTrue();
      expect(dialogRef.close).not.toHaveBeenCalled();
    });

    it('should discard the changes when Cancel is clicked', () => {
      component.taskName = 'Renamed task';

      component.onCancel();

      expect(dialogRef.close).toHaveBeenCalledWith(undefined);
    });

    it('should ask to delete the task', () => {
      component.onDelete();

      expect(dialogRef.close).toHaveBeenCalledWith({ action: 'delete' });
    });

    it('should not show the grabber', () => {
      expect(query('.details__grabber')).toBeNull();
    });
  });

  describe('as a bottom sheet', () => {
    let sheetRef: jasmine.SpyObj<MatBottomSheetRef<TodoTaskItemDialogComponent>>;

    beforeEach(async () => {
      sheetRef = jasmine.createSpyObj('MatBottomSheetRef', ['dismiss']);

      await TestBed.configureTestingModule({
        imports: [TodoTaskItemDialogComponent],
        providers: [
          provideNoopAnimations(),
          { provide: MAT_BOTTOM_SHEET_DATA, useValue: testTask },
          { provide: MatBottomSheetRef, useValue: sheetRef },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(TodoTaskItemDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show the grabber', () => {
      expect(query('.details__grabber')).not.toBeNull();
    });

    it('should dismiss the sheet with the result', () => {
      component.onDelete();

      expect(sheetRef.dismiss).toHaveBeenCalledWith({ action: 'delete' });
    });
  });
});
