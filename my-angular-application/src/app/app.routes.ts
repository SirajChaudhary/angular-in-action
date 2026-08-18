import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Customer } from './customer/customer';
import { About } from './about/about';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'customers',
    component: Customer
  },
  {
    path: 'about',
    component: About
  }
];