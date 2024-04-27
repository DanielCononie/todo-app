import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AccountService } from './account.service';
interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private actSvc: AccountService
  ) {}
  isLoggedIn: boolean = false;
  loggedIn: boolean = false;

  ngOnInit() {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
    this.loggedIn = this.actSvc.isLoggedIn;
  }

  async DeleteSharedList(email: string, id: number) {
    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let tokenValue: Token = JSON.parse(token);

    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokenValue.token}`,
      });

      let response = await firstValueFrom(
        this.httpClient.delete(
          `https://unfwfspring2024.azurewebsites.net/todo/${id}}/share/${email}`,
          { headers: headers }
        )
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async UpdateTodo(title: string, public_list: boolean, list_id: number) {
    let list_data = {
      title: title,
      public_list: public_list,
    };

    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let tokenValue: Token = JSON.parse(token);

    if (!title || public_list == undefined) {
      return false;
    }

    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokenValue.token}`,
      });

      let response = await firstValueFrom(
        this.httpClient.patch(
          `https://unfwfspring2024.azurewebsites.net/todo/${list_id}`,
          list_data,
          { headers: headers }
        )
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async GetListItemById(todoId: number, list_item_id: number) {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    if (!this.isLoggedIn) {
      // Make request with public lists
      try {
        let response = await firstValueFrom(
          this.httpClient.get(
            `https://unfwfspring2024.azurewebsites.net/todo/${todoId}/item/${list_item_id}`
          )
        );

        return response;
      } catch (error) {
        return null;
      }
    } else {
      try {
        let token = localStorage.getItem('token');
        if (!token) {
          let response = await firstValueFrom(
            this.httpClient.get(
              `https://unfwfspring2024.azurewebsites.net/todo/${todoId}/item/${list_item_id}`
            )
          );

          return response;
        }

        let tokenValue: Token = JSON.parse(token);

        const headers = new HttpHeaders({
          Authorization: `Bearer ${tokenValue.token}`,
        });
        // Make requests with token
        let response = await firstValueFrom(
          this.httpClient.get(
            `https://unfwfspring2024.azurewebsites.net/todo/${todoId}/item/${list_item_id}`,
            { headers: headers }
          )
        );
        return response;
      } catch (error) {
        return null;
      }
    }
  }

  async UpdateListItem(
    task: string | null,
    due_date: Date | null,
    todoid: number,
    list_item_id: number
  ) {
    // let list_item_data: { [key: string]: string | Date | null } = {};
    let list_item_data = {
      task: task,
      due_date: due_date,
    };

    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let tokenValue: Token = JSON.parse(token);

    if (!task && !due_date) {
      return false;
    }

    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokenValue.token}`,
      });

      let response = await firstValueFrom(
        this.httpClient.patch(
          `https://unfwfspring2024.azurewebsites.net/todo/${todoid}/item/${list_item_id}`,
          list_item_data,
          { headers: headers }
        )
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async DeleteListItem(list_item_id: number, todoID: number) {
    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let tokenValue: Token = JSON.parse(token);

    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokenValue.token}`,
      });

      let response = await firstValueFrom(
        this.httpClient.delete(
          `https://unfwfspring2024.azurewebsites.net/todo/${todoID}/item/${list_item_id}`,
          { headers: headers }
        )
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async AddListItem(todoID: number, task: string, due_date: Date) {
    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let tokenValue: Token = JSON.parse(token);

    let userData = {
      task: task,
      due_date: due_date,
    };

    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokenValue.token}`,
      });

      let response = await firstValueFrom(
        this.httpClient.post(
          `https://unfwfspring2024.azurewebsites.net/todo/${todoID}/item`,
          userData,
          { headers: headers }
        )
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async GetTodoById(todoID: number) {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    if (!this.isLoggedIn) {
      // Make request with public lists
      try {
        let response = await firstValueFrom(
          this.httpClient.get(
            `https://unfwfspring2024.azurewebsites.net/todo/${todoID}`
          )
        );

        return response;
      } catch (error) {
        return null;
      }
    } else {
      try {
        let token = localStorage.getItem('token');
        if (!token) {
          let response = await firstValueFrom(
            this.httpClient.get(
              `https://unfwfspring2024.azurewebsites.net/todo/${todoID}`
            )
          );

          return response;
        }

        let tokenValue: Token = JSON.parse(token);

        const headers = new HttpHeaders({
          Authorization: `Bearer ${tokenValue.token}`,
        });
        // Make requests with token
        let response = await firstValueFrom(
          this.httpClient.get(
            `https://unfwfspring2024.azurewebsites.net/todo/${todoID}`,
            { headers: headers }
          )
        );
        return response;
      } catch (error) {
        return null;
      }
    }
  }

  async GetListItems(todoID: number) {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    if (!this.isLoggedIn) {
      // Make request with public lists

      try {
        let response = await firstValueFrom(
          this.httpClient.get(
            `https://unfwfspring2024.azurewebsites.net/todo/${todoID}/items`
          )
        );

        return response;
      } catch (error) {
        return null;
      }
    } else {
      try {
        let token = localStorage.getItem('token');
        if (!token) {
          let response = await firstValueFrom(
            this.httpClient.get(
              `https://unfwfspring2024.azurewebsites.net/todo/${todoID}/items`
            )
          );

          return response;
        }

        let tokenValue: Token = JSON.parse(token);

        const headers = new HttpHeaders({
          Authorization: `Bearer ${tokenValue.token}`,
        });
        // Make requests with token
        let response = await firstValueFrom(
          this.httpClient.get(
            `https://unfwfspring2024.azurewebsites.net/todo/${todoID}/items`,
            { headers: headers }
          )
        );

        return response;
      } catch (error) {
        return null;
      }
    }
  }

  async ShareList(id: number, email: string) {
    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let tokenValue: Token = JSON.parse(token);

    let userData = {
      email: email,
    };

    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokenValue.token}`,
      });

      let response = await firstValueFrom(
        this.httpClient.post(
          `https://unfwfspring2024.azurewebsites.net/todo/${id}/share`,
          userData,
          { headers: headers }
        )
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async DeleteTodo(id: number) {
    let token = localStorage.getItem('token');
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
    if (!token || !this.isLoggedIn) {
      alert('Not logged in');
      this.router.navigateByUrl('/login');
      return false;
    }

    let tokenValue: Token = JSON.parse(token);

    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokenValue.token}`,
      });

      let response = await firstValueFrom(
        this.httpClient.delete(
          `https://unfwfspring2024.azurewebsites.net/todo/${id}`,
          { headers: headers }
        )
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async GetTodos() {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    if (!this.isLoggedIn) {
      // Make request with public lists
      try {
        let response = await firstValueFrom(
          this.httpClient.get('https://unfwfspring2024.azurewebsites.net/todo')
        );

        return response;
      } catch (error) {
        return null;
      }
    } else {
      try {
        let token = localStorage.getItem('token');

        if (!token || !this.actSvc.isLoggedIn) {
          let response = await firstValueFrom(
            this.httpClient.get(
              'https://unfwfspring2024.azurewebsites.net/todo'
            )
          );

          return response;
        }

        let tokenValue: Token = JSON.parse(token);

        const headers = new HttpHeaders({
          Authorization: `Bearer ${tokenValue.token}`,
        });
        // Make requests with token
        let response = await firstValueFrom(
          this.httpClient.get(
            'https://unfwfspring2024.azurewebsites.net/todo',
            { headers: headers }
          )
        );

        return response;
      } catch (error) {
        return null;
      }
    }
  }

  async AddTodo(title: string, publicStatus: boolean) {
    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let tokenValue: Token = JSON.parse(token);

    let userData = {
      title: title,
      public: publicStatus,
    };

    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokenValue.token}`,
      });

      let response = await firstValueFrom(
        this.httpClient.post(
          'https://unfwfspring2024.azurewebsites.net/todo',
          userData,
          { headers: headers }
        )
      );

      return true;
    } catch (error) {
      return false;
    }
  }
}
