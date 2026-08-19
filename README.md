# Lesson 13 — HttpClient & REST APIs

# What is Angular HttpClient

Angular `HttpClient` provides a way for Angular applications to communicate with backend services using HTTP.

It is commonly used to:

- Fetch data from a backend API.
- Send data to a backend API.
- Update existing data.
- Delete data.
- Send query parameters.
- Send HTTP headers.
- Handle HTTP errors.
- Work with typed API responses.

Angular provides the `HttpClient` service through:

```typescript
import { HttpClient } from '@angular/common/http';
```

`HttpClient` methods return RxJS `Observable`s. The HTTP request is sent when the observable is subscribed to.

# HTTP Methods

Angular `HttpClient` supports the HTTP methods commonly used when communicating with REST APIs.

| HTTP Method | Purpose | Example |
|---|---|---|
| `GET` | Retrieve data | Get customers |
| `POST` | Create data | Create customer |
| `PUT` | Replace or update an existing resource | Update customer |
| `PATCH` | Partially update an existing resource | Update customer email |
| `DELETE` | Delete a resource | Delete customer |
| `HEAD` | Retrieve response headers without the response body | Check resource metadata |
| `OPTIONS` | Retrieve communication options supported by a resource | Check supported methods |

Angular `HttpClient` provides corresponding methods such as:

```typescript
http.get()
http.post()
http.put()
http.patch()
http.delete()
http.head()
http.options()
```

For REST API development, `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` are the methods most commonly used by application code.

# Setting Up HttpClient

Modern standalone Angular applications configure `HttpClient` using:

```typescript
provideHttpClient()
```

Angular recommends configuring `HttpClient` this way rather than using the older module-based approach.

# Practical Example — Customer REST API

For this lesson, we will build a Customer Management example.

The application will demonstrate:

```text
Customer Management
├── Get all customers
├── Get customer by ID
├── Create customer
├── Update customer
├── Partially update customer
└── Delete customer
```

The Customer component will provide a simple UI for performing the REST API operations directly from the browser.

Create/use **initial Angular project skeleton (from lesson-04)** and create the `customer` component and `customer` service.

```bash
ng new my-angular-application
ng g c customer
ng g s services/customer
```

Then implement HTTP communication step by step.

### Step 1: Configure HttpClient

Open:

```text
src/app/app.config.ts
```

Update it:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};
```

`provideHttpClient()` makes `HttpClient` available for dependency injection throughout the application.

### Step 2: Create the Customer Model

Create:

```text
src/app/models/customer.ts
```

Add:

```typescript
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
}
```

The interface describes the structure of customer data returned by the API.

### Step 3: Create the Customer Service

Open:

```text
src/app/services/customer.ts
```

Update it:

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/customers';

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${this.apiUrl}/${customer.id}`,
      customer
    );
  }

  patchCustomer(
    id: number,
    changes: Partial<Customer>
  ): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.apiUrl}/${id}`,
      changes
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  checkCustomer(id: number): Observable<void> {
    return this.http.head<void>(`${this.apiUrl}/${id}`);
  }

  getCustomerOptions(): Observable<any> {
    return this.http.options<any>(this.apiUrl);
  }
}
```

The service now contains examples for:

```text
GET
POST
PUT
PATCH
DELETE
HEAD
OPTIONS
```

Angular recommends isolating data-access logic in reusable injectable services rather than placing HTTP calls directly inside components.

### Step 4: Understand the GET Request

The service uses:

```typescript
return this.http.get<Customer[]>(this.apiUrl);
```

This sends a `GET` request to:

```text
http://localhost:3000/customers
```

The generic type:

```typescript
<Customer[]>
```

indicates that the expected response is an array of `Customer` objects.

Angular supports typed response values through generic type parameters. These types describe what the application expects; `HttpClient` does not runtime-validate that the server response actually matches the TypeScript type.

### Step 5: Create Sample API Data

For this lesson, we can use JSON Server as a simple local REST API.

Install JSON Server:

