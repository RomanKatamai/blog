import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): Observable<boolean> | Promise<boolean> | boolean => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(auth.isAuthenticated()) {
    return true;
  }

    auth.logout();

    router.navigate(['/admin', 'login'], {
      queryParams: {
        loginAgain: true
      }
    });

    return false;
};
