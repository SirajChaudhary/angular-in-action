# Lesson 14 — Decorators

# What Are Decorators

Decorators are special TypeScript syntax (using the `@` symbol) that add metadata to classes, properties, and methods.

Angular uses decorators to tell the framework how a class or class member should be treated.

Common Angular decorators:

| Decorator | Type | Purpose |
|---|---|---|
| `@Component` | Class | Defines a component |
| `@Directive` | Class | Defines a directive |
| `@Pipe` | Class | Defines a custom pipe |
| `@Injectable` | Class | Enables dependency injection |
| `@Input` | Property | Receives data from a parent |
| `@Output` | Property | Emits events to a parent |
| `@HostListener` | Method | Listens for host events |
| `@HostBinding` | Property | Binds properties, attributes, or classes of the host |

# Why Angular Uses Decorators

Decorators provide Angular with metadata that describes how application classes and members should work.

For example:

```typescript
@Component({
  selector: 'app-customer'
})
export class Customer {
}
```

`@Component` tells Angular that the `Customer` class represents an Angular component.

Similarly:

```typescript
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
}
```

`@Injectable` tells Angular that `CustomerService` can participate in dependency injection.

# Types of Angular Decorators

| Type | Decorators | Purpose |
|---|---|---|
| Class decorators | `@Component`, `@Directive`, `@Pipe`, `@Injectable` | Configure a class |
| Property decorators | `@Input`, `@Output`, `@HostBinding` | Configure properties |
| Method decorators | `@HostListener` | Configure methods |

# Practical Examples

Create/use the **existing Angular project from the previous lessons** (from lesson-04).

The project was originally created using:

```bash
ng new my-angular-application
```

We will continue using the same project for this lesson.

Each example below demonstrates one specific decorator or a closely related group of decorators.

# Example 1 — `@Component`

### What Does `@Component` Do?

The `@Component` decorator tells Angular that a class represents a component.

It provides metadata such as:

- Component selector
- Template
- Styles
- Imported dependencies
- Providers

### Create the Component

```bash
ng g c customer
```

Open:

```text
src/app/customer/customer.ts
```

Update:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  name = 'Siraj';
  email = 'siraj@example.com';
  city = 'Hyderabad';
}
```

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Customer Information</h2>

<p><strong>Name:</strong> {{ name }}</p>
<p><strong>Email:</strong> {{ email }}</p>
<p><strong>City:</strong> {{ city }}</p>
```

### Use the Component

Open:

```text
src/app/app.ts
```

Import the component:

```typescript
import { Component } from '@angular/core';
import { Customer } from './customer/customer';

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

Add:

```html
<h1>Angular Decorators</h1>

<app-customer></app-customer>
```

### Result

The application displays:

```text
Angular Decorators

Customer Information

Name: Siraj
Email: siraj@example.com
City: Hyderabad
```

### Decorator Used

```text
@Component
```

### Purpose

```text
Defines an Angular component
```

<img width="3840" height="578" alt="image" src="https://github.com/user-attachments/assets/c31d63e4-843c-46fc-82f6-72c5454bc01c" />

# Example 2 — `@Directive`

### What Does `@Directive` Do?

The `@Directive` decorator tells Angular that a class represents a directive.

In this example, the directive will visibly change the appearance of an element when the directive is applied.

### Create the Directive

```bash
ng g directive directives/highlight
```

Open:

```text
src/app/directives/highlight.ts
```

Update:

```typescript
import {
  Directive,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

  @HostBinding('style.backgroundColor')
  backgroundColor = '';

  @HostBinding('style.color')
  color = '';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.backgroundColor = 'yellow';
    this.color = 'black';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.backgroundColor = '';
    this.color = '';
  }
}
```

### Use the Directive

Add the directive to the `Customer` component's imports:

```typescript
import { Component } from '@angular/core';
import { Highlight } from '../directives/highlight';

