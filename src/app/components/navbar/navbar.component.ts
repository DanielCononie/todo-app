import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private actSvc: AccountService) {}
  isLoggedIn: boolean | undefined;

  ngOnInit(): void {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        // Perform any actions you want when the user is logged in
      } else console.log('User is not logged in!');
    });
  }
}