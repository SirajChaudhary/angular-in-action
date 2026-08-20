# Lesson 20 — Angular 21 Mini Project

# Project Overview

In this lesson, we will build a small Angular Customer Management Application that brings together the important concepts covered in the previous lessons.

The application will demonstrate:

- Components
- Routing
- Forms
- Signals
- HTTP
- Services
- Authentication
- Login and logout
- Role-based authorization
- Route guards
- HTTP interceptors
- Testing
- Bootstrap
- JSON Server

The goal is to build a complete, runnable Angular mini project rather than separate isolated examples.

# Application Flow

The application will have the following basic flow:

```text
Login
  ↓
Authentication
  ↓
Role-based Authorization
  ↓
Dashboard
  ↓
Customers
  ↓
Customer Registration
```

A user must log in before accessing protected pages.

```text
User
 ↓
Login
 ↓
Auth Service
 ↓
Authentication Token + Role
 ↓
Auth Guard
 ↓
Protected Route
```

# Application Roles

We will use two roles:

| Role | Access |
|---|---|
| ADMIN | Dashboard, Customers, Registration |
| USER | Dashboard, Customers |

Only an `ADMIN` can access the Registration page.

# Application Pages

| Page | Purpose | Access |
|---|---|---|
| Login | Authenticate the user | Public |
| Dashboard | Display application summary | ADMIN, USER |
| Customers | Display customer information | ADMIN, USER |
| Registration | Register a new customer | ADMIN |
| Unauthorized | Display authorization error | Public |

# Step 1 — Create the Angular Application

Create the project:

```bash
ng new customer-management
```

Select the default Angular options.

Move into the project:

```bash
cd customer-management
```

Run the application:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

# Step 2 — Install Bootstrap

Install Bootstrap:

```bash
npm install bootstrap
```

Open:

```text
angular.json
```

Add Bootstrap:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
```

Restart the application:

```bash
ng serve
```

# Step 3 — Create the Components

Create the main components:

```bash
ng g c login
ng g c dashboard
ng g c customers
ng g c registration
ng g c unauthorized
```

# Step 4 — Create the Services

Create the application services:

```bash
ng g s services/auth
ng g s services/customer
```

The services will handle:

```text
Auth Service
    ↓
Login
Logout
Authentication state
User role

Customer Service
    ↓
Customer HTTP operations
```

# Step 5 — Create the Authentication Guard

Create the guard:

```bash
ng g guard guards/auth
```

Select:

```text
CanActivate
```

The authentication guard will protect routes that require a logged-in user.

The basic idea is:

```text
Authenticated
    ↓
Allow navigation

Not authenticated
    ↓
Redirect to Login
```

# Step 6 — Create the Role Guard

Create another guard:

```bash
ng g guard guards/role
```

Select:

```text
CanActivate
```

The role guard will check whether the logged-in user has the required role.

The basic idea is:

```text
User authenticated
       ↓
Check role
       ↓
Required role?
   ↓          ↓
  Yes         No
   ↓          ↓
 Allow     Unauthorized
```

# Step 7 — Create the HTTP Interceptor

Create the authentication interceptor:

```bash
ng g interceptor interceptors/auth
```

The interceptor will add the authentication token to outgoing HTTP requests.

Basic flow:

```text
Angular Service
      ↓
HTTP Request
      ↓
Auth Interceptor
      ↓
Add Authorization Header
      ↓
Backend
```

# Step 8 — Create the Routes

Open:

```text
src/app/app.routes.ts
```

Configure the routes:

```typescript
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
```

The important part for role-based access is:

```typescript
data: {
  roles: ['ADMIN']
}
```

# Step 9 — Configure the Application

Open:

```text
src/app/app.config.ts
```

Configure the router and HTTP client:

```typescript
import {
  ApplicationConfig
} from '@angular/core';

import {
  provideRouter
} from '@angular/router';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import {
  routes
} from './app.routes';

import {
  authInterceptor
} from './interceptors/auth-interceptor';

