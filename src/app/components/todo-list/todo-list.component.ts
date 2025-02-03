import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
})
export class TodoListComponent {
  @Input() tasks: { id: number; taskName: string }[] = [];
  @Output() taskChecked = new EventEmitter<{ id: number; taskName: string }>();

  constructor() {}

  onTaskToggled(task: { id: number; taskName: string }): void {
    this.taskChecked.emit(task);
  }
}
