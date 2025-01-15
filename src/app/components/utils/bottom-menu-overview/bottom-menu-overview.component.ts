import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-bottom-menu-overview',
  imports: [MatListModule],
  templateUrl: './bottom-menu-overview.component.html',
  styleUrl: './bottom-menu-overview.component.scss'
})
export class BottomMenuOverviewComponent {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomMenuOverviewComponent>>(MatBottomSheetRef);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
