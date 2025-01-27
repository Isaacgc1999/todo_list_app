import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-input-bar',
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
  @Output() task: string = '';

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      task: [''],
    });
  }

  addTask(): void {
    if (this.todoForm.valid) {
      this.task = this.todoForm.value.task;
      console.log('Task added:', this.task);
      this.todoForm.reset();
    }
  }
}
