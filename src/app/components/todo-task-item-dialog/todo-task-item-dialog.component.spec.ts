import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTaskItemDialogComponent } from './todo-task-item-dialog.component';

describe('TodoTaskItemDialogComponent', () => {
  let component: TodoTaskItemDialogComponent;
  let fixture: ComponentFixture<TodoTaskItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoTaskItemDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoTaskItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
