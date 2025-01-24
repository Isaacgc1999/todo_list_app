import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BottomMenuOverviewComponent } from './bottom-menu-overview.component';

describe('BottomMenuOverviewComponent', () => {
  let component: BottomMenuOverviewComponent;
  let fixture: ComponentFixture<BottomMenuOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [BottomMenuOverviewComponent],
      imports: [MatListModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomMenuOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //ngOnInit
  describe('ngOnInit', () => {
    it('should set currentMode to "light" if no theme is saved', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      component.ngOnInit();

      expect(component.currentMode).toBe('light');
    });

    it('should set currentMode to the saved mode in localStorage if it exists', () => {
      spyOn(localStorage, 'getItem').and.returnValue('dark');

      component.ngOnInit();

      expect(component.currentMode).toBe('dark');
    });

    it('should call applyTheme with the correct mode', () => {
      spyOn(localStorage, 'getItem').and.returnValue('dark');

      const applyThemeSpy = spyOn(component, 'applyTheme');

      component.ngOnInit();

      expect(applyThemeSpy).toHaveBeenCalledWith('dark');
    });
  });
  //toggleDarkMode
  describe('toggleDarkMode', () => {
    it('should set currentMode to "dark" and update localStorage when the clicked element is "dark"', () => {
      const event = { target: { innerText: 'dark' } } as unknown as Event;
      const setItemSpy = spyOn(localStorage, 'setItem');
      const applyThemeSpy = spyOn(component, 'applyTheme');

      component.toggleDarkMode(event);

      expect(component.currentMode).toBe('dark');
      expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
      expect(applyThemeSpy).toHaveBeenCalledWith('dark');
    });

    it('should set currentMode to "light" and update localStorage when the clicked element is "light"', () => {
      const event = { target: { innerText: 'light' } } as unknown as Event;
      const setItemSpy = spyOn(localStorage, 'setItem');
      const applyThemeSpy = spyOn(component, 'applyTheme');

      component.toggleDarkMode(event);

      expect(component.currentMode).toBe('light');
      expect(applyThemeSpy).toHaveBeenCalledWith('light');
      expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
    });
  });
  //applyTheme
  describe('applyTheme', () => {
    it('should add "dark-mode" class and remove "light-mode" class for dark mode', () => {
      const addSpy = spyOn(document.body.classList, 'add');
      const removeSpy = spyOn(document.body.classList, 'remove');

      component.applyTheme('dark');

      expect(addSpy).toHaveBeenCalledWith('dark-mode');
      expect(removeSpy).toHaveBeenCalledWith('light-mode');
    });

    it('should add "light-mode" class and remove "dark-mode" class for light mode', () => {
      const addSpy = spyOn(document.body.classList, 'add');
      const removeSpy = spyOn(document.body.classList, 'remove');

      component.applyTheme('light');

      expect(addSpy).toHaveBeenCalledWith('light-mode');
      expect(removeSpy).toHaveBeenCalledWith('dark-mode');
    });
  });
});
