# Lesson 16 — HTTP Interceptors

# What Is an HTTP Interceptor

An HTTP interceptor allows Angular to intercept HTTP requests and responses before they reach their final destination.

Interceptors are useful when the same HTTP behavior needs to be applied to multiple API requests.

Common use cases include:

- Adding HTTP headers
- Adding authentication tokens
- Logging requests and responses
- Handling HTTP errors centrally
- Adding common request information
- Retry logic
- Showing and hiding loading indicators

The request flow becomes:

```text
Angular Component
       ↓
CustomerService
       ↓
HTTP Interceptor
       ↓
HttpClient
       ↓
Backend API
       ↓
HTTP Response
       ↓
HTTP Interceptor
       ↓
Component
```

# Functional HTTP Interceptors

Modern Angular applications can use functional interceptors.

A functional interceptor is a function that receives the outgoing request and the next handler in the HTTP chain.

```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn =
  (req, next) => {

    console.log(
      'HTTP Request:',
      req.method,
      req.url
    );

    return next(req);
  };
```

The interceptor must call:

```typescript
next(req)
```

to continue the HTTP request.

# Why Use Interceptors

Without an interceptor, common logic may have to be repeated:

```typescript
this.http.get(url, {
  headers: {
    Authorization: 'Bearer token'
  }
});
```

With an interceptor, common logic can be centralized.

```text
HTTP Request
     ↓
Interceptor
     ↓
Add common header
     ↓
Backend
```

# Practical Example — HTTP Logging Interceptor

In this example, we will create a functional interceptor that logs:

- HTTP method
- Request URL
- Response status

We will use a simple Customer REST API.

### Step 1 — Create the Angular Project

Create the Angular project:

```bash
ng new my-angular-application
```

Move into the project:

```bash
cd my-angular-application
```

Create the Customer component:

```bash
ng g c customer
```

Create the Customer service:

```bash
ng g s services/customer
```

Create the interceptor:

```bash
ng g interceptor interceptors/logging
```

Angular CLI creates the interceptor file as:

```text
src/app/interceptors/logging-interceptor.ts
```

The important files will be:

```text
src/app/
├── customer/
│   ├── customer.ts
│   ├── customer.html
│   └── customer.css
│
├── services/
│   └── customer.service.ts
│
└── interceptors/
    └── logging-interceptor.ts
```

### Step 2 — Configure HttpClient

Open:

```text
src/app/app.config.ts
```

Configure `HttpClient` with the interceptor:

```typescript
import { ApplicationConfig } from '@angular/core';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import {
  loggingInterceptor
} from './interceptors/logging-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        loggingInterceptor
      ])
    )
  ]
};
```

`withInterceptors()` registers functional HTTP interceptors.

### Step 3 — Create the Logging Interceptor

Open:

```text
src/app/interceptors/logging-interceptor.ts
```

Use:

```typescript
import {
  HttpInterceptorFn,
  HttpResponse
} from '@angular/common/http';

import {
  tap
} from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn =
  (req, next) => {

    console.log(
      'HTTP Request:',
      req.method,
      req.url
    );

    return next(req).pipe(

      tap({
        next: response => {

          if (response instanceof HttpResponse) {

            console.log(
              'HTTP Response:',
              response.status,
              req.url
            );

          }

        }
      })

    );
  };
```

`req` represents the outgoing HTTP request.

`next` passes the request to the next interceptor or to the backend.

`response.status` contains the HTTP response status.

### Step 4 — Create the Customer Service

Open:

```text
src/app/services/customer.service.ts
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
export class CustomerService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/customers';

  getCustomers(): Observable<CustomerModel[]> {

    return this.http.get<CustomerModel[]>(
      this.apiUrl
    );
  }
}
```

The interface is named `CustomerModel` to avoid a name conflict with the `Customer` component class.

### Step 5 — Create Sample API Data

Create:

```text
db.json
```

at the project root:

```json
{
  "customers": [
    {
      "id": 1,
      "name": "Siraj Chaudhary",
      "email": "siraj@example.com"
    },
    {
      "id": 2,
      "name": "Ahmed Khan",
      "email": "ahmed@example.com"
    },
    {
      "id": 3,
      "name": "Priya Sharma",
      "email": "priya@example.com"
    }
  ]
}
```

