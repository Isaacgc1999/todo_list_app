import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    completed: false,
    created: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoTaskItemDialogComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MAT_DIALOG_DATA, useValue: testTask },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoTaskItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
