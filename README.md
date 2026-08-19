# Lesson 18 — Angular Testing

# What Is Testing

Testing verifies that an Angular application behaves as expected.

Testing helps us verify:

- Components
- Services
- User interactions
- Business logic
- HTTP requests
- HTTP responses
- Error handling

The goal is to detect problems before the application reaches production.

# Types of Angular Testing

| Type | Purpose |
|---|---|
| Unit Testing | Tests a small piece of application logic |
| Component Testing | Tests a component and its template |
| Service Testing | Tests service logic |
| HTTP Testing | Tests HTTP requests without calling a real backend |
| End-to-End Testing | Tests the complete application flow |

For this lesson, we will focus on:

- Unit testing
- Component testing
- Service testing
- HTTP testing
- TestBed
- Vitest

# Angular Testing and Vitest

Modern Angular projects use Vitest as the default testing framework.

Angular CLI creates test files with the `.spec.ts` extension.

For example:

```text
customer.ts
customer.spec.ts
```

The application code is in:

```text
customer.ts
```

The corresponding tests are in:

```text
customer.spec.ts
```

# What Is TestBed

`TestBed` is Angular's testing utility used to configure and create an Angular testing environment.

It can provide:

- Components
- Services
- Dependencies
- Providers
- HTTP testing utilities

A simple example:

```typescript
TestBed.configureTestingModule({
  providers: [
    CustomerService
  ]
});
```

# Basic Test Structure

A typical Angular test contains:

```typescript
describe('Customer', () => {

  it('should create', () => {

    // test

  });

});
```

`describe()` groups related tests.

`it()` defines an individual test.

# Practical Example — Component Testing

We will create a simple Customer component and test whether it can be created successfully.

### Step 1 — Create the Angular Project

Create the project:

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

Angular CLI creates:

```text
src/app/customer/
├── customer.ts
├── customer.html
├── customer.css
└── customer.spec.ts
```

### Step 2 — Create the Customer Component

Open:

```text
src/app/customer/customer.ts
```

Use:

```typescript
import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  customerName = 'Siraj';

}
```

### Step 3 — Create the Component Template

Open:

```text
src/app/customer/customer.html
```

Use:

```html
<h1>Customer</h1>

<p>
  Customer Name:
  {{ customerName }}
</p>
```

### Step 4 — Write the Component Test

Open:

```text
src/app/customer/customer.spec.ts
```

Use:

```typescript
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  Customer
} from './customer';

describe('Customer', () => {

  let component: Customer;

  let fixture:
    ComponentFixture<Customer>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [Customer]
    }).compileComponents();

    fixture =
      TestBed.createComponent(Customer);

    component =
      fixture.componentInstance;

    await fixture.whenStable();

  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();

  });

});
```

The test verifies that Angular can create the component successfully.

### Step 5 — Test Component Data

Add another test:

```typescript
it('should have the correct customer name', () => {

  expect(component.customerName).toBe('Siraj');
});
```

### Step 6 — Test Rendered Content

Add:

```typescript
it('should display the customer name', () => {

  const element = fixture.nativeElement as HTMLElement;
  
  expect(element.textContent).toContain('Siraj');
  
});
```

# Running Tests

### Step 7 — Run Angular Tests

Run:

```bash
ng test
```

To run without watch mode:

```bash
ng test --watch=false
```

<img width="3026" height="686" alt="image" src="https://github.com/user-attachments/assets/8a2d7551-5c67-4ec5-8d40-a949a454588e" />

# Practical Example — Service Testing

Services commonly contain reusable application logic and API operations.

### Step 1 — Create the Customer Service

Create:

```bash
ng g s services/customer
```

Angular creates:

```text
src/app/services/
├── customer.ts
└── customer.spec.ts
```

### Step 2 — Implement the Service

Open:

```text
src/app/services/customer.ts
```

Use:

```typescript
import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Customer {

  getCustomerName(): string {

    return 'Siraj';

  }

}
```

### Step 3 — Write the Service Test

Open:

```text
src/app/services/customer.spec.ts
```

Use:

