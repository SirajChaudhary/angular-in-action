import {
    Routes
  } from '@angular/router';
  
  import {
    Login
  } from './login/login';
  
  import {
    Dashboard
  } from './dashboard/dashboard';
  
  import {
    Unauthorized
  } from './unauthorized/unauthorized';
  
  import {
    authGuard
  } from './guards/auth-guard';

  import { roleGuard } from './guards/role-guard';
  
  export const routes: Routes = [
  
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
  
    {
      path: 'login',
      component: Login
    },
  
    {
      path: 'dashboard',
      component: Dashboard,
      canActivate: [authGuard]
    },
  
    {
      path: 'unauthorized',
      component: Unauthorized
    },

    {
      path: 'admin',
      component: Dashboard,
      canActivate: [
        authGuard,
        roleGuard('ADMIN')
      ]
    }
  
  ];