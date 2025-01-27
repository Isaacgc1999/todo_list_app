import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ThemeService } from '../../../services/theme-service.service';

@Component({
  selector: 'app-bottom-menu-overview',
  imports: [MatListModule, MatIconModule],
  standalone: true,
  templateUrl: './bottom-menu-overview.component.html',
  styleUrl: './bottom-menu-overview.component.scss',
})
export class BottomMenuOverviewComponent {
  constructor(public themeService: ThemeService) {}

  toggleDarkMode(event: Event): void {
    const clickedElement = (event.target as HTMLElement).innerText
      .trim()
      .toLowerCase() as 'dark' | 'light';
    this.themeService.setTheme(clickedElement);
  }
}
