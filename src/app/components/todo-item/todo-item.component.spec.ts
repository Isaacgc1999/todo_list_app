import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { TASK_COMPLETE_DELAY_MS } from '../../constants/task.constants';
import { Task } from '../../models/task.models';
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

  it('should send the value of true in the property completed of a Task after a short delay', fakeAsync(() => {
    spyOn(component.taskChecked, 'emit');

    const testTask: Task = {
      id: 1,
      taskName: 'Test Task',
      completed: false,
    };

    component.task = testTask;
    component.completed = false;

    component.onToggle();

    expect(component.checked).toBeTrue();
    expect(component.taskChecked.emit).not.toHaveBeenCalled();

    tick(TASK_COMPLETE_DELAY_MS);

    expect(component.task.completed).toBe(true);
    expect(component.taskChecked.emit).toHaveBeenCalledWith(component.task);
  }));

  it('should cancel completing a Task when it is toggled again during the delay', fakeAsync(() => {
    spyOn(component.taskChecked, 'emit');

    component.task = { id: 1, taskName: 'Test Task', completed: false };

    component.onToggle();
    component.onToggle();
    tick(TASK_COMPLETE_DELAY_MS);

    expect(component.checked).toBeFalse();
    expect(component.taskChecked.emit).not.toHaveBeenCalled();
  }));

  it('should send the value of false in completed of a Task right away', () => {
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

  it('should ask to open the details of a Task', () => {
    spyOn(component.detailsRequested, 'emit');

    const testTask: Task = {
      id: 1,
      taskName: 'Test Task',
      completed: false,
    };

    component.task = testTask;

    component.openDetails();

    expect(component.detailsRequested.emit).toHaveBeenCalledWith(testTask);
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

    it('should show the check as ticked as soon as it is clicked', fakeAsync(() => {
      spyOn(component.taskChecked, 'emit');

      query('[role="checkbox"]')!.click();
      fixture.detectChanges();

      expect(query('.row')!.classList).toContain('is-done');

      tick(TASK_COMPLETE_DELAY_MS);

      expect(component.taskChecked.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({ id: 1, completed: true })
      );
    }));

    it('should ask for the details when the row is clicked', () => {
      spyOn(component.detailsRequested, 'emit');

      query('.row__body')!.click();

      expect(component.detailsRequested.emit).toHaveBeenCalledWith(testTask);
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