```bash
npm install -g json-server
```

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
      "email": "siraj@example.com",
      "phone": "9876543210",
      "city": "Hyderabad"
    },
    {
      "id": 2,
      "name": "Ahmed Khan",
      "email": "ahmed@example.com",
      "phone": "9876543211",
      "city": "Pune"
    },
    {
      "id": 3,
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "9876543212",
      "city": "Bengaluru"
    },
    {
      "id": 4,
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "phone": "9876543213",
      "city": "Mumbai"
    },
    {
      "id": 5,
      "name": "David Wilson",
      "email": "david@example.com",
      "phone": "9876543214",
      "city": "Chennai"
    }
  ]
}
```

Start the API:

```bash
json-server --watch db.json
```

The API will be available at:

```text
http://localhost:3000/customers
```

<img width="3840" height="1308" alt="image" src="https://github.com/user-attachments/assets/1bd5d50a-d1c6-4140-a5f2-ba6ed9c2cc2a" />

### Step 6: Open the Customer Component

Open:

```text
src/app/customer/customer.ts
```

Update it:

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer';
import { Customer as CustomerModel } from '../models/customer';

@Component({
  selector: 'app-customer',
  imports: [FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  private customerService = inject(CustomerService);

  customers: CustomerModel[] = [];

  selectedCustomer: CustomerModel | null = null;

  customerId = 1;

  newCustomer = {
    name: '',
    email: '',
    phone: '',
    city: ''
  };

  updateForm: CustomerModel = {
    id: 1,
    name: '',
    email: '',
    phone: '',
    city: ''
  };

  patchId = 1;
  patchEmail = '';

  deleteId = 1;

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: (error) => {
        console.error('Failed to load customers:', error);
      }
    });
  }

  loadCustomerById(): void {
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        this.selectedCustomer = customer;
      },
      error: (error) => {
        console.error('Failed to load customer:', error);
      }
    });
  }

  createCustomer(): void {
    this.customerService.createCustomer(this.newCustomer).subscribe({
      next: (customer) => {
        console.log('Created customer:', customer);
        this.newCustomer = {
          name: '',
          email: '',
          phone: '',
          city: ''
        };
        this.loadCustomers();
      },
      error: (error) => {
        console.error('Failed to create customer:', error);
      }
    });
  }

  updateCustomer(): void {
    this.customerService.updateCustomer(this.updateForm).subscribe({
      next: (customer) => {
        console.log('Updated customer:', customer);
        this.loadCustomers();
      },
      error: (error) => {
        console.error('Failed to update customer:', error);
      }
    });
  }

  patchCustomer(): void {
    this.customerService.patchCustomer(
      this.patchId,
      { email: this.patchEmail }
    ).subscribe({
      next: (customer) => {
        console.log('Patched customer:', customer);
        this.loadCustomers();
      },
      error: (error) => {
        console.error('Failed to patch customer:', error);
      }
    });
  }

  deleteCustomer(): void {
    this.customerService.deleteCustomer(this.deleteId).subscribe({
      next: () => {
        console.log('Customer deleted successfully.');
        this.loadCustomers();
      },
      error: (error) => {
        console.error('Failed to delete customer:', error);
      }
    });
  }

  checkCustomer(): void {
    this.customerService.checkCustomer(this.customerId).subscribe({
      next: () => {
        console.log('Customer resource exists.');
      },
      error: (error) => {
        console.error('HEAD request failed:', error);
      }
    });
  }

  getCustomerOptions(): void {
    this.customerService.getCustomerOptions().subscribe({
      next: (response) => {
        console.log('OPTIONS response:', response);
      },
      error: (error) => {
        console.error('OPTIONS request failed:', error);
      }
    });
  }
}
```

The component contains the UI state and calls the corresponding service method for each API operation. The HTTP implementation remains inside `CustomerService`.

### Step 7: Display Customers and Perform REST API Operations

Open:

```text
src/app/customer/customer.html
```

Replace the contents with:

