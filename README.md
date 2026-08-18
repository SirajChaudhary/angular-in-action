# Lesson 9 — Services & Dependency Injection

# What are Services

A service is a TypeScript class that contains reusable application logic or data.

Services are commonly used for:

- Sharing data between components.
- Calling APIs.
- Containing business logic.
- Managing application state.
- Encapsulating reusable functionality.

A component should primarily focus on the UI and user interaction.

A service can handle reusable logic outside the component.

# Why Use Services

Without a service, a component may contain too much logic:

```text
Component
├── UI logic
├── API calls
├── Business logic
├── Data management
└── Shared functionality
```

With services:

```text
Component
   │
   └── Service
        ├── Business logic
        ├── Data
        └── API operations
```

This makes the application easier to maintain and test.

# Dependency Injection

Dependency Injection, commonly called DI, is a design pattern where an object receives the dependencies it needs instead of creating them itself.

For example, instead of a component creating a service:

```typescript
const customerService = new CustomerService();
```

Angular can provide the service and inject it into the component.

Conceptually:

```text
Angular
   │
   └── CustomerService
           │
           ↓
       Customer
       Component
```

The component simply declares that it needs `CustomerService`.

# @Injectable

Angular services commonly use the `@Injectable` decorator.

Example:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
}
```

`@Injectable` tells Angular that the class can participate in Angular's dependency-injection system.

# providedIn: 'root'

The following configuration:

```typescript
@Injectable({
  providedIn: 'root'
})
```

registers the service with the application's root injector.

This is the common approach for application-wide services.

It also allows Angular to include the service in the application only when it is needed.

# How to Implement a Service in the Current Application

Create/use **initial Angular project skeleton** and create the `CustomerService` service.

```bash
ng new my-angular-application
ng g service services/customer
```

The CLI creates:

```text
src/app/services/
├── customer.ts
└── customer.spec.ts
```

Then implement the service and dependency injection step by step.

### Step 1: Open the Customer Service

Open:

```text
src/app/services/customer.ts
```

Update it:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  getCustomerName(): string {
    return 'Siraj';
  }

  getCustomerEmail(): string {
    return 'siraj@example.com';
  }
}
```

The service now contains reusable customer-related logic.

### Step 2: Create the Customer Component

Create the component:

```bash
ng g c customer
```

Angular creates:

```text
src/app/customer/
├── customer.ts
├── customer.html
├── customer.css
└── customer.spec.ts
```

### Step 3: Inject the Service into the Component

Open:

```text
src/app/customer/customer.ts
```

Update it:

```typescript
import { Component } from '@angular/core';
import { CustomerService } from '../services/customer';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  constructor(private customerService: CustomerService) {
  }

  getCustomerName(): string {
    return this.customerService.getCustomerName();
  }

  getCustomerEmail(): string {
    return this.customerService.getCustomerEmail();
  }
}
```

Angular sees:

```typescript
constructor(private customerService: CustomerService)
```

and provides the required `CustomerService` instance.

The component does not create the service using `new`.

### Step 4: Use the Service Data in the Template

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Services & Dependency Injection</h2>

<p>Name: {{ getCustomerName() }}</p>
<p>Email: {{ getCustomerEmail() }}</p>
```

The flow is:

```text
Customer Template
       ↓
Customer Component
       ↓
CustomerService
       ↓
Customer Data
```

### Step 5: Update app.html

Open:

```text
src/app/app.html
```

Add:

```html
<app-customer></app-customer>
```

Open:

```text
src/app/app.ts
```

Import `Customer` and include it in the component imports:

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

### Step 6: Run the Application

From the project root:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

Expected output:

```text
Services & Dependency Injection

Name: Siraj
Email: siraj@example.com
```

<img width="3838" height="520" alt="image" src="https://github.com/user-attachments/assets/43b6a436-ea9a-4506-bd1d-006ebc1326aa" />

# How Dependency Injection Works

The important part is:

```typescript
constructor(private customerService: CustomerService) {
}
```

The component declares:

```text
I need CustomerService.
```

Angular's dependency-injection system provides it.

The component does not need to know how the service is created.

```text
Customer Component
        │
        │ requests
        ↓
CustomerService
        ↑
        │
     Angular
      DI
```

# Service Responsibilities

A service can contain logic that should not belong directly inside a component.

For example:

```typescript
export class CustomerService {

  getCustomerName(): string {
    return 'Siraj';
  }

  getCustomerEmail(): string {
    return 'siraj@example.com';
  }
}
```

The component consumes that functionality:

```typescript
getCustomerName(): string {
  return this.customerService.getCustomerName();
}
```

The service owns the customer-related logic.

# Service vs Component

| Component | Service |
|---|---|
| Focuses on UI | Focuses on reusable logic |
| Has a template | Normally has no template |
| Uses `@Component` | Uses `@Injectable` |
| Handles UI interaction | Handles application/business logic |
| Represents a UI feature | Provides reusable functionality |
| Example: `Customer` | Example: `CustomerService` |

# Service Scope

Angular allows services to be provided at different levels.

The most common application-wide approach is:

```typescript
@Injectable({
  providedIn: 'root'
})
```

This makes the service available throughout the application.

A service can also be provided at a component or other injector level when a separate instance or narrower scope is required.

# Reusing the Service

The same service can be injected into multiple components.

For example:

```typescript
constructor(private customerService: CustomerService) {
}
```

Another component can also inject it:

```typescript
constructor(private customerService: CustomerService) {
}
```

Both components can use the same application-level service.

```text
             Customer Component
                    │
                    ↓
             CustomerService
                    ↑
                    │
             Customer List
                Component
```

# Practical Project Structure

After implementing this lesson:

```text
my-angular-application/
├── public/
│
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   ├── customer.ts
│   │   │   └── customer.spec.ts
│   │   │
│   │   ├── customer/
│   │   │   ├── customer.ts
│   │   │   ├── customer.html
│   │   │   ├── customer.css
│   │   │   └── customer.spec.ts
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
| Service | Reusable application logic | `CustomerService` |
| `@Injectable` | Makes a class available for DI | `@Injectable({...})` |
| `providedIn: 'root'` | Registers service with root injector | `providedIn: 'root'` |
| Dependency Injection | Provides required dependencies | `constructor(private service: CustomerService)` |
| Service injection | Gives component access to service | `CustomerService` |
| Component | Consumes service functionality | `Customer` |

# Key Takeaways

- Services contain reusable application or business logic.
- Components should focus primarily on UI and user interaction.
- Angular provides Dependency Injection to supply services to components.
- `@Injectable` is used for Angular services.
- `providedIn: 'root'` is the common approach for application-wide services.
- Components receive services through dependency injection.
- A component should not normally create services using `new`.
- Services can be reused by multiple components.
- Dependency Injection reduces coupling between components and their dependencies.