Install JSON Server if it is not already installed:

```bash
npm install -g json-server
```

Start the API:

```bash
json-server --watch db.json
```

The API will be available at:

```text
http://localhost:3000/customers
```

### Step 6 — Use HttpClient from the Customer Component

Open:

```text
src/app/customer/customer.ts
```

Use:

```typescript
import {
  Component,
  inject
} from '@angular/core';

import {
  CustomerService,
  CustomerModel
} from '../services/customer.service';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  private customerService =
    inject(CustomerService);

  customers: CustomerModel[] = [];

  loadCustomers(): void {

    this.customerService
      .getCustomers()
      .subscribe({
        next: customers => {

          this.customers = customers;

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

### Step 7 — Display Customers

Open:

```text
src/app/customer/customer.html
```

Use:

```html
<h1>Customer List</h1>

<button (click)="loadCustomers()">
  Load Customers
</button>

@if (customers.length > 0) {

  <ul>

    @for (customer of customers; track customer.id) {

      <li>
        {{ customer.id }} -
        {{ customer.name }} -
        {{ customer.email }}
      </li>

    }

  </ul>
}
```

### Step 8 — Add the Customer Component to the Application

Open:

```text
src/app/app.ts
```

Use:

```typescript
import {
  Component
} from '@angular/core';

import {
  Customer
} from './customer/customer';

@Component({
  selector: 'app-root',
  imports: [Customer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
```

Open:

```text
src/app/app.html
```

Use:

```html
<app-customer></app-customer>
```

### Step 9 — Run the Application

Start JSON Server:

```bash
json-server --watch db.json
```

In another terminal:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

Click:

```text
Load Customers
```

The request will pass through the logging interceptor.

### Step 10 — Verify the Interceptor

Open the browser Developer Tools and select the Console.

You should see something similar to:

```text
HTTP Request: GET http://localhost:3000/customers

HTTP Response: 200 http://localhost:3000/customers
```

This confirms that the interceptor is processing the request and response.
<br /><br />
<img width="3840" height="1524" alt="image" src="https://github.com/user-attachments/assets/bb0f0731-66b2-43f3-83f1-1ca995893ae5" />

# Adding HTTP Headers

Interceptors can modify outgoing requests.

For example, we can add a custom header:

```typescript
import {
  HttpInterceptorFn
} from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn =
  (req, next) => {

    const modifiedRequest = req.clone({
      setHeaders: {
        'X-Application': 'Angular-App'
      }
    });

    return next(modifiedRequest);
  };
```

The original request should not be modified directly.

Angular's `HttpRequest` is immutable, so use:

```typescript
req.clone()
```

to create a modified request.

# Registering Multiple Interceptors

Multiple functional interceptors can be registered together.

```typescript
provideHttpClient(
  withInterceptors([
    loggingInterceptor,
    headerInterceptor
  ])
)
```

The request passes through the interceptor chain:

```text
Component
    ↓
loggingInterceptor
    ↓
headerInterceptor
    ↓
HttpClient
    ↓
Backend
```

# Centralized HTTP Error Handling

Interceptors can also provide centralized error handling.

This avoids repeating the same error-handling logic in every component.

### Step 1 — Create the Error Interceptor

Create:

```text
src/app/interceptors/error-interceptor.ts
```

Use:

```typescript
import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import {
  catchError,
  throwError
} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn =
  (req, next) => {

    return next(req).pipe(

      catchError((error: HttpErrorResponse) => {

        console.error(
          'HTTP Error:',
          error.status,
          error.message
        );

        return throwError(() => error);

      })

    );
  };
```

### Step 2 — Register the Error Interceptor

Open:

```text
src/app/app.config.ts
```

Register it:

```typescript
import {
  ApplicationConfig
} from '@angular/core';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import {
  loggingInterceptor
} from './interceptors/logging-interceptor';

import {
  errorInterceptor
} from './interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        loggingInterceptor,
        errorInterceptor
      ])
    )
  ]
};
```

### Step 3 — Test the Error Interceptor

Change the API URL temporarily to an invalid endpoint:

```typescript
private apiUrl =
  'http://localhost:3000/invalid-customers';
