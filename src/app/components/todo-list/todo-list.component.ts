import { Component, Input } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
})
export class TodoListComponent {
  @Input() tasks: { id: number; taskName: string; completed: boolean }[] = [];

  constructor() {}

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
  }
}
