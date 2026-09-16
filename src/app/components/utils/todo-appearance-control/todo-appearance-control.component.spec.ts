import { ComponentFixture, TestBed } from '@angular/core/testing';

import { THEME_STORAGE_KEY } from '../../../constants/theme.constants';
import { ThemeService } from '../../../services/theme-service.service';
import { TodoAppearanceControlComponent } from './todo-appearance-control.component';

describe('TodoAppearanceControlComponent', () => {
  let fixture: ComponentFixture<TodoAppearanceControlComponent>;
  let themeService: ThemeService;

  const radios = (): HTMLButtonElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('[role="radio"]'));

  beforeEach(async () => {
    localStorage.removeItem(THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [TodoAppearanceControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoAppearanceControlComponent);
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    document.documentElement.style.colorScheme = '';
  });

  it('should offer Light, Dark and System', () => {
    expect(radios().map((radio) => radio.textContent?.trim())).toEqual([
      'Light',
      'Dark',
      'System',
    ]);
  });

  it('should mark the current appearance and only let it take focus', () => {
    expect(radios().map((radio) => radio.getAttribute('aria-checked'))).toEqual(
      ['false', 'false', 'true']
    );
    expect(radios().map((radio) => radio.tabIndex)).toEqual([-1, -1, 0]);
  });

  it('should set the appearance that is clicked', () => {
    radios()[1].click();
    fixture.detectChanges();

    expect(themeService.appearance()).toBe('dark');
    expect(radios()[1].getAttribute('aria-checked')).toBe('true');
  });

  it('should move the selection with the arrow keys', () => {
    radios()[2].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    );
    fixture.detectChanges();

    expect(themeService.appearance()).toBe('light');
    expect(document.activeElement).toBe(radios()[0]);

    radios()[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
    );

    expect(themeService.appearance()).toBe('system');
  });
});