@Component({
  selector: 'app-customer',
  imports: [Highlight],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  name = 'Siraj';
  email = 'siraj@example.com';
  city = 'Hyderabad';
}
```

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Customer Information</h2>

<p appHighlight>
  Move the mouse over this text.
</p>

<p><strong>Name:</strong> {{ name }}</p>
<p><strong>Email:</strong> {{ email }}</p>
<p><strong>City:</strong> {{ city }}</p>
```

### Result

When the mouse moves over:

```text
Move the mouse over this text.
```

the background becomes yellow and the text becomes black.

When the mouse leaves, the original styling is restored.

### Decorator Used

```text
@Directive
```

### Purpose

```text
Defines a custom Angular directive
```

<img width="3840" height="698" alt="image" src="https://github.com/user-attachments/assets/86438704-f79e-4e72-b989-452efa6af829" />

# Example 3 — `@Pipe`

### What Does `@Pipe` Do?

The `@Pipe` decorator tells Angular that a class represents a custom pipe.

In this example, the pipe converts the first character of a string to uppercase.

### Create the Pipe

```bash
ng g pipe pipes/capitalize
```

Open:

```text
src/app/pipes/capitalize-pipe.ts
```

Update:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class Capitalize implements PipeTransform {

  transform(value: string): string {

    if (!value) {
      return '';
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
```

### Use the Pipe

Add the pipe to the `Customer` component's imports:

```typescript
import { Component } from '@angular/core';
import { Capitalize } from '../pipes/capitalize-pipe';

@Component({
  selector: 'app-customer',
  imports: [Capitalize],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  name = 'siraj';
}
```

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Customer Name</h2>

<p>Original: {{ name }}</p>

<p>Capitalized: {{ name | capitalize }}</p>
```

### Result

```text
Original: siraj

Capitalized: Siraj
```

### Decorator Used

```text
@Pipe
```

### Purpose

```text
Defines a custom Angular pipe
```

<img width="3840" height="548" alt="image" src="https://github.com/user-attachments/assets/dfae6565-b840-4e08-9d3c-56f89d19d6de" />

# Example 4 — `@Injectable`

### What Does `@Injectable` Do?

The `@Injectable` decorator tells Angular that a class can participate in dependency injection.

In this example, the service provides customer information to the component.

### Create the Service

```bash
ng g s services/customer
```

Angular generates:

```text
src/app/services/customer.ts
```

Update:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Customer {

  getCustomerName(): string {
    return 'Siraj';
  }

  getCustomerEmail(): string {
    return 'siraj@example.com';
  }
}
```

### Use the Service

Because both the component and service are named `Customer`, use an import alias for the service.

Open:

```text
src/app/customer/customer.ts
```

Update:

```typescript
import { Component, inject } from '@angular/core';
import { Customer as CustomerService } from '../services/customer';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  private customerService = inject(CustomerService);

  customerName = this.customerService.getCustomerName();
  customerEmail = this.customerService.getCustomerEmail();
}
```

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Customer Information</h2>

<p>
  <strong>Name:</strong>
  {{ customerName }}
</p>

<p>
  <strong>Email:</strong>
  {{ customerEmail }}
</p>
```

### Result

The component receives the customer information from the injected service.

```text
Name: Siraj
Email: siraj@example.com
```

### Decorator Used

```text
@Injectable
```

### Purpose

```text
Allows a class to participate in Angular dependency injection
```

<img width="3840" height="520" alt="image" src="https://github.com/user-attachments/assets/d9cb0a09-e0d4-4a24-aff5-616465baaacc" />

# Example 5 — `@Input`

### What Does `@Input` Do?

The `@Input` decorator allows a child component to receive data from its parent.

In this example, the `Customer` component sends a customer name to the `CustomerDetails` child component.

### Create the Child Component

```bash
ng g c customer-details
```

Open:

```text
src/app/customer-details/customer-details.ts
```

Update:

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  imports: [],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css'
})
export class CustomerDetails {

  @Input()
  name = '';
}
```

Open:

```text
src/app/customer-details/customer-details.html
```

Add:

```html
<h3>Customer Details</h3>

<p>
  Customer Name: {{ name }}
</p>
```

### Pass Data from the Parent

Open:

```text
src/app/customer/customer.ts
```

Import the child component:

```typescript
import { Component } from '@angular/core';
import { CustomerDetails } from '../customer-details/customer-details';

@Component({
  selector: 'app-customer',
  imports: [CustomerDetails],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  customerName = 'Siraj';
}
```

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Customer</h2>

<app-customer-details
  [name]="customerName">
</app-customer-details>
```

### Result

The parent passes:

```text
Siraj
```

to the child component through:

```html
[name]="customerName"
```

The child receives it through:

```typescript
@Input()
name = '';
```

### Data Flow

```text
Parent Component
       |
       | [name]
       ↓
CustomerDetails Component
       |
       | @Input()
       ↓
name property
```

### Decorator Used

```text
@Input
```

### Purpose

```text
Receives data from a parent component
```

<img width="3840" height="544" alt="image" src="https://github.com/user-attachments/assets/53d0a90b-cb4e-470d-b1e3-0dd081b8e304" />

# Example 6 — `@Output`

### What Does `@Output` Do?

The `@Output` decorator allows a child component to send an event to its parent.

In this example, the `CustomerDetails` component emits the selected customer name when the user clicks a button.

### Update the Child Component

Open:

```text
src/app/customer-details/customer-details.ts
```

Update:

```typescript
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-customer-details',
  imports: [],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css'
})
export class CustomerDetails {

  @Input()
  name = '';

  @Output()
  selected = new EventEmitter<string>();

  selectCustomer(): void {
    this.selected.emit(this.name);
  }
}
```

Open:

```text
src/app/customer-details/customer-details.html
```

Update:

```html
<h3>Customer Details</h3>

<p>
  Customer Name: {{ name }}
</p>

<button
  type="button"
  (click)="selectCustomer()">
  Select Customer
</button>
```

### Listen in the Parent

Open:

```text
src/app/customer/customer.ts
```

Update:

```typescript
import { Component } from '@angular/core';
import { CustomerDetails } from '../customer-details/customer-details';

@Component({
  selector: 'app-customer',
  imports: [CustomerDetails],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  customerName = 'Siraj';

  selectedCustomer = '';

  onCustomerSelected(name: string): void {
    this.selectedCustomer = name;
  }
}
```

Open:

```text
src/app/customer/customer.html
```

Update:

```html
<h2>Customer</h2>

<app-customer-details
  [name]="customerName"
  (selected)="onCustomerSelected($event)">
</app-customer-details>

@if (selectedCustomer) {
  <p>
    Selected Customer: {{ selectedCustomer }}
  </p>
}
```

### Result

Initially:

```text
Customer Name: Siraj

[ Select Customer ]
```

After clicking the button:

```text
Customer Name: Siraj

[ Select Customer ]

Selected Customer: Siraj
```

### Data Flow

```text
Child Component
       |
       | selected.emit()
       ↓
Parent Component
       |
       | (selected)
       ↓
onCustomerSelected()
```

### Decorator Used

```text
@Output
```

### Purpose

```text
Emits an event from a child component to its parent
```

<img width="3840" height="690" alt="image" src="https://github.com/user-attachments/assets/bd86b41b-bfb0-4113-846e-ab6cbfa91010" />

# Example 7 — `@HostListener`

### What Does `@HostListener` Do?

The `@HostListener` decorator allows a directive to listen for events on its host element.

In this example, the directive listens for `mouseenter` and `mouseleave` events and changes a message.

### Create the Directive

```bash
ng g directive directives/mouseTracker
```

Open:

```text
src/app/directives/mouse-tracker.ts
```

Update:

```typescript
import {
  Directive,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[appMouseTracker]'
})
export class MouseTracker {

  @Output()
  mouseStatus = new EventEmitter<string>();

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.mouseStatus.emit('Mouse entered the element');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.mouseStatus.emit('Mouse left the element');
  }
}
```

### Use the Directive

Open:

```text
src/app/customer/customer.ts
```

Add the directive:

```typescript
import { Component } from '@angular/core';
import { MouseTracker } from '../directives/mouse-tracker';

@Component({
  selector: 'app-customer',
  imports: [MouseTracker],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  mouseMessage = 'Move the mouse over the box.';
}
```

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Host Listener Example</h2>

<div
  appMouseTracker
  (mouseStatus)="mouseMessage = $event"
  style="padding: 30px; border: 1px solid #999; width: 300px;">

  Move your mouse over this box.
</div>

<p>{{ mouseMessage }}</p>
```

### Result

When the mouse enters the box:

```text
Mouse entered the element
```

When the mouse leaves the box:

```text
Mouse left the element
```

### Decorator Used

```text
@HostListener
```

### Purpose

```text
Listens for events on the host element
```

<img width="3840" height="662" alt="image" src="https://github.com/user-attachments/assets/617fc8af-57a2-4d0f-8855-45b1063b2500" />

# Example 8 — `@HostBinding`

### What Does `@HostBinding` Do?

The `@HostBinding` decorator binds a property, attribute, or CSS class to the host element.

In this example, the directive automatically applies a border and background color to the element.

### Create the Directive

```bash
ng g directive directives/cardStyle
```

Open:

```text
src/app/directives/card-style.ts
```

Update:

```typescript
import {
  Directive,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[appCardStyle]'
})
export class CardStyle {

  @HostBinding('style.border')
  border = '2px solid steelblue';

  @HostBinding('style.padding')
  padding = '20px';

  @HostBinding('style.borderRadius')
  borderRadius = '8px';

  @HostBinding('style.backgroundColor')
  backgroundColor = '#f5f9ff';
}
```

### Use the Directive

Open:

```text
src/app/customer/customer.ts
```

Add the directive:

```typescript
import { Component } from '@angular/core';
import { CardStyle } from '../directives/card-style';

@Component({
  selector: 'app-customer',
  imports: [CardStyle],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
}
```

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Host Binding Example</h2>

<div appCardStyle>
  <h3>Customer Card</h3>

  <p>Name: Siraj</p>
  <p>Email: siraj@example.com</p>
</div>
```

### Result

The `<div>` automatically receives:

- A border
- Padding
- Rounded corners
- A background color

The styles are applied through `@HostBinding`.

### Decorator Used

```text
@HostBinding
```

### Purpose

```text
Binds properties, attributes, or CSS classes to the host element
```

<img width="3840" height="760" alt="image" src="https://github.com/user-attachments/assets/8fcd9b9f-5c8c-470f-86cc-60333f711ca7" />

# Example 9 — Combining `@HostListener` and `@HostBinding`

`@HostListener` and `@HostBinding` are often useful together.

In this example, moving the mouse over the element changes its background color.

### Create the Directive

```bash
ng g directive directives/hoverCard
```

Open:

```text
src/app/directives/hover-card.ts
```

Update:

```typescript
import {
  Directive,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appHoverCard]'
})
export class HoverCard {

  @HostBinding('style.backgroundColor')
  backgroundColor = '#f5f5f5';

  @HostBinding('style.padding')
  padding = '20px';

  @HostBinding('style.border')
  border = '1px solid #999';

  @HostBinding('style.borderRadius')
  borderRadius = '8px';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.backgroundColor = '#fff3cd';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.backgroundColor = '#f5f5f5';
  }
}
```

### Use the Directive

Open:

```text
src/app/customer/customer.ts
```

Import the directive:

```typescript
import { Component } from '@angular/core';
import { HoverCard } from '../directives/hover-card';

@Component({
  selector: 'app-customer',
  imports: [HoverCard],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
}
```

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>HostListener + HostBinding</h2>

<div appHoverCard>
  <h3>Customer Card</h3>

  <p>Move your mouse over this card.</p>
</div>
```

### Result

When the mouse enters the card:

```text
HostListener
      ↓
onMouseEnter()
      ↓
backgroundColor changes
      ↓
HostBinding
      ↓
Host element changes
```

When the mouse leaves the card, the original background color is restored.

### Decorators Used

```text
@HostListener
@HostBinding
```

### Purpose

| Decorator | Responsibility |
|---|---|
| `@HostListener` | Listens for events on the host element |
| `@HostBinding` | Changes properties of the host element |

<br />
<img width="3840" height="670" alt="image" src="https://github.com/user-attachments/assets/87684122-0bdc-4c0e-8cb1-94c0babb6380" />

# Modern Angular APIs

Angular provides modern APIs for several patterns that were traditionally implemented using decorators.

| Traditional API | Modern Angular API |
|---|---|
| `@Input()` | `input()` |
| `@Output()` | `output()` |
| `@HostBinding()` | `host` metadata |
| `@HostListener()` | `host` metadata |

### Modern Input

Traditional:

```typescript
@Input()
name = '';
```

Modern:

```typescript
name = input<string>('');
```

### Modern Output

Traditional:

```typescript
@Output()
selected = new EventEmitter<string>();
```

Modern:

```typescript
selected = output<string>();
```

### Modern Host Configuration

Instead of:

```typescript
@HostListener('mouseenter')
onMouseEnter(): void {
  this.backgroundColor = 'yellow';
}
```

Host behavior can be configured using `host` metadata:

```typescript
@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '[style.backgroundColor]': 'backgroundColor'
  }
})
export class Highlight {

