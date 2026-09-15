import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { THEME_STORAGE_KEY } from '../../../constants/theme.constants';
import { ThemeService } from '../../../services/theme-service.service';
import { BottomMenuOverviewComponent } from './bottom-menu-overview.component';

describe('BottomMenuOverviewComponent', () => {
  let component: BottomMenuOverviewComponent;
  let fixture: ComponentFixture<BottomMenuOverviewComponent>;
  let themeService: ThemeService;

  const items = (): HTMLElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('a[mat-list-item]'));

  beforeEach(async () => {
    localStorage.removeItem(THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [BottomMenuOverviewComponent, MatListModule, MatIconModule],
      providers: [ThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomMenuOverviewComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    document.documentElement.style.colorScheme = '';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should offer Light, Dark and System', () => {
    expect(items().map((item) => item.textContent?.trim())).toEqual([
      'light_mode Light',
      'dark_mode Dark',
      'brightness_auto System',
    ]);
  });

  it('should set the appearance of the option that is clicked', () => {
    const setAppearanceSpy = spyOn(themeService, 'setAppearance');

    items()[1].click();

    expect(setAppearanceSpy).toHaveBeenCalledWith('dark');
  });

  it('should set the right appearance when the icon itself is clicked', () => {
    const setAppearanceSpy = spyOn(themeService, 'setAppearance');

    items()[1].querySelector<HTMLElement>('mat-icon')!.click();

    expect(setAppearanceSpy).toHaveBeenCalledWith('dark');
  });

  it('should mark the current appearance', () => {
    themeService.setAppearance('dark');
    fixture.detectChanges();

    expect(items().map((item) => item.getAttribute('aria-current'))).toEqual([
      null,
      'page',
      null,
    ]);
  });
});
