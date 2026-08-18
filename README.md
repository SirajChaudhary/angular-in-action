# Lesson 6 — Component Communication

This lesson covers how Angular components communicate with each other.

We will focus on:

- Parent → Child communication
- Child → Parent communication
- `input()`
- `output()`
- Passing data to a child component
- Sending events from a child component
- Implementing both patterns in the current application

# Parent and Child Components

Consider this structure:

```text
App
└── Customer
    └── CustomerCard
```

Here:

- `App` is the parent.
- `Customer` is the child of `App`.
- `CustomerCard` is the child of `Customer`.

Angular provides component communication mechanisms for passing data and events between these components.

# Communication Patterns

| Direction | Purpose | Angular API |
|---|---|---|
| Parent → Child | Pass data to a child | `input()` |
| Child → Parent | Send events to a parent | `output()` |

The basic flow is:

```text
Parent
   │
   │ input()
   ▼
Child
   │
   │ output()
   ▼
Parent
```

# Parent → Child Communication

A parent component can pass data to a child component using an input.

Modern Angular provides the `input()` function for defining inputs.

## Child Component

Example:

```typescript
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.html'
})
export class CustomerCard {
  name = input<string>('');
}
```

The child can use the input in its template:

```html
<h3>Customer Card</h3>

<p>Name: {{ name() }}</p>
```

## Parent Component

The parent passes a value using property binding:

```html
<app-customer-card [name]="name"></app-customer-card>
```

If the parent contains:

```typescript
name = 'Siraj';
```

the child receives:

```text
Siraj
```

# Input Flow

```text
Customer
   │
   │ [name]="name"
   ▼
CustomerCard
   │
   │ name()
   ▼
Template
```

# Required Inputs

An input can be required.

```typescript
name = input.required<string>();
```

The parent must provide the value:

```html
<app-customer-card [name]="name"></app-customer-card>
```

This is useful when a child component cannot work without a particular value.

# Input with Default Value

An input can have a default value:

```typescript
name = input<string>('Unknown');
```

If the parent does not provide a value, the child uses:

```text
Unknown
```

# Child → Parent Communication

A child component can communicate with its parent using an output.

Modern Angular provides the `output()` function.

## Child Component

```typescript
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.html'
})
export class CustomerCard {
  customerSelected = output<string>();

  selectCustomer(): void {
    this.customerSelected.emit('Siraj');
  }
}
```

The child emits an event:

```typescript
this.customerSelected.emit('Siraj');
```

# Child Template

```html
<button (click)="selectCustomer()">
  Select Customer
</button>
```

# Parent Component

The parent listens to the output event:

```html
<app-customer-card
  (customerSelected)="onCustomerSelected($event)">
</app-customer-card>
```

The `$event` contains the value emitted by the child.

Parent TypeScript:

```typescript
onCustomerSelected(name: string): void {
  console.log('Selected customer:', name);
}
```

# Output Flow

```text
CustomerCard
   │
   │ emit('Siraj')
   ▼
customerSelected
   │
   ▼
Customer
   │
   │ onCustomerSelected($event)
   ▼
Parent method
```

# Input and Output Together

A child component can have both inputs and outputs.

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.html'
})
export class CustomerCard {

  name = input<string>('');

  customerSelected = output<string>();

  selectCustomer(): void {
    this.customerSelected.emit(this.name());
  }
}
```

Template:

```html
<h3>Customer Card</h3>

<p>Name: {{ name() }}</p>

<button (click)="selectCustomer()">
  Select Customer
</button>
```

Parent:

```html
<app-customer-card
  [name]="name"
  (customerSelected)="onCustomerSelected($event)">
</app-customer-card>
```

# How to Implement Component Communication in the Current Application

We will update the existing `Customer` component and create a `CustomerCard` child component.

The final structure will be:

```text
src/app/
├── app.ts
├── app.html
├── app.css
├── app.config.ts
├── app.routes.ts
└── customer/
    ├── customer.ts
    ├── customer.html
    ├── customer.css
    ├── customer.spec.ts
    └── customer-card/
        ├── customer-card.ts
        ├── customer-card.html
        ├── customer-card.css
        └── customer-card.spec.ts
```

### Step 1: Create the Child Component

From the project root:

```bash
ng g c customer/customer-card
```

Angular CLI creates:

```text
src/app/customer/customer-card/
├── customer-card.ts
├── customer-card.html
├── customer-card.css
└── customer-card.spec.ts
```

### Step 2: Create an Input

Open:

```text
src/app/customer/customer-card/customer-card.ts
```

Update it:

```typescript
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-customer-card',
  imports: [],
  templateUrl: './customer-card.html',
  styleUrl: './customer-card.css'
})
export class CustomerCard {
  name = input<string>('');
  email = input<string>('');
}
```

### Step 3: Display the Input Values

Open:

```text
src/app/customer/customer-card/customer-card.html
```

Add:

```html
<h3>Customer Card</h3>

