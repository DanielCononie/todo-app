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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
