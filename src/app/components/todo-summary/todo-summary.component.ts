import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-summary',
  standalone: true,
  templateUrl: './todo-summary.component.html',
  styleUrl: './todo-summary.component.scss',
})
export class TodoSummaryComponent {
  @Input() openCount: number = 0;
  @Input() completedCount: number = 0;

  get totalCount(): number {
    return this.openCount + this.completedCount;
  }

  get progress(): number {
    return this.totalCount ? (this.completedCount / this.totalCount) * 100 : 0;
  }
}
