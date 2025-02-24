import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-todo-text-field',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './todo-text-field.component.html',
  styleUrl: './todo-text-field.component.scss',
  standalone: true,
})
export class TodoTextFieldComponent {
  descriptionControl = new FormControl('');
  @Output() description = new EventEmitter<string | null>();

  constructor() {
    this.descriptionControl.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((value) => {
        this.description.emit(value);
      });
  }
}
