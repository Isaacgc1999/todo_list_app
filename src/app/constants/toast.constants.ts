import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const UNDO_ACTION_LABEL = 'Undo';

export const UNDO_TOAST_CONFIG: MatSnackBarConfig = {
  duration: 4000,
  panelClass: 'undo-toast',
};

export const completedToastMessage = (taskName: string): string =>
  `Completed “${taskName}”`;

export const deletedToastMessage = (taskName: string): string =>
  `Deleted “${taskName}”`;
