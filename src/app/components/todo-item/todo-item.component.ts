import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-item',
  imports: [MatCardModule, FormsModule, MatCheckboxModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  standalone: true,
})
export class TodoItemComponent {
  @Input() task!: { id: number; taskName: string };
  @Output() taskChecked = new EventEmitter<{ id: number; taskName: string }>();

  onCheckboxChange(): void {
    console.log('Task with id ' + this.task.id + ' was completed');
    this.taskChecked.emit(this.task);
  }

  onCardClick(): void {
    console.log('Task with id ' + this.task.id + ' was clicked');
  }
}
