import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSummaryComponent } from './todo-summary.component';

describe('TodoSummaryComponent', () => {
  let component: TodoSummaryComponent;
  let fixture: ComponentFixture<TodoSummaryComponent>;

  const render = (openCount: number, completedCount: number): void => {
    fixture.componentRef.setInput('openCount', openCount);
    fixture.componentRef.setInput('completedCount', completedCount);
    fixture.detectChanges();
  };

  const query = (selector: string): HTMLElement =>
    fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should show how many tasks are completed out of the total', () => {
    render(5, 2);

    expect(query('.summary__figure').textContent?.replace(/\s/g, '')).toBe(
      '2/7'
    );
    expect(query('.summary__note').textContent?.trim()).toBe('5 open');
  });

  it('should expose the progress to assistive technology', () => {
    render(1, 3);

    const bar = query('[role="progressbar"]');
    expect(bar.getAttribute('aria-valuenow')).toBe('3');
    expect(bar.getAttribute('aria-valuemax')).toBe('4');
    expect(query('.summary__fill').style.width).toBe('75%');
  });

  it('should celebrate when every task is completed', () => {
    render(0, 4);

    expect(component.progress).toBe(100);
    expect(query('.summary__note').textContent?.trim()).toBe('All clear');
    expect(query('.summary').classList).toContain('summary--complete');
  });

  it('should not divide by zero without tasks', () => {
    render(0, 0);

    expect(component.progress).toBe(0);
    expect(query('.summary').classList).not.toContain('summary--complete');
  });
});
