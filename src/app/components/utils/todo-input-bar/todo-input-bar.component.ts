import { UpperCasePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  NEW_TASK_SHORTCUT_KEY,
  SHORTCUT_IGNORED_TARGETS,
} from '../../../constants/composer.constants';
import { TASK_NAME_PATTERN } from '../../../constants/task.constants';

@Component({
  selector: 'app-todo-input-bar',
  imports: [ReactiveFormsModule, MatIconModule, UpperCasePipe],
  standalone: true,
  templateUrl: './todo-input-bar.component.html',
  styleUrl: './todo-input-bar.component.scss',
})
export class TodoInputBarComponent {
  todoForm: FormGroup;
  @Output() task = new EventEmitter<string>();
  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;

  readonly shortcutKey = NEW_TASK_SHORTCUT_KEY;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      task: ['', [Validators.required, Validators.pattern(TASK_NAME_PATTERN)]],
    });
  }

  addTask(): void {
    if (this.todoForm.valid) {
      this.task.emit(this.todoForm.value.task.trim());
      this.todoForm.reset();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (
      event.key.toLowerCase() !== this.shortcutKey ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey
    ) {
      return;
    }

    const target = event.target;
    if (target instanceof Element && target.closest(SHORTCUT_IGNORED_TARGETS)) {
      return;
    }

    event.preventDefault();
    this.taskInput.nativeElement.focus();
  }
}