```typescript
import {
  TestBed
} from '@angular/core/testing';

import {
  Customer
} from './customer';

describe('Customer', () => {

  let service: Customer;

  beforeEach(() => {

    TestBed.configureTestingModule({});

    service =
      TestBed.inject(Customer);

  });

  it('should be created', () => {

    expect(service)
      .toBeTruthy();

  });

  it('should return the customer name', () => {

    expect(
      service.getCustomerName()
    ).toBe('Siraj');

  });

});
```

### Step 4 — Run Tests

Run:

```bash
ng test
```

To run without watch mode:

```bash
ng test --watch=false
```

<img width="3022" height="728" alt="image" src="https://github.com/user-attachments/assets/f8c5ccfc-7dfb-4e1d-92a0-7eaa2725d7f5" />

# Practical Example — HTTP Testing

HTTP testing allows us to test HTTP services without calling a real backend.

Instead of calling:

```text
http://localhost:3000/customers
```

we can simulate the HTTP response inside the test.

# HttpTestingController

Angular provides `HttpTestingController` for HTTP testing.

It allows us to:

- Detect outgoing HTTP requests
- Verify the request URL
- Verify the HTTP method
- Provide mock responses
- Simulate HTTP errors

# Practical HTTP Service Example

### Step 1 — Create the HTTP Service

Create:

```bash
ng g s services/customer-api
```

Open:

```text
src/app/services/customer-api.ts
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
export class CustomerApi {

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

}
```

### Step 2 — Configure HTTP Testing

For a modern standalone Angular application, use the provider-based approach.

Open:

```text
src/app/services/customer-api.spec.ts
```

Use:

```typescript
import {
  TestBed
} from '@angular/core/testing';

import {
  provideHttpClient
} from '@angular/common/http';

import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import {
  CustomerApi,
  CustomerModel
} from './customer-api';

describe('CustomerApi', () => {

  let service: CustomerApi;

  let httpMock:
    HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({

      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]

    });

    service =
      TestBed.inject(CustomerApi);

    httpMock =
      TestBed.inject(
        HttpTestingController
      );

  });

  afterEach(() => {

    httpMock.verify();

  });

});
```

### Step 3 — Test the HTTP Request

Add:

```typescript
it('should get customers', () => {

  const customers: CustomerModel[] = [

    {
      id: 1,
      name: 'Siraj',
      email: 'siraj@example.com'
    },

    {
      id: 2,
      name: 'Ahmed',
      email: 'ahmed@example.com'
    }

  ];

  service
    .getCustomers()
    .subscribe(result => {

      expect(result)
        .toEqual(customers);

    });

  const request =
    httpMock.expectOne(
      'http://localhost:3000/customers'
    );

  expect(request.request.method)
    .toBe('GET');

  request.flush(customers);

});
```

The test does not call JSON Server.

Instead:

```text
Service
   ↓
HttpClient
   ↓
HttpTestingController
   ↓
Mock Response
   ↓
Service
```

### Step 4 — Test HTTP Errors

We can also simulate an HTTP error.

Add:

```typescript
it('should handle HTTP error', () => {

  service
    .getCustomers()
    .subscribe({
      next: () => {

        throw new Error(
          'Expected request to fail'
        );

      },

      error: error => {

        expect(error.status)
          .toBe(500);

      }
    });

  const request =
    httpMock.expectOne(
      'http://localhost:3000/customers'
    );

  request.flush(
    'Server Error',
    {
      status: 500,
      statusText: 'Internal Server Error'
    }
  );

});
```

This allows us to test error behavior without running a real backend.

# Test Expectations

Tests use expectations to verify results.

Example:

```typescript
expect(result)
  .toEqual(expected);
```

Common expectations include:

| Expectation | Purpose |
|---|---|
| `toBe()` | Compares primitive values |
| `toEqual()` | Compares objects and arrays |
| `toBeTruthy()` | Checks truthy value |
| `toBeFalsy()` | Checks falsy value |
| `toContain()` | Checks whether a value exists |
| `toHaveBeenCalled()` | Checks whether a function was called |

# beforeEach

`beforeEach()` runs before every test in the test suite.

It is commonly used to:

