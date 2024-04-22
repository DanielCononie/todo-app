import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent {
  constructor(private todosSvc: TodosService, private router: Router) {}

  titleFormControl = new FormControl('', [Validators.required]);
  publicFormControl = new FormControl('', [Validators.required]);
  errMessage: string | undefined;
  loading: boolean = false;

  async AddTodo() {
    this.loading = true;
    if (!this.titleFormControl.invalid && !this.publicFormControl.invalid) {
      let title = this.titleFormControl.value as string;
      let publicStatus = this.publicFormControl.value as string;
      let publicBool: boolean | undefined;

      if (publicStatus === 'yes') {
        publicBool = true;
      } else {
        publicBool = false;
      }
      try {
        let didPost = await this.todosSvc.AddTodo(title, publicBool);
        if (didPost) {
          //Handle successful post
          this.loading = false;
          this.errMessage = 'Successful Post';
        } else {
          // employ error message
          this.loading = false;
          this.errMessage = 'User must have valid authorization';
        }
      } catch (error) {
        this.loading = false;
        this.errMessage = 'User must have valid authorization';
      }
    } else {
      this.loading = false;
      this.errMessage = 'Both fields are required';
    }
  }
}
