# Lesson 7 — Data Binding

# What is Data Binding

Data binding connects the component class with its HTML template.

It allows Angular to:

- Display component data in the UI.
- Set HTML element properties.
- Listen for user events.
- Synchronize data between the component and the UI.

# Data Binding Types

1. Interpolation
2. Property binding
3. Attribute binding
4. Event binding
5. Two-way binding

| Binding | Direction | Syntax | Purpose |
|---|---|---|---|
| Interpolation | Component → Template | `{{ value }}` | Display data |
| Property binding | Component → Template | `[property]="value"` | Set DOM/component properties |
| Attribute binding | Component → Template | `[attr.name]="value"` | Set HTML attributes |
| Event binding | Template → Component | `(event)="method()"` | Respond to events |
| Two-way binding | Component ↔ Template | `[(ngModel)]="value"` | Synchronize data |

# 1. Interpolation

Interpolation displays component data inside the template.

Syntax:

```html
{{ expression }}
```

Example:

```typescript
export class Customer {
  name = 'Siraj';
}
```

Template:

```html
<p>Name: {{ name }}</p>
```

Output:

```text
Name: Siraj
```

## Interpolation with Expressions

Interpolation can also evaluate expressions.

```html
<p>{{ name.toUpperCase() }}</p>
```

You can also use simple calculations:

```html
<p>Total: {{ price * quantity }}</p>
```

Example:

```typescript
price = 500;
quantity = 2;
```

Output:

```text
Total: 1000
```

# 2. Property Binding

Property binding sets a DOM property using component data.

Syntax:

```html
[property]="expression"
```

Example:

```typescript
isDisabled = true;
```

Template:

```html
<button [disabled]="isDisabled">
  Select Customer
</button>
```

When `isDisabled` is `true`, the button is disabled.

When it becomes `false`, the button becomes enabled.

# Property Binding vs Interpolation

Both can sometimes produce similar visible results, but they are not the same.

### Interpolation

```html
<img src="{{ imageUrl }}">
```

### Property Binding

```html
<img [src]="imageUrl">
```

Property binding directly binds to the DOM property.

For DOM properties, prefer property binding when you are explicitly binding a property.

# Common Property Bindings

| Property | Example |
|---|---|
| `disabled` | `[disabled]="isDisabled"` |
| `value` | `[value]="name"` |
| `src` | `[src]="imageUrl"` |
| `checked` | `[checked]="isSelected"` |
| `hidden` | `[hidden]="isHidden"` |
| `className` | `[className]="customerClass"` |

# 3. Attribute Binding

Attribute binding is used when you need to bind an HTML attribute.

Syntax:

```html
[attr.attribute]="expression"
```

Example:

```html
<td [attr.colspan]="columnSpan">
  Customer Details
</td>
```

Component:

```typescript
columnSpan = 2;
```

The resulting HTML attribute is:

```html
<td colspan="2">
```

# Property vs Attribute Binding

| Property Binding | Attribute Binding |
|---|---|
| `[disabled]` | `[attr.aria-label]` |
| Works with DOM properties | Works with HTML attributes |
| `[value]` | `[attr.colspan]` |
| `[checked]` | `[attr.data-id]` |

# 4. Event Binding

Event binding allows the template to respond to events and call component methods.

Syntax:

```html
(event)="method()"
```

Example:

```html
<button (click)="selectCustomer()">
  Select Customer
</button>
```

Component:

```typescript
selectCustomer(): void {
  console.log('Customer selected');
}
```

# Event Object

Angular can provide the browser event object.

```html
<input (input)="onInput($event)">
```

Component:

```typescript
onInput(event: Event): void {
  const input = event.target as HTMLInputElement;

  console.log(input.value);
}
```

# Common Events

| Event | Example |
|---|---|
| `click` | `(click)="save()"` |
| `input` | `(input)="onInput($event)"` |
| `change` | `(change)="onChange($event)"` |
| `keyup` | `(keyup)="onKeyUp($event)"` |
| `keydown` | `(keydown)="onKeyDown($event)"` |
| `mouseover` | `(mouseover)="onMouseOver()"` |
| `mouseleave` | `(mouseleave)="onMouseLeave()"` |

# 5. Two-Way Binding

Two-way binding synchronizes data between the component and the template.

Syntax:

```html
[(ngModel)]="property"
```

It combines property binding and event binding.

# Using ngModel

Angular's `ngModel` directive is provided by `FormsModule`.

Import it into a standalone component:

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  imports: [FormsModule],
  templateUrl: './customer.html'
})
export class Customer {
  name = 'Siraj';
}
```

Template:

```html
<input [(ngModel)]="name">

<p>Name: {{ name }}</p>
```

# Two-Way Binding Concept

This:

```html
<input [(ngModel)]="name">
```

can be understood conceptually as:

```html
<input
  [ngModel]="name"
  (ngModelChange)="name = $event">
```

# How to Implement Data Binding in the Current Application

Create/use **initial Angular project skeleton** and create the `customer` component.

```bash
ng new my-angular-application
ng g c customer
```

Then implement the data-binding concepts step by step.

### Step 1: Open the Customer Component

Open:

```text
src/app/customer/customer.ts
```

Update it:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  imports: [FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
  name = 'Siraj';
  email = 'siraj@example.com';

  isActive = true;
  isDisabled = true;

  imageUrl = 'http://www.sirajchaudhary.com/assets/img/sirajchaudhary.jpg';

  columnSpan = 2;

  selectCustomer(): void {
    console.log('Customer selected:', this.name);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    console.log('Input value:', input.value);
  }
}
```

