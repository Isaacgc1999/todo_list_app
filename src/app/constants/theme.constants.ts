import { Appearance, AppearanceOption } from '../models/appearance.models';

export const THEME_STORAGE_KEY = 'theme';

export const APPEARANCES: Appearance[] = ['light', 'dark', 'system'];

export const APPEARANCE_OPTIONS: AppearanceOption[] = [
  { mode: 'light', label: 'Light', icon: 'light_mode' },
  { mode: 'dark', label: 'Dark', icon: 'dark_mode' },
  { mode: 'system', label: 'System', icon: 'brightness_auto' },
];
