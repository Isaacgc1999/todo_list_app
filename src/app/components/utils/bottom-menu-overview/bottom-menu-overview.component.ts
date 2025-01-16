import { Component, inject, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-bottom-menu-overview',
  imports: [MatListModule, MatIconModule],
  templateUrl: './bottom-menu-overview.component.html',
  styleUrl: './bottom-menu-overview.component.scss'
})
export class BottomMenuOverviewComponent implements OnInit{
  currentMode: 'dark' | 'light' = 'light'; 

  ngOnInit(): void {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark' || savedMode === 'light') {
      this.currentMode = savedMode;
    }
    else {
      this.currentMode = 'light'; 
    }
    this.applyTheme(this.currentMode);
  }

  toggleDarkMode(event: Event): void {
    const clickedElement = (event.target as HTMLElement).innerText.trim().toLowerCase();
    this.currentMode = clickedElement === 'dark' ? 'dark' : 'light';

    this.applyTheme(this.currentMode);

    localStorage.setItem('theme', this.currentMode);
  }

  applyTheme(mode: 'dark' | 'light'): void {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }
}