export const appConfig:
  ApplicationConfig = {

  providers: [

    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    )

  ]

};
```

# Step 10 — Create the Dummy Backend

We will use JSON Server as a simple local backend.

Create `db.json` file at root:

```text
touch db.json
```

in the project root.

Use:

```json
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "admin123",
      "role": "ADMIN"
    },
    {
      "id": 2,
      "username": "user",
      "password": "user123",
      "role": "USER"
    }
  ],
  "customers": [
    {
      "id": 1,
      "name": "Siraj Chaudhary",
      "email": "siraj@example.com"
    },
    {
      "id": 2,
      "name": "Kausar Pathan",
      "email": "ahmed@example.com"
    },
    {
      "id": 3,
      "name": "John Smith",
      "email": "john@example.com"
    }
  ]
}
```

# Step 11 — Install JSON Server

Run:

```bash
npm install -g json-server
```

# Step 12 — Start JSON Server

From the project root:

```bash
json-server --watch db.json
```

The API will be available at:

```text
http://localhost:3000
```

The available endpoints include:

```text
http://localhost:3000/users
http://localhost:3000/customers
```

<img width="3840" height="718" alt="image" src="https://github.com/user-attachments/assets/25a399f3-307e-425b-9525-3cdea431267a" />
<br /><br />
<img width="3840" height="768" alt="image" src="https://github.com/user-attachments/assets/ee84dfc2-7d97-4527-bbe7-c0499915ae1b" />
<br /><br />

Keep JSON Server running.

Open another terminal for Angular.

# Step 13 — Create the Auth Service

Open:

```text
src/app/services/auth.ts
```

Use:

```typescript
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
```

This is a demonstration implementation.

The credentials and role are stored in `db.json` only to make the mini project runnable locally.

# Step 14 — Create the Login Component

Open:

```text
src/app/login/login.ts
```

Use:

```typescript
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
```

# Step 15 — Create the Login Template

Open:

```text
src/app/login/login.html
```

Use:

```html
<div class="container mt-5">

  <div class="row justify-content-center">

    <div class="col-md-6 col-lg-4">

      <div class="card">

        <div class="card-body">

          <h2 class="text-center mb-4">
            Login
          </h2>

          <form
            (ngSubmit)="login()">

            <div class="mb-3">

              <label
                class="form-label">

                Username

              </label>

              <input
                type="text"
                class="form-control"
                name="username"
                [(ngModel)]="username"
                required
              />

            </div>

            <div class="mb-3">

              <label
                class="form-label">

                Password

              </label>

              <input
                type="password"
                class="form-control"
                name="password"
                [(ngModel)]="password"
                required
              />

            </div>

            @if (errorMessage) {

              <div class="alert alert-danger">

                {{ errorMessage }}

              </div>

            }

            <button
              type="submit"
              class="btn btn-primary w-100">

              Login

            </button>

          </form>

        </div>

      </div>

    </div>

  </div>

</div>
```

# Step 16 — Create the Authentication Guard

Open:

```text
src/app/guards/auth-guard.ts
```

Use:

```typescript
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

export const authGuard:
  CanActivateFn = () => {

  const auth =
    inject(Auth);

  const router =
    inject(Router);

  if (auth.isAuthenticated()) {

    return true;

  }

  return router.createUrlTree([
    '/login'
  ]);

};
```

The guard checks whether the user has authenticated.

# Step 17 — Create the Role Guard

Open:

```text
src/app/guards/role-guard.ts
```

Use:

```typescript
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
```

The guard reads the required roles from the route:

```typescript
data: {
  roles: ['ADMIN']
}
```

and compares them with the logged-in user's role.

# Step 18 — Create the Unauthorized Component

Open:

```text
src/app/unauthorized/unauthorized.html
```

Use:

```html
<div class="container mt-5">

  <div class="alert alert-danger">

    <h2>
      Unauthorized
    </h2>

    <p>
      You do not have permission
      to access this page.
    </p>

  </div>

</div>
```

# Step 19 — Create the Authentication Interceptor

Open:

```text
src/app/interceptors/auth-interceptor.ts
```

Use:

```typescript
import {
  HttpInterceptorFn
} from '@angular/common/http';

export const authInterceptor:
  HttpInterceptorFn =
  (req, next) => {

    const token =
      localStorage.getItem('token');

    if (!token) {

      return next(req);

    }

    const authRequest =
      req.clone({
        setHeaders: {
          Authorization:
            `Bearer ${token}`
        }
      });

    return next(authRequest);

  };
