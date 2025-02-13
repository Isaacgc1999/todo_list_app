import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TodoFooterInputComponent } from './todo-footer-input.component';

describe('TodoFooterInputComponent', () => {
  let component: TodoFooterInputComponent;
  let fixture: ComponentFixture<TodoFooterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFooterInputComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFooterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send the input value when the form is submitted', () => {
    spyOn(component.task, 'emit');

    const testTask = 'Test Task';

    component.task.emit(testTask);

    expect(component.task.emit).toHaveBeenCalledWith(testTask);
  });
});
