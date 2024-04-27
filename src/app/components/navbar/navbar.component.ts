import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private actSvc: AccountService, private router: Router) {}
  isLoggedIn: boolean | undefined;

  ngOnInit(): void {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }
  LogOut() {
    localStorage.removeItem('token');
    this.actSvc.LogOut();
    this.actSvc.UserLoggedIn.emit(false);
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
