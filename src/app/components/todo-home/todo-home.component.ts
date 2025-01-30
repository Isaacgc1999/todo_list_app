import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TodoDarkmodeComponent } from '../todo-darkmode/todo-darkmode.component';
import { TodoFooterInputComponent } from '../todo-footer-input/todo-footer-input.component';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo-home',
  imports: [
    DatePipe,
    TodoDarkmodeComponent,
    TodoFooterInputComponent,
    TodoListComponent,
  ],
  standalone: true,
  providers: [DatePipe],
  templateUrl: './todo-home.component.html',
  styleUrl: './todo-home.component.scss',
})
export class TodoHomeComponent {
  currentDateAndTime: string | null = null;
  task: string | null = null;

  constructor(private datePipe: DatePipe) {
    this.currentDateAndTime = this.datePipe.transform(new Date());
  }

  getTask(event: string): void {
    this.task = event;
  }
}
