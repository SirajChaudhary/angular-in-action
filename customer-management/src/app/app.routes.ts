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
    Customers
  } from './customers/customers';
  
  import {
    Registration
  } from './registration/registration';
  
  import {
    Unauthorized
  } from './unauthorized/unauthorized';
  
  import {
    authGuard
  } from './guards/auth-guard';
  
  import {
    roleGuard
  } from './guards/role-guard';
  
  export const routes: Routes = [
  
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
      path: 'customers',
      component: Customers,
      canActivate: [authGuard]
    },
  
    {
      path: 'registration',
      component: Registration,
      canActivate: [authGuard, roleGuard],
      data: {
        roles: ['ADMIN']
      }
    },
  
    {
      path: 'unauthorized',
      component: Unauthorized
    },
  
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    }
  
  ];