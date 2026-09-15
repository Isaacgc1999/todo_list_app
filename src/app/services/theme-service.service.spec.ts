import { TestBed } from '@angular/core/testing';

import { THEME_STORAGE_KEY } from '../constants/theme.constants';
import { ThemeService } from './theme-service.service';

describe('ThemeService', () => {
  const html = document.documentElement;

  function createService(saved: string | null): ThemeService {
    if (saved === null) {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, saved);
    }
    TestBed.configureTestingModule({});
    return TestBed.inject(ThemeService);
  }

  afterEach(() => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    html.style.colorScheme = '';
  });

  it('should be created', () => {
    expect(createService(null)).toBeTruthy();
  });

  //initial appearance
  describe('initial appearance', () => {
    it('should follow the system when nothing is saved', () => {
      const service = createService(null);

      expect(service.appearance()).toBe('system');
      expect(html.style.colorScheme).toBe('light dark');
    });

    it('should restore a saved "dark" appearance', () => {
      const service = createService('dark');

      expect(service.appearance()).toBe('dark');
      expect(html.style.colorScheme).toBe('dark');
    });

    it('should restore a saved "light" appearance', () => {
      const service = createService('light');

      expect(service.appearance()).toBe('light');
      expect(html.style.colorScheme).toBe('light');
    });

    it('should fall back to the system for an unknown saved value', () => {
      const service = createService('purple');

      expect(service.appearance()).toBe('system');
    });
  });

  //setAppearance
  describe('setAppearance', () => {
    it('should update the appearance, localStorage and color-scheme', () => {
      const service = createService(null);

      service.setAppearance('dark');

      expect(service.appearance()).toBe('dark');
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
      expect(html.style.colorScheme).toBe('dark');
    });

    it('should let light-dark() follow the OS for "system"', () => {
      const service = createService('dark');

      service.setAppearance('system');

      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('system');
      expect(html.style.colorScheme).toBe('light dark');
    });
  });
});
