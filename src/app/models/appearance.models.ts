export type Appearance = 'light' | 'dark' | 'system';

export interface AppearanceOption {
  mode: Appearance;
  label: string;
  icon: string;
}
