import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private accSvc: AccountService, private router: Router) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  errorMessage: string | undefined;
  loading: boolean = false;

  async CreateUser() {
    this.loading = true;
    if (
      !this.emailFormControl.invalid &&
      !this.nameFormControl.invalid &&
      !this.passwordFormControl.invalid
    ) {
      // ====================================
      let email = this.emailFormControl.value as string;
      let name = this.nameFormControl.value as string;
      let password = this.passwordFormControl.value as string;
      try {
        let didPost = await this.accSvc.CreateUser(email, name, password);

        if (didPost) {
          // Handle success
          this.errorMessage = 'User Creation successful';
          this.router.navigateByUrl('login');
          this.loading = false;

          // Route to login
        } else {
          // Handle failure
          this.loading = false;
          this.errorMessage = 'User Creation failed, email already exists';
        }
      } catch (err) {
        console.error('Error creating user:', err);
        this.loading = false;
      }
    } else {
      this.loading = false;
      this.errorMessage =
        'All fields are required and must be in the correct format';
    }
  }
}
