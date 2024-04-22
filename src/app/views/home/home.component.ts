import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private actSvc: AccountService) {}
  isLoggedIn: boolean | undefined;

  ngOnInit(): void {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      console.log('UserLoggedIn event received. Logged in?', loggedIn);
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        console.log('User is logged in!');
      } else console.log('User is not logged in!');
    });
  }

  // ngOnDestroy(): void {
  //   if (this.isLoggedIn) {
  //     this.actSvc.UserLoggedIn.unsubscribe();
  //   }
  // }
}