<p>Name: {{ name() }}</p>
<p>Email: {{ email() }}</p>
```

### Step 4: Import the Child Component

Open:

```text
src/app/customer/customer.ts
```

Update:

```typescript
import { Component } from '@angular/core';
import { CustomerCard } from './customer-card/customer-card';

@Component({
  selector: 'app-customer',
  imports: [CustomerCard],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
  name = 'Siraj';
  email = 'siraj@example.com';

  getCustomerName(): string {
    return this.name;
  }
}
```

### Step 5: Pass Data from Parent to Child

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Customer Details</h2>

<p>Name: {{ name }}</p>
<p>Email: {{ email }}</p>
<p>Customer: {{ getCustomerName() }}</p>

<app-customer-card
  [name]="name"
  [email]="email">
</app-customer-card>
```

The parent now passes:

```text
name
email
```

to the child component.

### Step 6: Create an Output

Open:

```text
src/app/customer/customer-card/customer-card.ts
```

Update it:

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-customer-card',
  imports: [],
  templateUrl: './customer-card.html',
  styleUrl: './customer-card.css'
})
export class CustomerCard {
  name = input<string>('');
  email = input<string>('');

  customerSelected = output<string>();

  selectCustomer(): void {
    this.customerSelected.emit(this.name());
  }
}
```

### Step 7: Add the Child Button

Open:

```text
src/app/customer/customer-card/customer-card.html
```

Update:

```html
<h3>Customer Card</h3>

<p>Name: {{ name() }}</p>
<p>Email: {{ email() }}</p>

<button (click)="selectCustomer()">
  Select Customer
</button>
```

### Step 8: Listen to the Output in the Parent

Open:

```text
src/app/customer/customer.ts
```

Add:

```typescript
onCustomerSelected(name: string): void {
  console.log('Selected customer:', name);
}
```

The complete class becomes:

```typescript
import { Component } from '@angular/core';
import { CustomerCard } from './customer-card/customer-card';

@Component({
  selector: 'app-customer',
  imports: [CustomerCard],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
  name = 'Siraj';
  email = 'siraj@example.com';

  getCustomerName(): string {
    return this.name;
  }

  onCustomerSelected(name: string): void {
    console.log('Selected customer:', name);
  }
}
```

### Step 9: Bind the Output Event

Open:

```text
src/app/customer/customer.html
```

Update the child component:

```html
<app-customer-card
  [name]="name"
  [email]="email"
  (customerSelected)="onCustomerSelected($event)">
</app-customer-card>
```

Complete template:

```html
<h2>Customer Details</h2>

<p>Name: {{ name }}</p>
<p>Email: {{ email }}</p>
<p>Customer: {{ getCustomerName() }}</p>

<app-customer-card
  [name]="name"
  [email]="email"
  (customerSelected)="onCustomerSelected($event)">
</app-customer-card>
```

### Step 10: Run the Application

From the project root:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

You should see:

```text
My Angular Application

Customer Details
Name: Siraj
Email: siraj@example.com
Customer: Siraj

Customer Card
Name: Siraj
Email: siraj@example.com

[ Select Customer ]
```

Click:

```text
Select Customer
```

Then open the browser developer console.

You should see:

```text
Selected customer: Siraj
```

<img width="3840" height="1356" alt="image" src="https://github.com/user-attachments/assets/6b3cc758-a46b-48ee-9010-78e8f52c72f8" />

# Communication Flow in the Current Application

```text
Customer
   │
   │ [name]="name"
   │ [email]="email"
   ▼
CustomerCard
   │
   │ customerSelected.emit(...)
   ▼
Customer
   │
   ▼
onCustomerSelected($event)
```

# Best Practices

- Use `input()` for parent-to-child data.
- Use `output()` for child-to-parent events.
- Use meaningful input and output names.
- Keep inputs focused on data required by the child.
- Keep outputs focused on events originating from the child.
- Avoid directly modifying parent state from a child.
- Use services for communication between unrelated components.
- Use shared state solutions when communication becomes more complex.

# Quick Revision

| Concept | Example |
|---|---|
| Input | `name = input<string>('')` |
| Required input | `name = input.required<string>()` |
| Output | `customerSelected = output<string>()` |
| Pass input | `[name]="name"` |
| Listen to output | `(customerSelected)="..."` |
| Emit event | `customerSelected.emit(...)` |
| Event value | `$event` |

# Key Takeaways

- Components can communicate with their parent and child components.
- `input()` is used for parent-to-child data.
- `output()` is used for child-to-parent events.
- Property binding passes values to inputs.
- Event binding listens to outputs.
- `$event` contains the value emitted by an output.
- A child component should communicate with its parent through defined inputs and outputs rather than directly accessing the parent's properties.
- Services are better suited for communication between unrelated components.
