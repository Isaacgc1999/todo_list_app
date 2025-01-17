import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TodoDarkmodeComponent } from '../todo-darkmode/todo-darkmode.component';
import { TodoFooterInputComponent } from '../todo-footer-input/todo-footer-input.component';

@Component({
  selector: 'app-todo-home',
  imports: [
    DatePipe,
    TodoDarkmodeComponent,
    TodoDarkmodeComponent,
    TodoFooterInputComponent,
    TodoFooterInputComponent,
  ],
  templateUrl: './todo-home.component.html',
  styleUrl: './todo-home.component.scss',
  standalone: true,
})
export class TodoHomeComponent {
  currentDateAndTime: string | null = null;

  constructor(private datePipe: DatePipe) {
    this.currentDateAndTime = this.datePipe.transform(new Date());
  }
}
