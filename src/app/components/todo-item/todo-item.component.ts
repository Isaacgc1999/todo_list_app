import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Task } from '../../models/task.models';
import { TodoTaskItemDialogComponent } from '../todo-task-item-dialog/todo-task-item-dialog.component';

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
  @Input() showBin: boolean = false;
  @Input() completed: boolean = false;
  @Output() taskChecked = new EventEmitter<Task>();
  @Output() deletedTask = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {}

  onCheckboxChange(event: MatCheckboxChange): void {
    this.task = {
      ...this.task,
      completed: event.checked,
    };
    this.taskChecked.emit(this.task);
  }

  onCardClick(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    console.log('Task with id ' + this.task.id + ' was clicked');
    const dialogRef = this.dialog.open(TodoTaskItemDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.task,
      minWidth: '700px',
      minHeight: '500px',
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    //   if (result !== undefined) {
    //     this.task = result;
    //   }
    // });
  }

  onBinClick(): void {
    this.deletedTask.emit(this.task.id);
  }
}
