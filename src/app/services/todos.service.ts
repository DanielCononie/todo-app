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
      if (this.isLoggedIn) {
        // Perform any actions you want when the user is logged in
      } else console.log('User is not logged in!');
    });

    if (!this.isLoggedIn) {
      // Make request with public lists
      try {
        let response = await firstValueFrom(
          this.httpClient.get('https://unfwfspring2024.azurewebsites.net/todo')
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
              'https://unfwfspring2024.azurewebsites.net/todo'
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
            'https://unfwfspring2024.azurewebsites.net/todo',
            { headers: headers }
          )
        );
        console.log(response);
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
      console.log(response);
      return true;
    } catch (error) {
      return false;
    }
  }
}
