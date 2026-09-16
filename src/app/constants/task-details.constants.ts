import { MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialogConfig } from '@angular/material/dialog';

export const TASK_DETAILS_HEADING_ID = 'task-details-heading';

export const TASK_DETAILS_PANEL_CONFIG: MatDialogConfig = {
  position: { top: '0', right: '0' },
  width: '400px',
  maxWidth: '100vw',
  height: '100%',
  panelClass: 'task-details-panel',
  ariaLabelledBy: TASK_DETAILS_HEADING_ID,
  autoFocus: 'dialog',
};

export const TASK_DETAILS_SHEET_CONFIG: MatBottomSheetConfig = {
  panelClass: 'task-details-sheet',
  ariaLabel: 'Task details',
};
