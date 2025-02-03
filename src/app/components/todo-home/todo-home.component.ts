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
  tasks: { id: number; taskName: string }[] = [];
  completed_tasks: { id: number; taskName: string }[] = [];

  constructor(private datePipe: DatePipe) {
    this.currentDateAndTime = this.datePipe.transform(new Date());

    //to preserve tasks on page reload
    const storedTasks = localStorage.getItem('tasks');
    const storedCompletedTasks = localStorage.getItem('completed_tasks');

    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.completed_tasks = storedCompletedTasks
      ? JSON.parse(storedCompletedTasks)
      : [];
  }

  getTask(event: string): void {
    let lastId = localStorage.getItem('lastTaskId');
    let newId = lastId ? parseInt(lastId, 10) + 1 : 1;
    const newTask = {
      id: newId,
      taskName: event,
    };

    this.tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('lastTaskId', newId.toString());
  }

  currentTaskChecked(task: { id: number; taskName: string }): void {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    this.completed_tasks.push(task);
    localStorage.setItem(
      'completed_tasks',
      JSON.stringify(this.completed_tasks)
    );
  }
}