```

The interceptor adds:

```text
Authorization: Bearer <token>
```

to outgoing HTTP requests.

# Step 20 — Create the Dashboard

Open:

```text
src/app/dashboard/dashboard.ts
```

Use a signal:

```typescript
import {
  Component,
  inject,
  signal
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

  customerCount =
    signal(3);

  username =
    localStorage.getItem('username');

  role =
    this.auth.getRole();

  logout(): void {

    this.auth.logout();

    this.router.navigate([
      '/login'
    ]);

  }

}
```

Open:

```text
src/app/dashboard/dashboard.html
```

Use:

```html
<div class="container mt-4">

  <div class="d-flex justify-content-between">

    <div>

      <h1>
        Dashboard
      </h1>

      <p>
        Welcome, {{ username }}
      </p>

      <p>
        Role: {{ role }}
      </p>

    </div>

    <button
      class="btn btn-danger"
      (click)="logout()">

      Logout

    </button>

  </div>

  <div class="card mt-4">

    <div class="card-body">

      <h5>
        Total Customers
      </h5>

      <h2>
        {{ customerCount() }}
      </h2>

    </div>

  </div>

</div>
```

This demonstrates both authentication state and logout.

# Step 21 — Create the Customer Service

Open:

```text
src/app/services/customer.ts
```

Use:

```typescript
import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

export interface CustomerModel {

  id: number;

  name: string;

  email: string;

}

@Injectable({
  providedIn: 'root'
})
export class Customer {

  private http =
    inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/customers';

  getCustomers():
    Observable<CustomerModel[]> {

    return this.http.get<
      CustomerModel[]
    >(this.apiUrl);

  }

  createCustomer(
    customer: Omit<CustomerModel, 'id'>
  ): Observable<CustomerModel> {

    return this.http.post<CustomerModel>(
      this.apiUrl,
      customer
    );

  }

}
```

The service now supports:

```text
GET /customers
POST /customers
```

# Step 22 — Create the Customers Component

Open:

```text
src/app/customers/customers.ts
```

Use:

```typescript
import {
  Component,
  inject
} from '@angular/core';

import {
  Customer,
  CustomerModel
} from '../services/customer';

