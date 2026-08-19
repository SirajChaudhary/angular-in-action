import {
  Component,
  inject
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  Auth
} from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private auth =
    inject(Auth);

  private router =
    inject(Router);

  username = '';

  password = '';

  errorMessage = '';

  login(): void {

    const success =
      this.auth.login(
        this.username,
        this.password
      );

    if (success) {

      this.router.navigate([
        '/dashboard'
      ]);

    } else {

      this.errorMessage =
        'Invalid username or password';

    }
  }
}