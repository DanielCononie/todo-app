import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { FormControl, Validators } from '@angular/forms';
interface Todo {
  id: number;
  title: string;
  created_at: Date;
  created_by: number;
  public_list: boolean;
}

interface User {
  email: string;
  name: string;
  id: number;
}

@Component({
  selector: 'app-view-todos',
  templateUrl: './view-todos.component.html',
  styleUrl: './view-todos.component.css',
})
export class ViewTodosComponent {
  constructor(
    private todoSvc: TodosService,
    private router: Router,
    private actSvc: AccountService
  ) {}
  isLoggedIn: boolean = false;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  userID: number | undefined;
  searchFormControl = new FormControl('');

  async ngOnInit() {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;

      this.GetUser();
      this.ViewTodos();
    });
    await this.GetUser();
    await this.ViewTodos();
  }

  async GetUser() {
    let userData = (await this.actSvc.GetUser()) as User | false;

    if (userData) {
      this.userID = userData.id;
    }
  }

  async DeleteTodo(id: number) {
    let didDelete = await this.todoSvc.DeleteTodo(id);

    if (didDelete) {
      //filter filtered todos to remove
      alert('Todo deleted');
      this.filteredTodos = this.todos.filter((todo) => todo.id !== id);
    } else {
      // error message
      alert('Could not delete todo due to invalid authorization');
    }
  }

  async ViewTodos() {
    this.todos = (await this.todoSvc.GetTodos()) as Todo[];
    this.filteredTodos = this.todos;
  }

  filterTodos(): void {
    if (this.searchFormControl.value) {
      const searchTerm = this.searchFormControl.value.toLowerCase();
      this.filteredTodos = this.todos.filter(
        (todo) => todo.id.toString() === searchTerm
      );
    }
  }

  filterSharedLists(): void {
    this.filteredTodos = this.todos.filter(
      (todo) => todo.created_by !== this.userID && !todo.public_list
    );
  }

  resetTodos(): void {
    this.filteredTodos = this.todos;
  }

  filterMyLists() {
    this.filteredTodos = this.todos.filter(
      (todo) => todo.created_by === this.userID
    );
  }
}
