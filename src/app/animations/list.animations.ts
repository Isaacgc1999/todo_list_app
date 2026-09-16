import { animate, style, transition, trigger } from '@angular/animations';
import { ROW_ANIMATION_TIMING } from '../constants/motion.constants';

export const rowAnimation = trigger('row', [
  transition(':enter', [
    style({ height: 0, opacity: 0, overflow: 'hidden' }),
    animate(ROW_ANIMATION_TIMING, style({ height: '*', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ overflow: 'hidden' }),
    animate(ROW_ANIMATION_TIMING, style({ height: 0, opacity: 0 })),
  ]),
]);
