import { Component, inject } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BottomMenuOverviewComponent } from './bottom-menu-overview/bottom-menu-overview.component';

@Component({
  selector: 'app-todo-darkmode',
  imports: [MatIconModule, MatButtonModule, MatBottomSheetModule],
  standalone: true,
  templateUrl: './todo-darkmode.component.html',
  styleUrl: './todo-darkmode.component.scss',
})
export class TodoDarkmodeComponent {
  private _bottomSheet = inject(MatBottomSheet);

  constructor() {}

  openDarkModeOps(): void {
    this._bottomSheet.open(BottomMenuOverviewComponent);
  }
}
