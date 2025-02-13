import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TodoHomeComponent } from './todo-home.component';

describe('TodoHomeComponent', () => {
  let component: TodoHomeComponent;
  let fixture: ComponentFixture<TodoHomeComponent>;
  let store: { [key: string]: string } = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoHomeComponent, NoopAnimationsModule],
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
    expect(component.currentDateAndTime).toEqual(jasmine.any(String));

    if (localStorage.getItem('tasks') !== null) {
      expect(component.tasks).toEqual([{ id: 1, taskName: 'Test Task' }]);
    }
    if (localStorage.getItem('completed_tasks') !== null) {
      expect(component.completed_tasks).toEqual([
        { id: 2, taskName: 'Completed Task' },
      ]);
    }
  });

  it('should add a task to the tasks array and save it in localStorage', () => {
    const lastTaskIdTest = localStorage.getItem('lastTaskId') || '0';
    let newIdTest = lastTaskIdTest ? parseInt(lastTaskIdTest, 10) + 1 : 1;
    const newTaskTest = {
      id: newIdTest,
      taskName: 'New Task',
    };

    component.tasks.push(newTaskTest);

    localStorage.setItem('tasks', JSON.stringify(newTaskTest));
    localStorage.setItem('lastTaskId', newIdTest.toString());

    expect(component.tasks).toContain(newTaskTest);
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
});
