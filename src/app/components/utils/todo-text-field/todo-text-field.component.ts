import { Component } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-todo-text-field',
  imports: [MatLabel, MatFormFieldModule],
  templateUrl: './todo-text-field.component.html',
  styleUrl: './todo-text-field.component.scss',
})
export class TodoTextFieldComponent {}
