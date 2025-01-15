import { Routes } from '@angular/router';
import { TodoHomeComponent } from './components/todo-home/todo-home.component';

export const routes: Routes = [
    { path: '', component: TodoHomeComponent },
    { path: '**', redirectTo: '' }
];
