import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInputBarComponent } from './todo-input-bar.component';

describe('TodoInputBarComponent', () => {
  let component: TodoInputBarComponent;
  let fixture: ComponentFixture<TodoInputBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInputBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoInputBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
