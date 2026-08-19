import {
  inject
} from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  Auth
} from '../services/auth';

export const roleGuard =
  (requiredRole: string): CanActivateFn =>
  () => {

    const auth =
      inject(Auth);

    const router =
      inject(Router);

    if (
      auth.isAuthenticated() &&
      auth.getRole() === requiredRole
    ) {

      return true;
    }

    return router.createUrlTree([
      '/unauthorized'
    ]);
  };