```html
<h1>REST API call with HttpClient</h1>

<h2>Get Customer</h2>

<button (click)="loadCustomers()">
  Get All Customers
</button>

@if (customers.length > 0) {

  <h3>Customer List</h3>

  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>City</th>
      </tr>
    </thead>

    <tbody>
      @for (customer of customers; track customer.id) {
        <tr>
          <td>{{ customer.id }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.city }}</td>
        </tr>
      }
    </tbody>
  </table>

}

<h2>Get Customer by ID</h2>

<input
  type="number"
  [(ngModel)]="customerId">

<button (click)="loadCustomerById()">
  Get Customer
</button>

@if (selectedCustomer) {
  <p>ID: {{ selectedCustomer.id }}</p>
  <p>Name: {{ selectedCustomer.name }}</p>
  <p>Email: {{ selectedCustomer.email }}</p>
  <p>Phone: {{ selectedCustomer.phone }}</p>
  <p>City: {{ selectedCustomer.city }}</p>
}

<h2>Create Customer</h2>

<input
  type="text"
  placeholder="Name"
  [(ngModel)]="newCustomer.name">

<input
  type="email"
  placeholder="Email"
  [(ngModel)]="newCustomer.email">

<input
  type="text"
  placeholder="Phone"
  [(ngModel)]="newCustomer.phone">

<input
  type="text"
  placeholder="City"
  [(ngModel)]="newCustomer.city">

<button (click)="createCustomer()">
  Create Customer
</button>

<h2>Update Customer</h2>

<input
  type="number"
  placeholder="ID"
  [(ngModel)]="updateForm.id">

<input
  type="text"
  placeholder="Name"
  [(ngModel)]="updateForm.name">

<input
  type="email"
  placeholder="Email"
  [(ngModel)]="updateForm.email">

<input
  type="text"
  placeholder="Phone"
  [(ngModel)]="updateForm.phone">

<input
  type="text"
  placeholder="City"
  [(ngModel)]="updateForm.city">

<button (click)="updateCustomer()">
  Update Customer
</button>

<h2>Patch Customer</h2>

<input
  type="number"
  placeholder="Customer ID"
  [(ngModel)]="patchId">

<input
  type="email"
  placeholder="New Email"
  [(ngModel)]="patchEmail">

<button (click)="patchCustomer()">
  Update Email
</button>

<h2>Delete Customer</h2>

<input
  type="number"
  placeholder="Customer ID"
  [(ngModel)]="deleteId">

<button (click)="deleteCustomer()">
  Delete Customer
</button>

<h2>HEAD Request</h2>

<input
  type="number"
  placeholder="Customer ID"
  [(ngModel)]="customerId">

<button (click)="checkCustomer()">
  Check Customer
</button>

<h2>OPTIONS Request</h2>

<button (click)="getCustomerOptions()">
  Get API Options
</button>
```

This page demonstrates:

```text
GET       → Get all customers
GET       → Get customer by ID
POST      → Create customer
PUT       → Update customer
PATCH     → Partially update customer
DELETE    → Delete customer
HEAD      → Check customer resource
OPTIONS   → Get supported API options
```

### Step 8: Add the Customer Component to the Root Component

Open:

```text
src/app/app.ts
```

Update it:

```typescript
import { Component, signal } from '@angular/core';
import { Customer } from './customer/customer';

@Component({
  selector: 'app-root',
  imports: [Customer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-application');
}
```

### Step 9: Render the Customer Component

Open:

```text
src/app/app.html
```

Add:

```html
<app-customer></app-customer>
```

### Step 10: Run the Application

Start the API:

```bash
json-server --watch db.json
```

In another terminal, start Angular:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

The page now provides a basic UI for performing the REST API operations.
<br /><br />
<img width="3840" height="1840" alt="image" src="https://github.com/user-attachments/assets/e1681abc-894e-484e-abec-c449a618c40b" />

# REST API Operations

The customer service exposes the following REST API operations:

| Operation | HTTP Method | Endpoint | Purpose |
|---|---|---|---|
| Get all customers | `GET` | `/customers` | Retrieve all customers |
| Get customer | `GET` | `/customers/{id}` | Retrieve one customer |
| Create customer | `POST` | `/customers` | Create a new customer |
| Update customer | `PUT` | `/customers/{id}` | Replace an existing customer |
| Partially update customer | `PATCH` | `/customers/{id}` | Update selected fields |
| Delete customer | `DELETE` | `/customers/{id}` | Delete a customer |
| Check customer | `HEAD` | `/customers/{id}` | Retrieve headers without a response body |
| Get API options | `OPTIONS` | `/customers` | Retrieve supported communication options |

# Query Parameters

HTTP requests can include query parameters.

Angular provides `HttpParams` for this purpose.

Example:

```typescript
import { HttpParams } from '@angular/common/http';
```

Then:

```typescript
searchCustomers(name: string): Observable<Customer[]> {

  const params = new HttpParams()
    .set('name', name);

  return this.http.get<Customer[]>(
    this.apiUrl,
    { params }
  );
}
```

This can produce a request such as:

```text
GET /customers?name=Siraj
```

# HTTP Headers

HTTP headers can be supplied using `HttpHeaders`.

Example:

```typescript
import { HttpHeaders } from '@angular/common/http';
```

Then:

```typescript
const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

return this.http.get<Customer[]>(
  this.apiUrl,
  { headers }
);
```

In real applications, authentication headers are often handled centrally using an HTTP interceptor rather than manually adding them to every request.

# HTTP Error Handling

HTTP requests can fail because of:

- Network errors.
- Backend errors.
- Timeout errors.
- Invalid requests.
- Server errors.

Angular reports HTTP failures through `HttpErrorResponse`.

Example:

