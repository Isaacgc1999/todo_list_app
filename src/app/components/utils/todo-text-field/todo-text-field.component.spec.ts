import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TodoTextFieldComponent } from './todo-text-field.component';

describe('TodoTextFieldComponent', () => {
  let component: TodoTextFieldComponent;
  let fixture: ComponentFixture<TodoTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoTextFieldComponent],
      providers: [provideNoopAnimations()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
