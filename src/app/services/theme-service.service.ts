import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentMode: 'dark' | 'light' = 'light';

  setTheme(mode: 'dark' | 'light'): void {
    this.currentMode = mode;
    localStorage.setItem('theme', mode);
    this.applyTheme(mode);
  }

  applyTheme(mode: 'dark' | 'light'): void {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }

  initializeTheme(): void {
    const savedMode = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const mode =
      savedMode === 'dark' || savedMode === 'light' ? savedMode : 'light';
    this.setTheme(mode);
  }
}
