import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  NoopAnimationsModule,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { TodoDarkmodeComponent } from './todo-darkmode.component';

describe('TodoDarkmodeComponent', () => {
  let component: TodoDarkmodeComponent;
  let fixture: ComponentFixture<TodoDarkmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        MatBottomSheetModule,
        NoopAnimationsModule,
        TodoDarkmodeComponent,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDarkmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
