import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

interface Token {
  token: string;
}

interface User {
  email: string;
  name: string;
  id: number;
}

interface UserData {
  email: string | undefined;
  name: string | undefined;
  id: number | undefined;
}
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private router: Router, private httpClient: HttpClient) {}

  UserLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoggedIn: boolean = false;

  LogOut() {
    this.UserLoggedIn.emit(false);
  }

  async GetUser() {
    let token = localStorage.getItem('token');

    if (!token || !this.isLoggedIn) {
      return false;
    }
    let tokenValue: Token = JSON.parse(token);

    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokenValue.token}`,
      });

      let response = await firstValueFrom(
        this.httpClient.get('https://unfwfspring2024.azurewebsites.net/user', {
          headers: headers,
        })
      );

      return response;
    } catch (error) {
      return false;
    }
  }

  async UpdateUser(
    email: string | null,
    name: string | null,
    password: string | null
  ) {
    let userData: { [key: string]: string } = {};

    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let tokenValue: Token = JSON.parse(token);

    if (!email && !name && !password) {
      return false;
    }

    if (email !== null) {
      userData['email'] = email;
    }

    if (name !== null) {
      userData['name'] = name;
    }

    if (password !== null) {
      userData['password'] = password;
    }

    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokenValue.token}`,
      });

      let response = await firstValueFrom(
        this.httpClient.patch(
          'https://unfwfspring2024.azurewebsites.net/user',
          userData,
          { headers: headers }
        )
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async Login(email: string, password: string) {
    let userData = {
      email: email,
      password: password,
    };
    try {
      const encodedHeaders = btoa(`${userData.email}:${userData.password}`);

      // Prepare the headers with Authorization
      const headers = new HttpHeaders({
        authorization: `Basic ${encodedHeaders}`,
      });
      let response = await firstValueFrom(
        this.httpClient.post(
          'https://unfwfspring2024.azurewebsites.net/user/login',
          userData,
          { headers: headers }
        )
      );
      localStorage.setItem(`token`, JSON.stringify(response));
      this.UserLoggedIn.emit(true);
      this.isLoggedIn = true;

      return true;
    } catch (error) {
      return false;
    }
  }

  async CreateUser(email: string, name: string, password: string) {
    let userData = {
      email: email,
      name: name,
      password: password,
    };

    try {
      let response = await firstValueFrom(
        this.httpClient.post(
          'https://unfwfspring2024.azurewebsites.net/user',
          userData
        )
      );

      return true;
    } catch (err: any) {
      return false;
    }
  }
}
