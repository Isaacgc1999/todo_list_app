import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-home',
  imports: [],
  templateUrl: './todo-home.component.html',
  styleUrl: './todo-home.component.scss',
  standalone: true,
})
export class TodoHomeComponent implements OnInit{
  currentDateAndTime: string | null = null;

  constructor(){}

  ngOnInit(): void {
  }

}