- Configure `TestBed`
- Create components
- Inject services
- Initialize test data

# afterEach

`afterEach()` runs after every test.

It is useful for:

- Cleanup
- Verifying HTTP requests
- Resetting test state

# describe and it

A typical test structure is:

```typescript
describe('Customer', () => {

  it('should create', () => {

    expect(true)
      .toBe(true);

  });

});
```

`describe()` groups related tests.

`it()` defines one test case.

# What Should We Test

| Application Part | Example Tests |
|---|---|
| Component | Creation, template, user interaction |
| Service | Business logic, returned values |
| HTTP Service | URL, method, response, errors |
| Guard | Authenticated and unauthenticated navigation |
| Interceptor | Headers, requests, responses |
| Pipe | Input and transformed output |

# What Should We Avoid

Tests should not depend unnecessarily on:

- Real backend servers
- External APIs
- Database state
- Network availability
- Specific execution order
- Other tests

For example, HTTP tests should use:

```text
HttpTestingController
```

instead of requiring a real backend.

# Running Tests

Run all tests:

```bash
ng test
```

Run tests without watch mode:

```bash
ng test --watch=false
```

# Vitest

Vitest is the test runner used by modern Angular projects.

The important distinction is:

```text
Vitest
   ↓
Runs Tests

Angular Testing Utilities
   ↓
Provides Angular-specific testing support
```

Angular testing utilities include:

- `TestBed`
- `ComponentFixture`
- `HttpTestingController`

# ComponentFixture

`ComponentFixture` provides access to the component and its rendered DOM.

Example:

```typescript
let fixture:
  ComponentFixture<Customer>;

fixture =
  TestBed.createComponent(Customer);
```

The component instance can be accessed using:

```typescript
fixture.componentInstance
```

The rendered DOM can be accessed using:

```typescript
fixture.nativeElement
```

# Practical Testing Flow

For a component:

```text
TestBed
  ↓
Create Component
  ↓
ComponentFixture
  ↓
Component Instance
  ↓
Change / Execute
  ↓
Verify
```

For an HTTP service:

```text
TestBed
  ↓
Create Service
  ↓
HttpTestingController
  ↓
Execute HTTP Method
  ↓
Expect Request
  ↓
Flush Mock Response
  ↓
Verify Result
```

# Practical Project Structure

After implementing the examples:

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
│       │   ├── customer.ts
│       │   ├── customer.spec.ts
│       │   ├── customer-api.ts
│       │   └── customer-api.spec.ts
│       │
│       ├── app.ts
│       ├── app.html
│       ├── app.css
│       ├── app.config.ts
│       └── app.routes.ts
│
├── angular.json
├── package.json
├── package-lock.json
└── README.md
```

# Quick Revision

| Concept | Purpose |
|---|---|
| Test | Verifies expected behavior |
| Unit Test | Tests a small piece of logic |
| Component Test | Tests component behavior and template |
| Service Test | Tests service logic |
| HTTP Test | Tests HTTP behavior without a real backend |
| TestBed | Creates Angular testing environment |
| ComponentFixture | Provides component and DOM access |
| HttpTestingController | Controls and verifies HTTP requests |
| `describe()` | Groups tests |
| `it()` | Defines a test |
| `beforeEach()` | Runs setup before each test |
| `afterEach()` | Runs cleanup after each test |
| Vitest | Test runner |
| `expect()` | Verifies expected results |

# Key Takeaways

- Angular testing verifies application behavior before deployment.
- Components, services, and HTTP operations can all be tested.
- `TestBed` provides an Angular testing environment.
- `ComponentFixture` provides access to a component instance and rendered DOM.
- `describe()` groups related tests.
- `it()` defines an individual test.
- `beforeEach()` is commonly used for test setup.
- `afterEach()` is commonly used for cleanup.
- `HttpTestingController` allows HTTP requests to be tested without a real backend.
- HTTP responses can be simulated using `flush()`.
- Modern standalone Angular applications can use `provideHttpClientTesting()`.
- Vitest is the test runner used by modern Angular projects.
- Good tests should be isolated, predictable, and repeatable.
