import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.models';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
})
export class TodoListComponent {
  @Input() tasks: Task[] = [];
  @Input() showCompleted: boolean = false;
  @Output() taskChecked = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<number>();

  onTaskToggled(task: Task): void {
    console.log('Task with id ' + task.id + ' was toggled');
    this.taskChecked.emit(task);
  }

  onDeletedTask(taskId: number): void {
    console.log('Task with id ' + taskId + ' was deleted');
    this.taskDeleted.emit(taskId);
  }

  get reversedTasks(): Task[] {
    return this.tasks.slice().reverse();
  }
}