  backgroundColor = 'yellow';

  onMouseEnter(): void {
    console.log('Mouse entered');
  }
}
```

The traditional decorators remain important concepts and are commonly encountered in existing Angular applications.

# Decorators vs TypeScript Decorator Syntax

Angular decorators use TypeScript decorator syntax, but Angular gives each decorator a specific Angular meaning.

| Decorator | Angular Meaning |
|---|---|
| `@Component({...})` | Configures a component |
| `@Directive({...})` | Configures a directive |
| `@Pipe({...})` | Configures a pipe |
| `@Injectable({...})` | Configures an injectable class |

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
│   │   ├── customer-details/
│   │   │   ├── customer-details.ts
│   │   │   ├── customer-details.html
│   │   │   ├── customer-details.css
│   │   │   └── customer-details.spec.ts
│   │   │
│   │   ├── directives/
│   │   │   ├── highlight.ts
│   │   │   ├── highlight.spec.ts
│   │   │   ├── mouse-tracker.ts
│   │   │   ├── mouse-tracker.spec.ts
│   │   │   ├── card-style.ts
│   │   │   ├── card-style.spec.ts
│   │   │   ├── hover-card.ts
│   │   │   └── hover-card.spec.ts
│   │   │
│   │   ├── pipes/
│   │   │   ├── capitalize.ts
│   │   │   └── capitalize.spec.ts
│   │   │
│   │   ├── services/
│   │   │   ├── customer.ts
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

| Decorator | Category | Purpose | Example |
|---|---|---|---|
| `@Component` | Class | Defines a component | `@Component({...})` |
| `@Directive` | Class | Defines a directive | `@Directive({...})` |
| `@Pipe` | Class | Defines a custom pipe | `@Pipe({...})` |
| `@Injectable` | Class | Enables dependency injection | `@Injectable({...})` |
| `@Input` | Property | Receives parent data | `@Input()` |
| `@Output` | Property | Emits events to parent | `@Output()` |
| `@HostListener` | Method | Listens to host events | `@HostListener('click')` |
| `@HostBinding` | Property | Binds host properties/classes | `@HostBinding('class.active')` |

# Key Takeaways

- Decorators use TypeScript decorator syntax to provide Angular-specific metadata.
- `@Component` defines an Angular component.
- `@Directive` defines a custom Angular directive.
- `@Pipe` defines a custom Angular pipe.
- `@Injectable` enables a class to participate in Angular dependency injection.
- `@Input` receives data from a parent component.
- `@Output` emits events from a child component.
- `@HostListener` listens for events on the host element.
- `@HostBinding` binds properties, attributes, or classes to the host element.
- `@HostListener` and `@HostBinding` can be used together to create interactive directives.
- Modern Angular provides `input()` and `output()` as alternatives to `@Input()` and `@Output()`.
- Angular also provides `host` metadata for configuring host bindings and event listeners.
- Understanding both traditional decorators and modern Angular APIs is useful when working with new and existing Angular applications.