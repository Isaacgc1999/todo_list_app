import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { Task } from '../../models/task.models';

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
  @Input() task!: Task;
  @Input() showBin!: boolean;
  @Input() completed!: boolean;
  @Output() taskChecked = new EventEmitter<Task>();
  @Output() deletedTask = new EventEmitter<number>();

  onCheckboxChange(event: MatCheckboxChange): void {
    console.log('Task with id ' + this.task.id + ' was completed');
    if (event.checked) {
      this.task.completed = true;
      this.taskChecked.emit(this.task);
    } else if (!event.checked) {
      this.task.completed = false;
      this.taskChecked.emit(this.task);
    }
    console.log('the current task is: ', this.task);
  }

  onCardClick(): void {
    console.log('Task with id ' + this.task.id + ' was clicked');
  }

  onBinClick(): void {
    console.log('Task with id ' + this.task.id + ' was deleted');
    this.deletedTask.emit(this.task.id);
  }
}
