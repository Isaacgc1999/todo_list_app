import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject, of } from 'rxjs';
import {
  COMPLETED_TASKS_STORAGE_KEY,
  TASKS_STORAGE_KEY,
} from '../../constants/task.constants';
import { TaskDetailsResult } from '../../models/task-details.models';
import { Task } from '../../models/task.models';
import { TaskDetailsService } from '../../services/task-details.service';
import { TodoHomeComponent } from './todo-home.component';

describe('TodoHomeComponent', () => {
  let component: TodoHomeComponent;
  let fixture: ComponentFixture<TodoHomeComponent>;
  let store: { [key: string]: string } = {};
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let undo$: Subject<void>;
  let taskDetails: jasmine.SpyObj<TaskDetailsService>;

  const text = (): string => fixture.nativeElement.textContent;

  beforeEach(async () => {
    undo$ = new Subject<void>();
    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    snackBar.open.and.returnValue({
      onAction: () => undo$,
    } as unknown as MatSnackBarRef<never>);
    taskDetails = jasmine.createSpyObj<TaskDetailsService>(
      'TaskDetailsService',
      ['open']
    );

    await TestBed.configureTestingModule({
      imports: [TodoHomeComponent, NoopAnimationsModule],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        { provide: TaskDetailsService, useValue: taskDetails },
      ],
    }).compileComponents();

    store = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key) => {
      return store[key] || null;
    });

    spyOn(window.localStorage, 'setItem').and.callFake((key, value) => {
      store[key] = value.toString();
    });

    spyOn(window.localStorage, 'removeItem').and.callFake((key) => {
      delete store[key];
    });

    spyOn(window.localStorage, 'clear').and.callFake(() => {
      store = {};
    });

    fixture = TestBed.createComponent(TodoHomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the tasks saved in localStorage and save them into variables', () => {
    store[TASKS_STORAGE_KEY] = JSON.stringify([{ id: 1, taskName: 'Test Task' }]);
    store[COMPLETED_TASKS_STORAGE_KEY] = JSON.stringify([
      { id: 2, taskName: 'Completed Task' },
    ]);

    component.savedTasks();

    expect(component.today).toEqual(jasmine.any(Date));
    expect(component.tasks).toEqual([{ id: 1, taskName: 'Test Task' }]);
    expect(component.completed_tasks).toEqual([
      { id: 2, taskName: 'Completed Task' },
    ]);
  });

  it('should add a task to the tasks array and save it in localStorage', () => {
    component.addTask('New Task');

    expect(component.tasks).toEqual([
      jasmine.objectContaining({ id: 1, taskName: 'New Task', completed: false }),
    ]);
    expect(JSON.parse(store[TASKS_STORAGE_KEY])[0].taskName).toBe('New Task');
    expect(store['lastTaskId']).toBe('1');
  });

  it('should complete tasks (move between tasks and completed_tasks)', () => {
    const testTask1 = { id: 1, taskName: 'Test Task', completed: false };
    const testTask2 = { id: 1, taskName: 'Test Task', completed: true };

    component.onCurrentTaskChecked(testTask1);

    expect(component.tasks).toContain(testTask1);
    expect(component.completed_tasks).not.toContain(testTask1);

    component.onCurrentTaskChecked(testTask2);

    expect(component.completed_tasks).toContain(testTask2);
    expect(component.tasks).not.toContain(testTask2);
  });

  it('should delete a task from the completed_tasks array', () => {
    const testTask = { id: 1, taskName: 'Test Task', completed: true };

    component.completed_tasks.push(testTask);

    component.onDeletedTask(testTask.id);

    expect(component.completed_tasks).not.toContain(testTask);
  });

  describe('undo', () => {
    it('should offer to undo completing a task', () => {
      const task: Task = { id: 1, taskName: 'Buy oat milk', completed: false };
      component.tasks = [task];

      component.onCurrentTaskChecked({ ...task, completed: true });

      expect(snackBar.open).toHaveBeenCalledWith(
        'Completed “Buy oat milk”',
        'Undo',
        jasmine.any(Object)
      );

      undo$.next();

      expect(component.tasks).toEqual([task]);
      expect(component.completed_tasks).toEqual([]);
    });

    it('should not show a toast when a task is reopened', () => {
      component.completed_tasks = [
        { id: 1, taskName: 'Buy oat milk', completed: true },
      ];

      component.onCurrentTaskChecked({
        id: 1,
        taskName: 'Buy oat milk',
        completed: false,
      });

      expect(snackBar.open).not.toHaveBeenCalled();
    });

    it('should put a deleted task back in its place', () => {
      const tasks: Task[] = [
        { id: 1, taskName: 'First', completed: true },
        { id: 2, taskName: 'Second', completed: true },
      ];
      component.completed_tasks = [...tasks];

      component.onDeletedTask(1);

      expect(snackBar.open).toHaveBeenCalledWith(
        'Deleted “First”',
        'Undo',
        jasmine.any(Object)
      );

      undo$.next();

      expect(component.completed_tasks).toEqual(tasks);
    });
  });

  describe('details', () => {
    const task: Task = { id: 1, taskName: 'Renew passport', completed: false };

    beforeEach(() => {
      component.tasks = [task];
    });

    it('should save the changes made in the details', () => {
      const saved: TaskDetailsResult = {
        action: 'save',
        task: { ...task, description: 'Bring two photos' },
      };
      taskDetails.open.and.returnValue(of(saved));

      component.onTaskOpened(task);

      expect(taskDetails.open).toHaveBeenCalledWith(task);
      expect(component.tasks).toEqual([saved.task]);
      expect(JSON.parse(store[TASKS_STORAGE_KEY])[0].description).toBe(
        'Bring two photos'
      );
    });

    it('should delete a task from the details', () => {
      taskDetails.open.and.returnValue(of({ action: 'delete' }));

      component.onTaskOpened(task);

      expect(component.tasks).toEqual([]);
    });

    it('should leave the task alone when the details are cancelled', () => {
      taskDetails.open.and.returnValue(of(undefined));

      component.onTaskOpened(task);

      expect(component.tasks).toEqual([task]);
    });
  });

  describe('template', () => {
    it('should show an empty state when there are no tasks', () => {
      expect(text()).toContain('No tasks yet');
      expect(fixture.nativeElement.querySelector('.summary')).toBeNull();
    });

    it('should show the progress of the tasks', () => {
      component.tasks = [{ id: 1, taskName: 'Open task', completed: false }];
      component.completed_tasks = [
        { id: 2, taskName: 'Done task', completed: true },
      ];
      fixture.detectChanges();

      const bar = fixture.nativeElement.querySelector('[role="progressbar"]');
      expect(bar.getAttribute('aria-valuenow')).toBe('1');
      expect(bar.getAttribute('aria-valuemax')).toBe('2');
      expect(text()).toContain('1 open');
    });

    it('should collapse and expand the completed tasks', () => {
      component.completed_tasks = [
        { id: 2, taskName: 'Done task', completed: true },
      ];
      fixture.detectChanges();

      const toggle: HTMLButtonElement =
        fixture.nativeElement.querySelector('.section__toggle');
      toggle.click();
      fixture.detectChanges();

      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      expect(
        fixture.nativeElement.querySelector('#completed-list').hidden
      ).toBeTrue();
    });
  });
});
