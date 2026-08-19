import {
  Injectable,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private authenticated =
    signal(false);

  private token =
    signal<string | null>(null);

  private role =
    signal<string | null>(null);

  login(
    username: string,
    password: string
  ): boolean {

    if (
      username === 'admin' &&
      password === 'admin123'
    ) {

      this.token.set(
        'demo-jwt-token'
      );

      this.role.set('ADMIN');

      this.authenticated.set(true);

      localStorage.setItem(
        'token',
        'demo-jwt-token'
      );

      localStorage.setItem(
        'role',
        'ADMIN'
      );

      return true;
    }

    return false;
  }

  logout(): void {

    this.authenticated.set(false);

    this.token.set(null);

    this.role.set(null);

    localStorage.removeItem('token');

    localStorage.removeItem('role');
  }

  isAuthenticated(): boolean {

    return this.authenticated();
  }

  getToken(): string | null {

    return this.token();
  }

  getRole(): string | null {

    return this.role();
  }
}