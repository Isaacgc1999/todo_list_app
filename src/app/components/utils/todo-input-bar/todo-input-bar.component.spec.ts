import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TodoInputBarComponent } from './todo-input-bar.component';

describe('TodoInputBarComponent', () => {
  let component: TodoInputBarComponent;
  let fixture: ComponentFixture<TodoInputBarComponent>;
  let input: HTMLInputElement;
  let extraElements: HTMLElement[];

  const pressKey = (target: EventTarget, init: KeyboardEventInit): void => {
    target.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, ...init }));
  };

  const addToPage = <T extends HTMLElement>(element: T): T => {
    document.body.appendChild(element);
    extraElements.push(element);
    return element;
  };

  beforeEach(async () => {
    extraElements = [];

    await TestBed.configureTestingModule({
      imports: [TodoInputBarComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoInputBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  afterEach(() => {
    extraElements.forEach((element) => element.remove());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send the input value when the form is submitted', () => {
    spyOn(component.task, 'emit');

    const taskControl = component.todoForm.get('task');

    const testTask = 'Test Task';
    taskControl?.setValue(testTask);

    expect(component.todoForm.valid).toBeTrue();

    component.addTask();

    expect(component.task.emit).toHaveBeenCalledWith(testTask);
    expect(taskControl?.value).toBeNull();
  });

  it('should trim the task before sending it', () => {
    spyOn(component.task, 'emit');

    component.todoForm.get('task')?.setValue('  Buy oat milk  ');
    component.addTask();

    expect(component.task.emit).toHaveBeenCalledWith('Buy oat milk');
  });

  it('should not accept a task made only of spaces', () => {
    spyOn(component.task, 'emit');

    component.todoForm.get('task')?.setValue('   ');
    fixture.detectChanges();
    component.addTask();

    expect(component.todoForm.valid).toBeFalse();
    expect(
      fixture.nativeElement.querySelector('button[type="submit"]').disabled
    ).toBeTrue();
    expect(component.task.emit).not.toHaveBeenCalled();
  });

  describe('keyboard', () => {
    it('should focus the input when N is pressed anywhere on the page', () => {
      pressKey(document.body, { key: 'n' });

      expect(document.activeElement).toBe(input);
    });

    it('should ignore N while typing in another field', () => {
      const otherField = addToPage(document.createElement('input'));
      otherField.focus();

      pressKey(otherField, { key: 'n' });

      expect(document.activeElement).toBe(otherField);
    });

    it('should ignore N inside a dialog or bottom sheet', () => {
      const overlay = addToPage(document.createElement('div'));
      overlay.className = 'cdk-overlay-container';
      const button = overlay.appendChild(document.createElement('button'));

      pressKey(button, { key: 'n' });

      expect(document.activeElement).not.toBe(input);
    });

    it('should ignore N combined with a modifier key', () => {
      pressKey(document.body, { key: 'n', ctrlKey: true });

      expect(document.activeElement).not.toBe(input);
    });

    it('should leave the input when Escape is pressed', () => {
      input.focus();

      pressKey(input, { key: 'Escape' });

      expect(document.activeElement).not.toBe(input);
    });
  });
});
