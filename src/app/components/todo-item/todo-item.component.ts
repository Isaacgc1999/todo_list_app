import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-todo-item',
  imports: [
    MatCardModule,
    FormsModule,
    MatCheckboxModule,
    MatIcon,
    CommonModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  standalone: true,
})
export class TodoItemComponent {
  @Input() task!: { id: number; taskName: string };
  @Input() showBin!: boolean;
  @Input() completed!: boolean;
  @Output() taskChecked = new EventEmitter<{ id: number; taskName: string }>();
  @Output() deletedTask = new EventEmitter<number>();

  onCheckboxChange(): void {
    console.log('Task with id ' + this.task.id + ' was completed');
    this.taskChecked.emit(this.task);
  }

  onCardClick(): void {
    console.log('Task with id ' + this.task.id + ' was clicked');
  }

  onBinClick(): void {
    console.log('Task with id ' + this.task.id + ' was deleted');
    this.deletedTask.emit(this.task.id);
  }
}
