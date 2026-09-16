import {
  Component,
  EventEmitter,
  Input,
  Output,
  afterNextRender,
} from '@angular/core';
import { rowAnimation } from '../../animations/list.animations';
import { REDUCED_MOTION_QUERY } from '../../constants/media.constants';
import { Task } from '../../models/task.models';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  animations: [rowAnimation],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
})
export class TodoListComponent {
  @Input() tasks: Task[] = [];
  @Input() showCompleted: boolean = false;
  @Output() taskChecked = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskOpened = new EventEmitter<Task>();

  animationsDisabled = true;

  constructor() {
    afterNextRender(() => {
      this.animationsDisabled = matchMedia(REDUCED_MOTION_QUERY).matches;
    });
  }

  onTaskToggled(task: Task): void {
    this.taskChecked.emit(task);
  }

  onDeletedTask(taskId: number): void {
    this.taskDeleted.emit(taskId);
  }

  onTaskOpened(task: Task): void {
    this.taskOpened.emit(task);
  }

  get reversedTasks(): Task[] {
    return this.tasks.slice().reverse();
  }
}
