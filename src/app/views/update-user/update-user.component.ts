import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  email: string;
  name: string;
  id: number;
}

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  constructor(private accSvc: AccountService, private router: Router) {}
  nameFormControl = new FormControl('');
  emailFormControl = new FormControl('');
  passwordFormControl = new FormControl('');
  errMessage: string | undefined;
  initialName: string = '';
  initialEmail: string = '';

  ngOnInit(): void {
    this.GetUser();
  }

  async GetUser() {
    let userData = (await this.accSvc.GetUser()) as User | false;

    if (userData === false) {
      // Handle false scenario
      console.log('Failure');
    } else {
      this.initialName = userData.name;
      this.initialEmail = userData.email;
      this.nameFormControl.setValue(userData.name);
      this.emailFormControl.setValue(userData.email);
    }
  }

  async UpdateUser() {
    let email = this.emailFormControl.value;
    let name = this.nameFormControl.value;
    let password = this.passwordFormControl.value;

    let didUpdate = await this.accSvc.UpdateUser(email, name, password);

    if (didUpdate) {
      this.errMessage = 'Success';
      this.router.navigateByUrl('/login');
    } else {
      this.errMessage = 'Unsuccess';
    }
  }
}
