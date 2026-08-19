import {
  Component,
  inject
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  Auth
} from '../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private auth =
    inject(Auth);

  private router =
    inject(Router);

  logout(): void {

    this.auth.logout();

    this.router.navigate([
      '/login'
    ]);
  }

  getRole(): string | null {

    return this.auth.getRole();
  }
}