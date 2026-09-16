import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RADIO_ARROW_STEPS } from '../../../constants/keyboard.constants';
import { APPEARANCE_OPTIONS } from '../../../constants/theme.constants';
import { Appearance } from '../../../models/appearance.models';
import { ThemeService } from '../../../services/theme-service.service';

@Component({
  selector: 'app-todo-appearance-control',
  standalone: true,
  templateUrl: './todo-appearance-control.component.html',
  styleUrl: './todo-appearance-control.component.scss',
})
export class TodoAppearanceControlComponent {
  @ViewChildren('segment') segments!: QueryList<ElementRef<HTMLButtonElement>>;

  readonly options = APPEARANCE_OPTIONS;

  constructor(public themeService: ThemeService) {}

  selectAppearance(mode: Appearance): void {
    this.themeService.setAppearance(mode);
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    const step = RADIO_ARROW_STEPS[event.key];
    if (!step) {
      return;
    }

    event.preventDefault();
    const next = (index + step + this.options.length) % this.options.length;
    this.selectAppearance(this.options[next].mode);
    this.segments.get(next)?.nativeElement.focus();
  }
}
