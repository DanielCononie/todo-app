import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../../services/todos.service';
import { AccountService } from '../../services/account.service';

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
  sharedWith: User[];
}

interface ListItem {
  id: number;
  task: string;
  completed: boolean;
  todo_list_id: number;
  completed_by: number;
  updated_at: Date;
  completed_by_user: User;
}

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
})
export class ListItemComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private todoSvc: TodosService,
    private actSvc: AccountService
  ) {}
  todoID: number | undefined;
  todoItems: ListItem[] = [];
  filteredTodoItems: ListItem[] = [];
  userID: number | undefined;
  userEmail: string | undefined;
  usersSharedWith: User[] = [];
  currentTodoList: Todo | undefined;
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.todoID = parseInt(id);
      console.log(this.todoID);
    }
    this.GetUser();
    this.GetTodoById();
    this.GetListItems();
  }

  // GET LIST ITEMS BY ID
  async GetListItems() {
    if (!this.todoID) {
      console.log('Route to home');
      return;
    }
    this.todoItems = (await this.todoSvc.GetListItems(
      this.todoID
    )) as ListItem[];

    this.filteredTodoItems = this.todoItems;
  }

  async GetUser() {
    let userData = (await this.actSvc.GetUser()) as User | false;

    if (userData) {
      this.userID = userData.id;
      this.userEmail = userData.email;
    }
  }

  async GetTodoById() {
    if (!this.todoID) {
      console.log('Route to home');
      return;
    }

    this.currentTodoList = (await this.todoSvc.GetTodoById(
      this.todoID
    )) as Todo;

    this.usersSharedWith = this.currentTodoList.sharedWith;
    console.log(this.currentTodoList);
  }

  isUserSharedWith(email: string | undefined): boolean {
    console.log(this.usersSharedWith);
    if (!email) return false;
    return this.usersSharedWith.some((user) => user.email === email);
  }
  async DeleteListItem(list_item_id: number, todoID: number | undefined) {
    if (!todoID) {
      alert('Could not delete list items due to a permissions error 1');
      return;
    }
    let didDelete = await this.todoSvc.DeleteListItem(list_item_id, todoID);

    if (didDelete) {
      // Remove from array
      this.filteredTodoItems = this.filteredTodoItems.filter(
        (item) => item.id !== list_item_id
      );
      alert('Deleted successfully');
    } else {
      alert('Could not delete list items due to a permissions error');
    }
  }

  // SHOW LIST ITEMS
}
