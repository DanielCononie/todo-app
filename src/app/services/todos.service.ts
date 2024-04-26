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

    console.log(list_data);

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
      console.log(response);
      return true;
    } catch (error) {
      console.log('Update false');
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
        console.log('List item by ID', response);
        return response;
      } catch (error) {
        console.log('Error in public lists');
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
          console.log('List item by ID', response);
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

    console.log(list_item_data);

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
      console.log(response);
      return true;
    } catch (error) {
      console.log('Update false');
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
      console.log(list_item_id, todoID);

      let response = await firstValueFrom(
        this.httpClient.delete(
          `https://unfwfspring2024.azurewebsites.net/todo/${todoID}/item/${list_item_id}`,
          { headers: headers }
        )
      );
      console.log(response);
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
      console.log(response);
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
        console.log(response);
        return response;
      } catch (error) {
        console.log('Error in public lists');
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
          console.log(response);
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
      console.log('Yo');
      try {
        let response = await firstValueFrom(
          this.httpClient.get(
            `https://unfwfspring2024.azurewebsites.net/todo/${todoID}/items`
          )
        );
        console.log(response);
        return response;
      } catch (error) {
        console.log('Error in public lists');
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
      console.log(response);
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
      console.log(response);
      return true;
    } catch (error) {
      return false;
    }
  }

  async GetTodos() {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    console.log(this.isLoggedIn);

    if (!this.isLoggedIn) {
      // Make request with public lists
      try {
        let response = await firstValueFrom(
          this.httpClient.get('https://unfwfspring2024.azurewebsites.net/todo')
        );
        console.log(response, 'DUDE3');
        return response;
      } catch (error) {
        console.log('Error in public lists');
        return null;
      }
    } else {
      try {
        let token = localStorage.getItem('token');
        console.log(!token, !this.actSvc.isLoggedIn);
        if (!token || !this.actSvc.isLoggedIn) {
          let response = await firstValueFrom(
            this.httpClient.get(
              'https://unfwfspring2024.azurewebsites.net/todo'
            )
          );
          console.log(response, 'DUDE');
          return response;
        }

        console.log(!token, !this.actSvc.isLoggedIn, this.loggedIn);
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
        console.log(response, 'DUDE2');
        return response;
      } catch (error) {
        return null;
      }
    }
  }

  async AddTodo(title: string, publicStatus: boolean) {
    let token = localStorage.getItem('token');
    if (!token) {
      console.log('FALSE');
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
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
