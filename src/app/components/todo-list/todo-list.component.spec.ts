import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task } from '../../models/task.models';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive a value in @Input tasks and match its type', () => {
    const testTasks: Task[] = [
      {
        id: 1,
        taskName: 'Test Task',
        completed: false,
      },
      {
        id: 2,
        taskName: 'Test Task 2',
        completed: false,
      },
      {
        id: 3,
        taskName: 'Test Task 3',
        completed: false,
      },
    ];

    component.tasks = testTasks;

    fixture.detectChanges();

    expect(component.tasks).toEqual(testTasks);

    //we are checking the type of the properties of each task in the array
    for (let task in component.tasks) {
      if (component.tasks.hasOwnProperty(task)) {
        let currentTask = component.tasks[task];
        expect(typeof currentTask.id).toBe('number');
        expect(typeof currentTask.taskName).toBe('string');
        expect(typeof currentTask.completed).toBe('boolean');
      }
    }
  });

  it('should bring a value in @Input showCompleted and match its type', () => {
    const testCompleted: boolean = true;

    component.showCompleted = testCompleted;

    fixture.detectChanges();

    expect(component.showCompleted).toEqual(testCompleted);

    expect(typeof component.showCompleted).toBe('boolean');
  });

  it('should send the value of true in the property completed of a Task when a user toggle a Task', () => {
    spyOn(component.taskChecked, 'emit');

    const testTask: Task = {
      id: 1,
      taskName: 'Test Task',
      completed: false,
    };

    component.tasks = [];
    //we suppose the testTask is the first task in the array
    component.tasks[0] = testTask;

    component.onTaskToggled(component.tasks[0]);

    component.tasks[0].completed = true;

    expect(component.tasks[0].completed).toBe(true);

    expect(component.taskChecked.emit).toHaveBeenCalledWith(component.tasks[0]);
  });

  it('should send the id of a Task when a user deletes a Task', () => {
    spyOn(component.taskDeleted, 'emit');

    const testTask: Task = {
      id: 1,
      taskName: 'Test Task',
      completed: true,
    };

    component.tasks = [];
    //we suppose the testTask is the first task in the array
    component.tasks[0] = testTask;

    component.onDeletedTask(component.tasks[0].id);

    expect(component.taskDeleted.emit).toHaveBeenCalledWith(
      component.tasks[0].id
    );
  });

  it('should return the tasks array reversed', () => {
    const testTasks: Task[] = [
      {
        id: 1,
        taskName: 'Test Task',
        completed: false,
      },
      {
        id: 2,
        taskName: 'Test Task 2',
        completed: false,
      },
      {
        id: 3,
        taskName: 'Test Task 3',
        completed: false,
      },
    ];

    component.tasks = testTasks;

    fixture.detectChanges();

    const reversedTasks = component.reversedTasks;

    expect(reversedTasks).toEqual(testTasks.reverse());
  });
});
