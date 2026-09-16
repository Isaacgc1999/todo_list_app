import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { APPEARANCE_OPTIONS } from '../../../constants/theme.constants';
import { Appearance } from '../../../models/appearance.models';
import { ThemeService } from '../../../services/theme-service.service';

@Component({
  selector: 'app-bottom-menu-overview',
  imports: [MatListModule, MatIconModule],
  standalone: true,
  templateUrl: './bottom-menu-overview.component.html',
  styleUrl: './bottom-menu-overview.component.scss',
})
export class BottomMenuOverviewComponent {
  readonly options = APPEARANCE_OPTIONS;

  constructor(public themeService: ThemeService) {}

  selectAppearance(mode: Appearance): void {
    this.themeService.setAppearance(mode);
  }
}
