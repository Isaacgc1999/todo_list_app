import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  TASK_COMPLETE_DELAY_MS,
  TASK_META_DATE_FORMAT,
} from '../../constants/task.constants';
import { Task } from '../../models/task.models';

@Component({
  selector: 'app-todo-item',
  imports: [DatePipe, MatIconModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  standalone: true,
})
export class TodoItemComponent implements OnDestroy {
  @Input() task!: Task;
  @Input() showBin: boolean = false;
  @Input() completed: boolean = false;
  @Output() taskChecked = new EventEmitter<Task>();
  @Output() deletedTask = new EventEmitter<number>();
  @Output() detailsRequested = new EventEmitter<Task>();

  readonly metaDateFormat = TASK_META_DATE_FORMAT;
  pending = false;
  private pendingTimer?: ReturnType<typeof setTimeout>;

  get checked(): boolean {
    return this.completed !== this.pending;
  }

  onToggle(): void {
    if (this.completed) {
      this.emitToggle();
      return;
    }

    if (this.pending) {
      this.cancelPending();
      return;
    }

    this.pending = true;
    this.pendingTimer = setTimeout(() => {
      this.pending = false;
      this.emitToggle();
    }, TASK_COMPLETE_DELAY_MS);
  }

  openDetails(): void {
    this.cancelPending();
    this.detailsRequested.emit(this.task);
  }

  onBinClick(): void {
    this.deletedTask.emit(this.task.id);
  }

  ngOnDestroy(): void {
    clearTimeout(this.pendingTimer);
  }

  private cancelPending(): void {
    clearTimeout(this.pendingTimer);
    this.pending = false;
  }

  private emitToggle(): void {
    this.task = {
      ...this.task,
      completed: !this.completed,
    };
    this.taskChecked.emit(this.task);
  }
}
