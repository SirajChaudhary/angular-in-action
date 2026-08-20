import {
  Component,
  inject
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';

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

    this.auth
      .login(
        this.username,
        this.password
      )
      .subscribe({
        next: users => {

          if (users.length === 0) {

            this.errorMessage =
              'Invalid username or password';

            return;

          }

          this.auth.setAuthenticated(
            users[0]
          );

          this.router.navigate([
            '/dashboard'
          ]);

        },

        error: error => {

          console.error(
            'Login failed:',
            error
          );

          this.errorMessage =
            'Login failed';

        }
      });

  }

}