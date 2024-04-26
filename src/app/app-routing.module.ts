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
import { AuthGuard } from './auth.guard';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'updateUser',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: ViewTodosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listItem/:id',
    component: ListItemComponent,
  },
  {
    path: 'share/:id',
    component: ShareComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addListItem/:id',
    component: AddListItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'updateListItem/:todoid/:itemId',
    component: UpdateListItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'updateTodo/:id',
    component: UpdateTodoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