@Component({
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers {

  private customerService =
    inject(Customer);

  customers:
    CustomerModel[] = [];

  loadCustomers(): void {

    this.customerService
      .getCustomers()
      .subscribe({
        next: customers => {

          this.customers =
            customers;

        },

        error: error => {

          console.error(
            'Failed to load customers:',
            error
          );

        }
      });

  }

}
```

# Step 23 — Display Customers With Bootstrap

Open:

```text
src/app/customers/customers.html
```

Use:

```html
<div class="container mt-4">

  <div class="d-flex justify-content-between">

    <h1>
      Customers
    </h1>

    <button
      class="btn btn-primary"
      (click)="loadCustomers()">

      Load Customers

    </button>

  </div>

  <div class="row mt-4">

    @for (
      customer of customers;
      track customer.id
    ) {

      <div class="col-md-4 mb-3">

        <div class="card">

          <div class="card-body">

            <h5 class="card-title">
              {{ customer.name }}
            </h5>

            <p class="card-text">
              {{ customer.email }}
            </p>

          </div>

        </div>

      </div>

    }

  </div>

</div>
```

# Step 24 — Create the Registration Component

The Registration page is restricted to the `ADMIN` role.

Open:

```text
src/app/registration/registration.ts
```

Use:

```typescript
import {
  Component,
  inject
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Customer,
  CustomerModel
} from '../services/customer';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {

  private customerService =
    inject(Customer);

  name = '';

  email = '';

  message = '';

  register(): void {

    const customer:
      Omit<CustomerModel, 'id'> = {

      name: this.name,

      email: this.email

    };

    this.customerService
      .createCustomer(customer)
      .subscribe({
        next: customer => {

          console.log(
            'Customer registered:',
            customer
          );

          this.message =
            'Customer registered successfully.';

          this.name = '';

          this.email = '';

        },

        error: error => {

          console.error(
            'Registration failed:',
            error
          );

          this.message =
            'Registration failed.';

        }
      });

  }

}
```

# Step 25 — Create the Registration Template

Open:

```text
src/app/registration/registration.html
```

Use:

```html
<div class="container mt-4">

  <div class="row justify-content-center">

    <div class="col-md-6">

      <div class="card">

        <div class="card-body">

          <h2>
            Customer Registration
          </h2>

          <form
            (ngSubmit)="register()">

            <div class="mb-3">

              <label class="form-label">
                Name
              </label>

              <input
                class="form-control"
                type="text"
                name="name"
                [(ngModel)]="name"
                required
              />

            </div>

            <div class="mb-3">

              <label class="form-label">
                Email
              </label>

              <input
                class="form-control"
                type="email"
                name="email"
                [(ngModel)]="email"
                required
              />

            </div>

            <button
              type="submit"
              class="btn btn-primary">

              Register

            </button>

          </form>

          @if (message) {

            <div class="alert alert-info mt-3">

              {{ message }}

            </div>

          }

        </div>

      </div>

    </div>

  </div>

</div>
```

Registration now performs:

```text
Registration Form
        ↓
Customer Service
        ↓
POST /customers
        ↓
JSON Server
        ↓
db.json
```

# Step 26 — Add Navigation

Open:

```text
src/app/app.html
```

Use:

```html
<nav class="navbar navbar-expand-lg bg-body-tertiary">

  <div class="container">

    <a
      class="navbar-brand"
      routerLink="/dashboard">

      Customer Management

    </a>

    <div>

      <a
        class="btn btn-link"
        routerLink="/dashboard">

        Dashboard

      </a>

      <a
        class="btn btn-link"
        routerLink="/customers">

        Customers

      </a>

      <a
        class="btn btn-link"
        routerLink="/registration">

        Registration

      </a>

    </div>

  </div>

</nav>

<router-outlet></router-outlet>
```

Import the required router directives in the root component (app.ts):

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('customer-management');
}
```

# Step 27 — Run the Application

Keep JSON Server running:

```bash
json-server --watch db.json
```

Open another terminal and start Angular:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

# Step 28 — Test Login and Roles

Use the following test accounts:

| Username | Password | Role |
|---|---|---|
| admin | admin123 | ADMIN |
| user | user123 | USER |

<img width="3840" height="1446" alt="image" src="https://github.com/user-attachments/assets/6568c270-2d07-48e4-8d2e-6fc1041d94a3" />
<br /><br />

### Test ADMIN

Login with:

```text
Username: admin
Password: admin123
```

ADMIN can access:

```text
/dashboard
/customers
/registration
```

<img width="3840" height="1378" alt="image" src="https://github.com/user-attachments/assets/f67e1f70-220c-4001-8a38-1f3f505a5d74" />
<br /><br />
<img width="3840" height="1216" alt="image" src="https://github.com/user-attachments/assets/2e7ce821-1030-4532-b0fc-74b382780765" />
<br /><br />
<img width="3840" height="1280" alt="image" src="https://github.com/user-attachments/assets/184f1e96-d0ac-4cf2-ad33-4003ca1f2262" />
<br /><br />
<img width="3840" height="1334" alt="image" src="https://github.com/user-attachments/assets/df316577-0116-4965-8864-998da2814cf3" />
<br /><br />

### Test USER

Logout and login with:

```text
Username: user
Password: user123
```

USER can access:

```text
/dashboard
/customers
```

USER cannot access:

```text
/registration
```

The user should be redirected to:

```text
/unauthorized
```

<img width="3840" height="1382" alt="image" src="https://github.com/user-attachments/assets/617e455d-027c-446a-ae4a-bb9b18e8626a" />
<br /><br />
<img width="3840" height="1302" alt="image" src="https://github.com/user-attachments/assets/e630f6f1-28e7-467b-98f7-a8c83fc7d25a" />
<br /><br />
<img width="3840" height="1280" alt="image" src="https://github.com/user-attachments/assets/184f1e96-d0ac-4cf2-ad33-4003ca1f2262" />
<br /><br />
<img width="3840" height="1224" alt="image" src="https://github.com/user-attachments/assets/88d22e33-be51-4fac-8757-fc4746e24925" />

# Step 29 — Test Logout

After logging in, click:

```text
Logout
```

The application will:

```text
Remove token
      ↓
Remove role
      ↓
Remove username
      ↓
Clear authentication state
      ↓
Navigate to /login
```

After logout, try accessing:

```text
/dashboard
```

The authentication guard should redirect to:

```text
/login
```

# Step 30 — Test Customer Registration

Login as:

```text
admin
```

Navigate to:

```text
/registration
```

Enter:

```text
Name: New Customer
Email: newcustomer@example.com
```

Click:

```text
Register
```

The request flow is:

```text
Registration Component
        ↓
Customer Service
        ↓
HttpClient
        ↓
Auth Interceptor
        ↓
POST /customers
        ↓
JSON Server
        ↓
db.json
```

The new customer should be added to `db.json`.

# Step 31 — Test Customer Loading

Navigate to:

```text
/customers
```

Click:

```text
Load Customers
```

The application performs:

```text
Customers Component
        ↓
Customer Service
        ↓
HttpClient
        ↓
Auth Interceptor
        ↓
GET /customers
        ↓
JSON Server
        ↓
Customer List
```

# Step 32 — Run Tests

Run the Angular test suite:

```bash
ng test
```

The same command runs the project's configured tests, including component, service, guard, interceptor, and other `.spec.ts` tests.
<br /><br />
<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/4c5aba0d-833a-40db-9ae7-95a35784e890" />

# Authentication vs Authorization

This project demonstrates the difference between authentication and authorization.

Authentication answers:

```text
Who are you?
```

Example:

```text
admin / admin123
```

Authorization answers:

```text
What are you allowed to access?
```

Example:

```text
ADMIN
   ↓
Can access Registration

USER
   ↓
Cannot access Registration
```

# Important Security Note

This project is a learning/demo application.

The authentication is intentionally simplified.

The following are stored locally or in `db.json`:

- Username
- Password
- Role
- Demo token

This is **not suitable for production authentication**.

A production application should use:

- Backend authentication
- Password hashing
- HTTPS
- Proper JWT or session handling
- Secure token storage
- Server-side authorization
- Role/permission validation on the backend

Angular route guards and interceptors improve client-side application behavior, but they **cannot replace backend authorization**.

# What We Have Integrated

At this point the project brings together the major concepts from the previous lessons:

| Concept | Used For |
|---|---|
| Components | Application UI |
| Routing | Application navigation |
| Forms | Login and registration |
| Signals | Application state |
| HTTP | Backend communication |
| Services | Reusable application logic |
| Authentication | Login state |
| Logout | End user session |
| Authorization | Role-based access |
| Route Guard | Route protection |
| HTTP Interceptor | Authentication header |
| Bootstrap | Responsive UI |
| JSON Server | Local dummy backend |
| Testing | Application verification |

# Overall Architecture

The simplified application flow is:

```text
                    Angular Application
                           |
          +----------------+----------------+
          |                |                |
      Components        Services         Routing
          |                |                |
          |          +-----+-----+          |
          |          |           |          |
       Bootstrap    Auth      Customer     Guards
          |          |           |          |
          |          |           |          |
          +----------+-----------+----------+
                           |
                       HttpClient
                           |
                     Interceptor
                           |
                      JSON Server
                           |
                        db.json
```

Authentication and authorization flow:

```text
Login
  ↓
Auth Service
  ↓
Validate User
  ↓
Store Demo Token + Role
  ↓
Auth Guard
  ↓
Role Guard
  ↓
Protected Route
```

# Key Takeaways

- A real Angular application combines multiple Angular concepts.
- Components provide the UI.
- Services contain reusable application logic.
- Routing connects application pages.
- Forms collect user input.
- Authentication identifies the user.
- Logout clears the authentication state.
- Authorization determines what the user can access.
- Route guards protect application routes.
- Role guards provide client-side role-based navigation control.
- Interceptors process outgoing HTTP requests.
- Signals can manage reactive application state.
- Bootstrap provides responsive UI styling.
- JSON Server provides a simple local backend for the demo.
- HTTP services communicate with the backend.
- Registration performs a real POST request to the local API.
- Customers are loaded using a real GET request.
- Tests verify application behavior.
- The concepts learned throughout the lessons work together rather than independently.
