import {
  Injectable,
  signal,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

export interface User {

  id: number;

  username: string;

  password: string;

  role: 'ADMIN' | 'USER';

}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http =
    inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/users';

  private authenticated =
    signal(
      localStorage.getItem('token') !== null
    );

  private currentRole =
    signal<string | null>(
      localStorage.getItem('role')
    );

  login(
    username: string,
    password: string
  ): Observable<User[]> {

    return this.http.get<User[]>(
      `${this.apiUrl}?username=${username}&password=${password}`
    );

  }

  setAuthenticated(
    user: User
  ): void {

    localStorage.setItem(
      'token',
      `demo-token-${user.id}`
    );

    localStorage.setItem(
      'role',
      user.role
    );

    localStorage.setItem(
      'username',
      user.username
    );

    this.authenticated.set(true);

    this.currentRole.set(
      user.role
    );

  }

  isAuthenticated(): boolean {

    return this.authenticated();

  }

  getRole(): string | null {

    return this.currentRole();

  }

  logout(): void {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'role'
    );

    localStorage.removeItem(
      'username'
    );

    this.authenticated.set(false);

    this.currentRole.set(null);

  }

}