import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AddTodoComponent } from './views/add-todo/add-todo.component';
import { UpdateUserComponent } from './views/update-user/update-user.component';
import { ViewTodosComponent } from './views/view-todos/view-todos.component';
import { ListItemComponent } from './views/list-item/list-item.component';
import { ShareComponent } from './views/share/share.component';
import { AddListItemComponent } from './views/add-list-item/add-list-item.component';
import { UpdateListItemComponent } from './views/update-list-item/update-list-item.component';
import { UpdateTodoComponent } from './views/update-todo/update-todo.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: ViewTodosComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'addTodo',
    component: AddTodoComponent,
  },
  {
    path: 'updateUser',
    component: UpdateUserComponent,
  },
  {
    path: 'edit/:id',
    component: ViewTodosComponent,
  },
  {
    path: 'listItem/:id',
    component: ListItemComponent,
  },
  {
    path: 'share/:id',
    component: ShareComponent,
  },
  {
    path: 'addListItem/:id',
    component: AddListItemComponent,
  },
  {
    path: 'updateListItem/:todoid/:itemId',
    component: UpdateListItemComponent,
  },
  {
    path: 'updateTodo/:id',
    component: UpdateTodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
