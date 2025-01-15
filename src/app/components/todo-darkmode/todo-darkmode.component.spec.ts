import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDarkmodeComponent } from './todo-darkmode.component';

describe('TodoDarkmodeComponent', () => {
  let component: TodoDarkmodeComponent;
  let fixture: ComponentFixture<TodoDarkmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDarkmodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDarkmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
