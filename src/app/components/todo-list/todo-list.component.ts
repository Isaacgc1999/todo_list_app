import { Component } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
})
export class TodoListComponent {
  tasks = [
    {
      id: 1,
      taskName: 'Learn Angular',
      completed: false,
    },
    {
      id: 2,
      taskName: 'Learn React',
      completed: false,
    },
    {
      id: 3,
      taskName: 'Learn Vue',
      completed: false,
    },
  ];

  constructor() {}

  addTask(task: string): void {
    this.tasks.push({
      id: this.tasks.length + 1,
      taskName: task,
      completed: false,
    });
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
  }
}
