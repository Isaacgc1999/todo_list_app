import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoInputBarComponent } from '../utils/todo-input-bar/todo-input-bar.component';

@Component({
  selector: 'app-todo-footer-input',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TodoInputBarComponent,
  ],
  standalone: true,
  templateUrl: './todo-footer-input.component.html',
  styleUrl: './todo-footer-input.component.scss',
})
export class TodoFooterInputComponent {}
