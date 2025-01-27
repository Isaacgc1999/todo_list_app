import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-input-bar',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './todo-input-bar.component.html',
  styleUrl: './todo-input-bar.component.scss',
})
export class TodoInputBarComponent {
  @Output() todoFormControl = new FormControl('');
}
