import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ThemeService } from '../../../services/theme-service.service';
import { BottomMenuOverviewComponent } from './bottom-menu-overview.component';

describe('BottomMenuOverviewComponent', () => {
  let component: BottomMenuOverviewComponent;
  let fixture: ComponentFixture<BottomMenuOverviewComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomMenuOverviewComponent, MatListModule, MatIconModule],
      providers: [ThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomMenuOverviewComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setTheme when toggleDarkMode is triggered (dark)', () => {
    const setThemeSpy = spyOn(themeService, 'setTheme');
    const event = { target: { innerText: 'dark' } } as unknown as Event;

    component.toggleDarkMode(event);

    expect(setThemeSpy).toHaveBeenCalledWith('dark');
  });

  it('should call setTheme when toggleDarkMode is triggered (light)', () => {
    const setThemeSpy = spyOn(themeService, 'setTheme');
    const event = { target: { innerText: 'light' } } as unknown as Event;

    component.toggleDarkMode(event);

    expect(setThemeSpy).toHaveBeenCalledWith('light');
  });
});