```typescript
this.customerService.getCustomers().subscribe({
  next: (customers) => {
    this.customers = customers;
  },
  error: (error) => {
    console.error('HTTP Status:', error.status);
    console.error('HTTP Error:', error);
  }
});
```

For reusable error handling, RxJS provides operators such as:

```text
catchError()
```

and:

```text
retry()
```

# Loading State

A UI should normally indicate when an HTTP request is in progress.

For example, in the component:

```typescript
isLoading = false;

loadCustomers(): void {

  this.isLoading = true;

  this.customerService.getCustomers().subscribe({
    next: (customers) => {
      this.customers = customers;
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Failed to load customers:', error);
      this.isLoading = false;
    }
  });
}
```

Then in the template:

```html
@if (isLoading) {
  <p>Loading customers...</p>
}
```

# Observables and HttpClient

Each `HttpClient` request returns an RxJS `Observable`.

For example:

```typescript
this.http.get<Customer[]>(this.apiUrl)
```

returns:

```text
Observable<Customer[]>
```

The request is sent when the observable is subscribed to:

```typescript
this.customerService.getCustomers().subscribe({
  next: (customers) => {
    console.log(customers);
  }
});
```

Angular's `HttpClient` observables are cold, meaning a request is not dispatched until subscription occurs. Each subscription can trigger a new backend request.

# Typed HTTP Responses

Angular supports generic types for HTTP responses.

Example:

```typescript
this.http.get<Customer[]>(this.apiUrl);
```

The expected response type is:

```text
Customer[]
```

For a single customer:

```typescript
this.http.get<Customer>(
  `${this.apiUrl}/${id}`
);
```

The expected response type is:

```text
Customer
```

This provides compile-time type information while working with API data.

Remember that the generic type does not validate the actual server response at runtime.

# HTTP Interceptors

Interceptors allow common HTTP behavior to be handled centrally.

They can be used for:

- Authentication.
- Logging.
- Adding headers.
- Retry logic.
- Caching.
- Error handling.

Angular currently recommends functional interceptors because they provide more predictable behavior, particularly in complex applications.

A later lesson can cover HTTP interceptors in greater detail.

# Practical Project Structure

After implementing this lesson:

```text
my-angular-application/
├── public/
│
├── src/
│   ├── app/
│   │   ├── customer/
│   │   │   ├── customer.ts
│   │   │   ├── customer.html
│   │   │   ├── customer.css
│   │   │   └── customer.spec.ts
│   │   │
│   │   ├── models/
│   │   │   └── customer.ts
│   │   │
│   │   ├── services/
│   │   │   ├── customer.service.ts
│   │   │   └── customer.service.spec.ts
│   │   │
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.css
│
├── db.json
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── .editorconfig
├── .gitignore
└── README.md
```

# Quick Revision

| Concept | Purpose | Example |
|---|---|---|
| `HttpClient` | Communicates with backend APIs | `HttpClient` |
| `provideHttpClient()` | Configures HttpClient | `provideHttpClient()` |
| `GET` | Retrieve data | `http.get()` |
| `POST` | Create data | `http.post()` |
| `PUT` | Update data | `http.put()` |
| `DELETE` | Delete data | `http.delete()` |
| `Observable` | Represents asynchronous HTTP result | `Observable<Customer[]>` |
| `HttpParams` | Sends query parameters | `new HttpParams()` |
| `HttpHeaders` | Sends HTTP headers | `new HttpHeaders()` |
| `HttpErrorResponse` | Represents HTTP errors | `HttpErrorResponse` |
| Generic type | Describes expected response | `get<Customer[]>()` |
| Service | Encapsulates API logic | `CustomerService` |
| Interceptor | Handles common HTTP behavior | `withInterceptors()` |

# Key Takeaways

- Angular applications commonly communicate with backend services using `HttpClient`.
- Modern standalone Angular applications configure HTTP using `provideHttpClient()`.
- `HttpClient` supports common HTTP methods such as `GET`, `POST`, `PUT`, and `DELETE`.
- HTTP methods return RxJS `Observable`s.
- HTTP requests are sent when the observable is subscribed to.
- API communication should generally be encapsulated inside reusable services.
- Generic types can describe expected API response structures.
- `HttpParams` can be used for query parameters.
- `HttpHeaders` can be used to send HTTP headers.
- `HttpErrorResponse` provides information about failed HTTP requests.
- Loading states can improve the user experience during API calls.
- RxJS operators such as `catchError` and `retry` can help handle HTTP failures.
- HTTP interceptors can centralize common concerns such as authentication and logging.
- Angular's `HttpClient` does not runtime-validate the response against the TypeScript generic type.