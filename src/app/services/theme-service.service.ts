import { Injectable, signal } from '@angular/core';
import { APPEARANCES, THEME_STORAGE_KEY } from '../constants/theme.constants';
import { Appearance } from '../models/appearance.models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _appearance = signal<Appearance>(this.savedAppearance());
  readonly appearance = this._appearance.asReadonly();

  constructor() {
    this.applyAppearance(this._appearance());
  }

  setAppearance(mode: Appearance): void {
    this._appearance.set(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    this.applyAppearance(mode);
  }

  private applyAppearance(mode: Appearance): void {
    // 'light dark' lets every light-dark() token follow the operating system
    document.documentElement.style.colorScheme =
      mode === 'system' ? 'light dark' : mode;
  }

  private savedAppearance(): Appearance {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return APPEARANCES.find((mode) => mode === saved) ?? 'system';
  }
}
