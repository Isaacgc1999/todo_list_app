import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
})
export class TodoListComponent {
  @Input() tasks: { id: number; taskName: string }[] = [];
  @Input() showCompleted: boolean = false;
  @Output() taskChecked = new EventEmitter<{ id: number; taskName: string }>();

  constructor() {}

  onTaskToggled(task: { id: number; taskName: string }): void {
    this.taskChecked.emit(task);
  }
}
