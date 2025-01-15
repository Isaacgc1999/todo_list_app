import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-home',
  imports: [DatePipe],
  templateUrl: './todo-home.component.html',
  styleUrl: './todo-home.component.scss',
  standalone: true,
})
export class TodoHomeComponent{
  currentDateAndTime: string | null = null;

  constructor(private datePipe: DatePipe){
    this.currentDateAndTime = this.datePipe.transform(new Date());
  }
}
