import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './services/account.service';
export const AuthGuard: CanActivateFn = (route, state) => {
  let accSvc = inject(AccountService);
  let router = inject(Router);
  if (accSvc.isLoggedIn) {
    return true;
  } else {
    alert('You must be logged in to access this page!');
    // localStorage.removeItem('token');
    console.log('Yo');
    // router.navigate(['/login']);
    router.navigateByUrl('/login');
    return false;
  }
};