### Step 2: Add the Customer Component to the Root Component

Open:

```text
src/app/app.ts
```

Import the `Customer` component:

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

### Step 3: Render the Customer Component

Open:

```text
src/app/app.html
```

Add:

```html
<h1>My Angular Application</h1>

<app-customer></app-customer>
```

### Step 4: Add Interpolation

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Interpolation</h2>

<p>Name: {{ name }}</p>
<p>Email: {{ email }}</p>
<p>Uppercase: {{ name.toUpperCase() }}</p>
```

### Step 5: Add Property Binding

Add:

```html
<h2>Property Binding</h2>

<button [disabled]="isDisabled">
  Disabled Button
</button>

<img
  [src]="imageUrl"
  [alt]="name">
```

### Step 6: Add Attribute Binding

Add:

```html
<h2>Attribute Binding</h2>

<button [attr.aria-label]="'Select ' + name">
  Select Customer
</button>

<table border="1">
  <tr>
    <td [attr.colspan]="columnSpan">
      Customer Details
    </td>
  </tr>
</table>
```

### Step 7: Add Event Binding

Add:

```html
<h2>Event Binding</h2>

<button (click)="selectCustomer()">
  Select Customer
</button>
```

### Step 8: Add Event Object

Add:

```html
<input
  [value]="name"
  (input)="onInput($event)">
```

### Step 9: Add Two-Way Binding

Add:

```html
<h2>Two-Way Binding</h2>

<input [(ngModel)]="name">

<p>Current Name: {{ name }}</p>
```

### Step 10: Complete Customer Template

The complete:

```text
src/app/customer/customer.html
```

can now be:

```html
<h2>Customer Details</h2>

<h2>Interpolation</h2>

<p>Name: {{ name }}</p>
<p>Email: {{ email }}</p>
<p>Uppercase: {{ name.toUpperCase() }}</p>

<h2>Property Binding</h2>

<button [disabled]="isDisabled">
  Disabled Button
</button>

<img
  [src]="imageUrl"
  [alt]="name">

<h2>Attribute Binding</h2>

<button [attr.aria-label]="'Select ' + name">
  Select Customer
</button>

<table border="1">
  <tr>
    <td [attr.colspan]="columnSpan">
      Customer Details
    </td>
  </tr>
</table>

<h2>Event Binding</h2>

<button (click)="selectCustomer()">
  Select Customer
</button>

<input
  [value]="name"
  (input)="onInput($event)">

<h2>Two-Way Binding</h2>

<input [(ngModel)]="name">

<p>Current Name: {{ name }}</p>
```

# Run the Application

From the project root:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

<img width="3840" height="2076" alt="image" src="https://github.com/user-attachments/assets/e717952c-6282-4805-9acd-15ddf5a141da" />

# Test Each Binding

| Example | Test |
|---|---|
| Interpolation | Observe the displayed values |
| Property binding | Change `isDisabled` |
| Attribute binding | Inspect the HTML |
| Event binding | Click the button |
| Input event | Type into the first input |
| Two-way binding | Change the name |
| Image binding | Observe the image |

# Observe Two-Way Binding

Initially:

```text
name = "Siraj"
```

The UI shows:

```text
Current Name: Siraj
```

Change the input to:

```text
Ahmed
```

The component property becomes:

```text
name = "Ahmed"
```

and the paragraph automatically becomes:

```text
Current Name: Ahmed
```

# Data Binding Summary

```text
                    Angular Component
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
       Interpolation   Property      Attribute
             │         Binding        Binding
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                        Template
                           │
                           │
                    Event Binding
                           │
                           ▼
                      Component

                 Two-Way Binding
                    Component
                       ↕
                    Template
```

# Best Practices

- Use interpolation primarily to display values.
- Use property binding when binding to DOM or component properties.
- Use attribute binding for HTML attributes such as ARIA and custom attributes.
- Use event binding to respond to user actions.
- Use two-way binding when the UI and component state need to stay synchronized.
- Keep event handlers small and focused.
- Prefer explicit property binding instead of interpolation when binding DOM properties.
- Avoid putting complex business logic directly inside templates.
- Use services when business logic becomes reusable or complex.

# Quick Revision

| Concept | Syntax | Direction |
|---|---|---|
| Interpolation | `{{ name }}` | Component → Template |
| Property binding | `[disabled]="isDisabled"` | Component → Template |
| Attribute binding | `[attr.aria-label]="label"` | Component → Template |
| Event binding | `(click)="selectCustomer()"` | Template → Component |
| Two-way binding | `[(ngModel)]="name"` | Component ↔ Template |

# Key Takeaways

- Data binding connects Angular component data with the template.
- Interpolation displays component values.
- Property binding sets DOM or component properties.
- Attribute binding sets HTML attributes.
- Event binding responds to user actions.
- Two-way binding synchronizes component state and the UI.
- `FormsModule` is required when using `[(ngModel)]`.
- Angular provides different binding mechanisms for different communication directions.
