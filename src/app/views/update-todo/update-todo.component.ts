import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { FormControl, Validators } from '@angular/forms';

interface Todo {
  id: number;
  title: string;
  created_at: Date;
  created_by: number;
  public_list: boolean;
}

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrl: './update-todo.component.css',
})
export class UpdateTodoComponent {
  constructor(
    private todoSvc: TodosService,
    private activatedRoute: ActivatedRoute,
    private actSvc: AccountService,
    private router: Router
  ) {}

  titleFormControl = new FormControl('', [Validators.required]);
  publicFormControl = new FormControl('', [Validators.required]);
  currentTodoList: Todo | null = null;
  todoID: number | null = null;
  errMessage: string | null = null;

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.todoID = parseInt(id);
    }

    await this.GetTodoById();

    if (this.currentTodoList) {
      let public_status: string | boolean = this.currentTodoList.public_list;
      let public_string: string | null = null;

      public_string = public_status ? 'yes' : 'no';

      this.titleFormControl.setValue(this.currentTodoList.title);
      this.publicFormControl.setValue(public_string);
    }
  }

  async UpdateTodo() {
    if (this.titleFormControl.invalid || this.publicFormControl.invalid) {
      this.errMessage = 'Both are required';
      return;
    }

    let title = this.titleFormControl.value;
    let public_form_value = this.publicFormControl.value;

    let public_bool = public_form_value === 'yes' ? true : false;

    if (title && public_bool !== undefined && this.todoID) {
      let didUpdate = await this.todoSvc.UpdateTodo(
        title,
        public_bool,
        this.todoID
      );
      if (didUpdate) {
        alert('Success');
        this.router.navigate(['/']);
      }
    } else {
      this.errMessage = 'Authentication error, returning to home';

      return;
    }
  }

  async GetTodoById() {
    if (!this.todoID) {
      return;
    }

    this.currentTodoList = (await this.todoSvc.GetTodoById(
      this.todoID
    )) as Todo;
  }
}
