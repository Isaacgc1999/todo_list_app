import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomMenuOverviewComponent } from './components/todo-darkmode/bottom-menu-overview/bottom-menu-overview.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-list-app';

  constructor(darkMenuOption: BottomMenuOverviewComponent) {
    const savedMode = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const mode: 'dark' | 'light' =
      savedMode === 'dark' || savedMode === 'light' ? savedMode : 'light';

    darkMenuOption.applyTheme(mode);
  }
}
