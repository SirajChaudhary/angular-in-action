import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  inject
} from '@angular/core';

import {
  Auth
} from '../services/auth';

export const roleGuard:
  CanActivateFn = (
    route
  ) => {

  const auth =
    inject(Auth);

  const router =
    inject(Router);

  const requiredRoles =
    route.data['roles'] as string[];

  const currentRole =
    auth.getRole();

  if (
    currentRole &&
    requiredRoles.includes(currentRole)
  ) {

    return true;

  }

  return router.createUrlTree([
    '/unauthorized'
  ]);

};