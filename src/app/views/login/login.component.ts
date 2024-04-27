import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private accSvc: AccountService, private router: Router) {}
  isLoggedIn: boolean = false;
  ngOnInit() {
    this.accSvc.UserLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  emailFormControl = new FormControl('t@t.com', [Validators.required]);
  passwordFormControl = new FormControl('test', [Validators.required]);
  errorMessage: string | undefined;
  loading: boolean = false;

  async Login() {
    if (!this.emailFormControl.invalid && !this.passwordFormControl.invalid) {
      let email = this.emailFormControl.value as string;
      let password = this.passwordFormControl.value as string;
      let loggedIn = await this.accSvc.Login(email, password);

      if (loggedIn) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Invalid Login';
      }
    } else {
      this.loading = false;
      this.errorMessage =
        'All fields are required and must be in the correct format';
    }
  }
}
