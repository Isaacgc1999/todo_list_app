import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../models/task.models';
import { TodoTaskItemDialogComponent } from '../todo-task-item-dialog/todo-task-item-dialog.component';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  const query = <T extends HTMLElement>(selector: string): T | null =>
    fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive a value in @Input task and match all its types', () => {
    const testTask: Task = {
      id: 1,
      taskName: 'Test Task',
      completed: false,
    };

    component.task = testTask;

    fixture.detectChanges();

    expect(component.task).toEqual(testTask);

    expect(typeof component.task.id).toBe('number');
    expect(typeof component.task.taskName).toBe('string');
    expect(typeof component.task.completed).toBe('boolean');
  });

  it('should receive a value in @Input showBin and match its type', () => {
    const testBin: boolean = true;

    component.showBin = testBin;

    fixture.detectChanges();

    expect(component.showBin).toEqual(testBin);

    expect(typeof component.showBin).toBe('boolean');
  });

  it('should receive a value in @Input completed and match its type', () => {
    const testCompleted: boolean = true;

    component.completed = testCompleted;

    fixture.detectChanges();

    expect(component.completed).toEqual(testCompleted);

    expect(typeof component.completed).toBe('boolean');
  });

  it('should send the value of true in the property completed of a Task when a user toggle a Task', () => {
    spyOn(component.taskChecked, 'emit');

    const testTask: Task = {
      id: 1,
      taskName: 'Test Task',
      completed: false,
    };

    component.task = testTask;
    component.completed = false;

    component.onToggle();

    expect(component.task.completed).toBe(true);

    expect(component.taskChecked.emit).toHaveBeenCalledWith(component.task);
  });

  it('should send the value of false in completed of a Task when a user toggle a Task', () => {
    spyOn(component.taskChecked, 'emit');

    const testTask: Task = {
      id: 1,
      taskName: 'Test Task',
      completed: true,
    };

    component.task = testTask;
    component.completed = true;

    component.onToggle();

    expect(component.task.completed).toBe(false);

    expect(component.taskChecked.emit).toHaveBeenCalledWith(component.task);
  });

  it('should open the task dialog when a user opens the details of a Task', () => {
    const dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open');

    const testTask: Task = {
      id: 1,
      taskName: 'Test Task',
      completed: false,
    };

    component.task = testTask;

    component.openDetails();

    expect(dialog.open).toHaveBeenCalledWith(
      TodoTaskItemDialogComponent,
      jasmine.objectContaining({ data: testTask })
    );
  });

  it('should emit the id of a Task when a user clicks on the bin icon', () => {
    spyOn(component.deletedTask, 'emit');

    const testTask: Task = {
      id: 1,
      taskName: 'Test Task',
      completed: true,
    };

    component.task = testTask;

    component.onBinClick();

    expect(component.deletedTask.emit).toHaveBeenCalledWith(component.task.id);
  });

  describe('template', () => {
    const testTask: Task = {
      id: 1,
      taskName: 'Test Task',
      completed: false,
      created: new Date(2026, 8, 15, 9, 14),
    };

    beforeEach(() => {
      component.task = testTask;
      fixture.detectChanges();
    });

    it('should expose the check as a named checkbox', () => {
      const check = query('[role="checkbox"]')!;

      expect(check.getAttribute('aria-label')).toBe('Test Task');
      expect(check.getAttribute('aria-checked')).toBe('false');
    });

    it('should mark the check and the row for a completed task', () => {
      fixture.componentRef.setInput('completed', true);
      fixture.detectChanges();

      expect(query('[role="checkbox"]')!.getAttribute('aria-checked')).toBe(
        'true'
      );
      expect(query('.row')!.classList).toContain('is-done');
    });

    it('should toggle the task when the check is clicked', () => {
      spyOn(component.taskChecked, 'emit');

      query('[role="checkbox"]')!.click();

      expect(component.taskChecked.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({ id: 1, completed: true })
      );
    });

    it('should open the details when the row is clicked', () => {
      const dialog = TestBed.inject(MatDialog);
      spyOn(dialog, 'open');

      query('.row__body')!.click();

      expect(dialog.open).toHaveBeenCalled();
    });

    it('should show when the task was added', () => {
      expect(query('.row__meta')!.textContent).toContain('Added 15 Sep, 09:14');
    });

    it('should only show the delete button when showBin is set', () => {
      expect(query('.row__delete')).toBeNull();

      fixture.componentRef.setInput('showBin', true);
      fixture.detectChanges();

      expect(query('.row__delete')!.getAttribute('aria-label')).toBe(
        'Delete Test Task'
      );
    });
  });
});
