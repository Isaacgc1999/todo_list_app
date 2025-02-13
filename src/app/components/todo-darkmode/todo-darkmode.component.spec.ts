import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TodoDarkmodeComponent } from './todo-darkmode.component';

describe('TodoDarkmodeComponent', () => {
  let component: TodoDarkmodeComponent;
  let fixture: ComponentFixture<TodoDarkmodeComponent>;
  let bottomSheet: jasmine.SpyObj<MatBottomSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDarkmodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDarkmodeComponent);
    bottomSheet = TestBed.inject(
      MatBottomSheet
    ) as jasmine.SpyObj<MatBottomSheet>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the bottom menu when the button is clicked', () => {
    component.openDarkModeOps();
    expect(bottomSheet.open).toHaveBeenCalledWith(jasmine.any(Function));
  });
});
