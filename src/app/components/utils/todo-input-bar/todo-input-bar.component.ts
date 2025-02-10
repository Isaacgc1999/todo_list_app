import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-input-bar',
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIcon,
  ],
  standalone: true,
  templateUrl: './todo-input-bar.component.html',
  styleUrl: './todo-input-bar.component.scss',
})
export class TodoInputBarComponent {
  todoForm: FormGroup;
  @Output() task = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      task: ['', Validators.required],
    });
  }

  addTask(): void {
    if (this.todoForm.valid) {
      this.task.emit(this.todoForm.value.task);
      this.todoForm.reset();
    }
  }
}
