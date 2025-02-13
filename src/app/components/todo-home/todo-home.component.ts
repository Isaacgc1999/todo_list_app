import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Task } from '../../models/task.models';
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
  tasks: Task[] = [];
  completed_tasks: Task[] = [];

  constructor(private datePipe: DatePipe) {
    this.currentDateAndTime = this.datePipe.transform(new Date());
    //to preserve tasks on page reload
    this.savedTasks();
  }

  savedTasks(): void {
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
    this.setLocalStorageTasks(this.tasks);
    localStorage.setItem('lastTaskId', newId.toString());
  }

  onCurrentTaskChecked(task: Task): void {
    if (task.completed) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      this.setLocalStorageTasks(this.tasks);

      this.completed_tasks.push(task);
      localStorage.setItem(
        'completed_tasks',
        JSON.stringify(this.completed_tasks)
      );
    } else {
      this.completed_tasks = this.completed_tasks.filter(
        (t) => t.id !== task.id
      );
      localStorage.setItem(
        'completed_tasks',
        JSON.stringify(this.completed_tasks)
      );

      this.tasks.push(task);
      this.setLocalStorageTasks(this.tasks);
    }
  }

  onDeletedTask(taskId: number): void {
    this.completed_tasks = this.completed_tasks.filter((t) => t.id !== taskId);
    localStorage.setItem(
      'completed_tasks',
      JSON.stringify(this.completed_tasks)
    );
  }

  setLocalStorageTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
