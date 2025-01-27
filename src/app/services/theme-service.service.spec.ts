import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme-service.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //setTheme
  describe('setTheme', () => {
    it('should update currentMode and localStorage', () => {
      const setItemSpy = spyOn(localStorage, 'setItem');
      const applyThemeSpy = spyOn(service, 'applyTheme');

      service.setTheme('dark');

      expect(service.currentMode).toBe('dark');
      expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
      expect(applyThemeSpy).toHaveBeenCalledWith('dark');
    });
  });

  //applyTheme
  describe('applyTheme', () => {
    it('should add "dark-mode" class and remove "light-mode" class for dark mode', () => {
      const addSpy = spyOn(document.body.classList, 'add');
      const removeSpy = spyOn(document.body.classList, 'remove');

      service.applyTheme('dark');

      expect(addSpy).toHaveBeenCalledWith('dark-mode');
      expect(removeSpy).toHaveBeenCalledWith('light-mode');
    });

    it('should add "light-mode" class and remove "dark-mode" class for light mode', () => {
      const addSpy = spyOn(document.body.classList, 'add');
      const removeSpy = spyOn(document.body.classList, 'remove');

      service.applyTheme('light');

      expect(addSpy).toHaveBeenCalledWith('light-mode');
      expect(removeSpy).toHaveBeenCalledWith('dark-mode');
    });
  });

  //initializeTheme
  describe('initializeTheme', () => {
    it('should set currentMode to "light" if localStorage is empty', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      service.initializeTheme();

      expect(service.currentMode).toBe('light');
    });

    it('should set currentMode to "dark" if localStorage contains "dark"', () => {
      spyOn(localStorage, 'getItem').and.returnValue('dark');

      service.initializeTheme();

      expect(service.currentMode).toBe('dark');
    });

    it('should set currentMode to "light" if localStorage contains "light"', () => {
      spyOn(localStorage, 'getItem').and.returnValue('light');

      service.initializeTheme();

      expect(service.currentMode).toBe('light');
    });
  });
});
