import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { Task } from '../../models/task.models';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

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

    const event = { checked: true } as MatCheckboxChange;
    component.onCheckboxChange(event);

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

    const event = { checked: false } as MatCheckboxChange;
    component.onCheckboxChange(event);

    expect(component.task.completed).toBe(false);

    expect(component.taskChecked.emit).toHaveBeenCalledWith(component.task);
  });

  it('should log a message when a user clicks on a Task card', () => {
    spyOn(console, 'log');

    const testTask: Task = {
      id: 1,
      taskName: 'Test Task',
      completed: false,
    };

    component.task = testTask;

    component.onCardClick();

    expect(console.log).toHaveBeenCalledWith(
      'Task with id ' + component.task.id + ' was clicked'
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
});
