import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface User {
  email: string;
  name: string;
  id: number;
}

interface Todo {
  id: number;
  title: string;
  created_at: Date;
  created_by: number;
  public_list: boolean;
  shared_with: User[];
}

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrl: './share.component.css',
})
export class ShareComponent {
  constructor(
    private todoSvc: TodosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  todoID: number | undefined;
  currentTodoList: Todo | null = null;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  errMessage: string = '';

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.todoID = parseInt(id);
    }
    this.GetTodoById();
  }

  async GetTodoById() {
    if (!this.todoID) {
      return;
    }

    this.currentTodoList = (await this.todoSvc.GetTodoById(
      this.todoID
    )) as Todo;
  }

  async DeleteSharedList(email: string) {
    if (this.todoID && this.currentTodoList) {
      let didDelete = await this.todoSvc.DeleteSharedList(email, this.todoID);

      if (didDelete) {
        alert('Delete successful');
        this.currentTodoList.shared_with =
          this.currentTodoList.shared_with.filter(
            (user) => user.email !== email
          );
      } else {
        alert('Unsucessful');
      }
    }
  }

  async ShareList() {
    // Get the value of the ID from the params
    if (
      !this.emailFormControl.invalid &&
      this.todoID &&
      this.emailFormControl.value
    ) {
      let email = this.emailFormControl.value;

      let didShare = await this.todoSvc.ShareList(this.todoID, email);

      if (didShare) {
        this.router.navigateByUrl('/');
      } else {
        // Unsuccessful
        this.errMessage = 'No user with that email';
      }
    } else {
      this.errMessage = 'The email must be a valid email';
    }
  }
}
