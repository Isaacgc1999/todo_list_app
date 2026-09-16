import { Component, EventEmitter, Output } from '@angular/core';
import { TodoInputBarComponent } from '../utils/todo-input-bar/todo-input-bar.component';

@Component({
  selector: 'app-todo-footer-input',
  imports: [TodoInputBarComponent],
  standalone: true,
  templateUrl: './todo-footer-input.component.html',
  styleUrl: './todo-footer-input.component.scss',
})
export class TodoFooterInputComponent {
  @Output() task = new EventEmitter<string>();

  getTask(event: string): void {
    this.task.emit(event);
  }
}