```

Click:

```text
Load Customers
```

The request will fail.

The interceptor will receive the error and log information such as:

```text
HTTP Error: 404
```

The error can still be handled by the component:

```typescript
this.customerService
  .getCustomers()
  .subscribe({
    next: customers => {
      this.customers = customers;
    },

    error: error => {
      console.error(
        'Component error:',
        error
      );
    }
  });
```

The interceptor provides centralized processing, while the component can still decide how the UI should respond.

# Adding Authentication Headers

A common real-world use of an interceptor is adding an authentication token.

For example:

```typescript
export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    const token =
      localStorage.getItem('token');

    if (!token) {
      return next(req);
    }

    const modifiedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(modifiedRequest);
  };
```

The request becomes:

```text
Authorization: Bearer <token>
```

This approach will be used more extensively in the Authentication & Authorization lesson.

# Interceptor Responsibilities

| Responsibility | Example |
|---|---|
| Logging | Log request method and URL |
| Headers | Add common HTTP headers |
| Authentication | Add JWT token |
| Error handling | Handle HTTP errors centrally |
| Retry | Retry failed requests |
| Loading state | Track active requests |
| Request modification | Change headers or URL |
| Response processing | Inspect or transform responses |

# Interceptor vs Service

| Service | Interceptor |
|---|---|
| Contains API-specific logic | Contains common HTTP behavior |
| Knows about business operations | Usually independent of a specific API |
| Calls `HttpClient` | Intercepts `HttpClient` requests |
| Example: `getCustomers()` | Example: add authorization header |
| Used by components | Applied automatically to configured requests |

A good architecture is:

```text
Component
    ↓
CustomerService
    ↓
HttpClient
    ↓
Interceptors
    ↓
Backend API
```

# Practical Project Structure

After implementing this lesson:

```text
my-angular-application/
├── src/
│   └── app/
│       ├── customer/
│       │   ├── customer.ts
│       │   ├── customer.html
│       │   ├── customer.css
│       │   └── customer.spec.ts
│       │
│       ├── services/
│       │   ├── customer.service.ts
│       │   └── customer.service.spec.ts
│       │
│       ├── interceptors/
│       │   ├── logging-interceptor.ts
│       │   └── error-interceptor.ts
│       │
│       ├── app.ts
│       ├── app.html
│       ├── app.css
│       ├── app.config.ts
│       └── app.routes.ts
│
├── db.json
├── angular.json
├── package.json
├── package-lock.json
└── README.md
```

# Quick Revision

| Concept | Purpose |
|---|---|
| HTTP Interceptor | Intercepts HTTP requests and responses |
| `HttpInterceptorFn` | Defines a functional interceptor |
| `HttpRequest` | Represents an outgoing HTTP request |
| `next()` | Passes the request to the next handler |
| `clone()` | Creates a modified HTTP request |
| `withInterceptors()` | Registers functional interceptors |
| `tap()` | Performs side effects such as logging |
| `catchError()` | Handles HTTP errors |
| Header interceptor | Adds common headers |
| Auth interceptor | Adds authentication tokens |
| Error interceptor | Centralizes HTTP error handling |

# Key Takeaways

- HTTP interceptors provide a centralized way to process HTTP requests and responses.
- Angular supports functional HTTP interceptors.
- `HttpInterceptorFn` is used to define a functional interceptor.
- `next(req)` continues the HTTP request chain.
- HTTP requests are immutable, so use `req.clone()` when modifying a request.
- Interceptors can add headers to outgoing requests.
- Interceptors can log requests and responses.
- Interceptors can provide centralized HTTP error handling.
- Authentication tokens can be added through an interceptor.
- Multiple interceptors can be registered together.
- API-specific operations should remain in services.
- Common HTTP behavior should be handled through interceptors.
- Interceptors are especially useful when the same HTTP behavior applies to many API requests.
