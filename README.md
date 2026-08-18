# Lesson 10 — Pipes

# What are Pipes

Pipes transform data in an Angular template before displaying it.

They are commonly used for:

- Formatting text.
- Formatting numbers.
- Formatting currency.
- Formatting dates.
- Displaying JSON data.
- Creating reusable presentation transformations.

Pipes transform the value for display without changing the original component property.

# Pipe Syntax

The basic syntax is:

```html
{{ value | pipeName }}
```

Example:

```html
<p>{{ name | uppercase }}</p>
```

If:

```typescript
name = 'Siraj';
```

the output is:

```text
SIRAJ
```

# Pipe with Parameters

A pipe can receive parameters.

Syntax:

```html
{{ value | pipeName: parameter }}
```

Example:

```html
{{ price | currency:'INR' }}
```

# Built-in Pipes

Angular provides several built-in pipes.

| Pipe | Purpose | Angular Class | Example |
|---|---|---|---|
| `uppercase` | Converts text to uppercase | `UpperCasePipe` | `{{ name \| uppercase }}` |
| `lowercase` | Converts text to lowercase | `LowerCasePipe` | `{{ name \| lowercase }}` |
| `titlecase` | Converts text to title case | `TitleCasePipe` | `{{ name \| titlecase }}` |
| `currency` | Formats currency | `CurrencyPipe` | `{{ price \| currency }}` |
| `number` | Formats numbers | `DecimalPipe` | `{{ price \| number }}` |
| `percent` | Formats percentages | `PercentPipe` | `{{ percentage \| percent }}` |
| `date` | Formats dates | `DatePipe` | `{{ today \| date }}` |
| `json` | Displays an object as JSON | `JsonPipe` | `{{ customer \| json }}` |

# 1. Uppercase Pipe

The `uppercase` pipe converts text to uppercase.

```html
<p>{{ name | uppercase }}</p>
```

If:

```typescript
name = 'Siraj';
```

Output:

```text
SIRAJ
```

# 2. Lowercase Pipe

The `lowercase` pipe converts text to lowercase.

```html
<p>{{ name | lowercase }}</p>
```

Output:

```text
siraj
```

# 3. Titlecase Pipe

The `titlecase` pipe converts text to title case.

```html
<p>{{ customerName | titlecase }}</p>
```

If:

```typescript
customerName = 'siraj chaudhary';
```

Output:

```text
Siraj Chaudhary
```

# 4. Currency Pipe

The `currency` pipe formats a number as currency.

Example:

```html
<p>{{ price | currency }}</p>
```

For Indian Rupees:

```html
<p>{{ price | currency:'INR' }}</p>
```

Example:

```typescript
price = 5000;
```

The output is formatted as a currency value.

You can also specify the display format:

```html
<p>{{ price | currency:'INR':'symbol' }}</p>
```

# 5. Number Pipe

The `number` pipe formats numeric values.

In a standalone component, Angular's `number` pipe is provided by `DecimalPipe`.

```typescript
import { DecimalPipe } from '@angular/common';
```

Add it to the component imports:

```typescript
imports: [DecimalPipe]
```

Template:

```html
<p>{{ price | number }}</p>
```

You can specify minimum and maximum digits:

```html
<p>{{ price | number:'1.2-2' }}</p>
```

The format:

```text
minimumIntegerDigits.minimumFractionDigits-maximumFractionDigits
```

For example:

```text
1.2-2
```

means:

- At least 1 integer digit.
- At least 2 decimal digits.
- Maximum 2 decimal digits.

# 6. Percent Pipe

The `percent` pipe formats a number as a percentage.

```html
<p>{{ completion | percent }}</p>
```

If:

```typescript
completion = 0.75;
```

Output:

```text
75%
```

# 7. Date Pipe

The `date` pipe formats a JavaScript `Date`.

Example:

```typescript
today = new Date();
```

Template:

```html
<p>{{ today | date }}</p>
```

You can specify a format:

```html
<p>{{ today | date:'dd/MM/yyyy' }}</p>
```

Another example:

```html
<p>{{ today | date:'medium' }}</p>
```

# 8. JSON Pipe

The `json` pipe converts an object into a JSON representation.

Example:

```typescript
customer = {
  id: 1,
  name: 'Siraj',
  email: 'siraj@example.com'
};
```

Template:

```html
<pre>{{ customer | json }}</pre>
```

This is particularly useful when debugging data in a template.

# 9. Chaining Pipes

Multiple pipes can be applied to the same value.

Example:

```html
<p>{{ name | lowercase | titlecase }}</p>
```

Angular evaluates the pipes from left to right.

```text
name
 ↓
lowercase
 ↓
titlecase
 ↓
display
```

# How to Implement Pipes in the Current Application

Create/use **initial Angular project skeleton** and create the `customer` component.

```bash
ng new my-angular-application
ng g c customer
```

Then implement the pipe examples step by step.

### Step 1: Open the Customer Component

Open:

```text
src/app/customer/customer.ts
```

Update it:

```typescript
import { Component } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  JsonPipe,
  LowerCasePipe,
  PercentPipe,
  TitleCasePipe,
  UpperCasePipe
} from '@angular/common';

@Component({
  selector: 'app-customer',
  imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    JsonPipe,
    LowerCasePipe,
    PercentPipe,
    TitleCasePipe,
    UpperCasePipe
  ],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
  name = 'siraj chaudhary';
  email = 'siraj@example.com';

  price = 5000;
  completion = 0.75;

  today = new Date();

  customer = {
    id: 1,
    name: 'Siraj',
    email: 'siraj@example.com'
  };
}
```

### Step 2: Add the Customer Component to the Root Component

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

### Step 3: Render the Customer Component

Open:

```text
src/app/app.html
```

Add:

```html
<app-customer></app-customer>
```

### Step 4: Add Text Pipes

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Pipes</h2>

<h3>Text Pipes</h3>

<p>Original: {{ name }}</p>
<p>Uppercase: {{ name | uppercase }}</p>
<p>Lowercase: {{ name | lowercase }}</p>
<p>Titlecase: {{ name | titlecase }}</p>
```

### Step 5: Add Currency and Number Pipes

Add:

```html
<h3>Number Pipes</h3>

<p>Price: {{ price | currency:'INR' }}</p>

<p>Formatted Price: {{ price | number:'1.2-2' }}</p>

<p>Completion: {{ completion | percent }}</p>
```

### Step 6: Add Date Pipe

Add:

```html
<h3>Date Pipe</h3>

<p>Default Date: {{ today | date }}</p>

<p>Formatted Date: {{ today | date:'dd/MM/yyyy' }}</p>

<p>Medium Date: {{ today | date:'medium' }}</p>
```

### Step 7: Add JSON Pipe

Add:

```html
<h3>JSON Pipe</h3>

<pre>{{ customer | json }}</pre>
```

### Step 8: Add Chained Pipes

Add:

```html
<h3>Chained Pipes</h3>

<p>{{ name | lowercase | titlecase }}</p>
```

### Step 9: Complete Customer Template

The complete:

```text
src/app/customer/customer.html
```

can now be:

```html
<h2>Pipes</h2>

<h3>Text Pipes</h3>

<p>Original: {{ name }}</p>
<p>Uppercase: {{ name | uppercase }}</p>
<p>Lowercase: {{ name | lowercase }}</p>
<p>Titlecase: {{ name | titlecase }}</p>

<h3>Number Pipes</h3>

<p>Price: {{ price | currency:'INR' }}</p>

<p>Formatted Price: {{ price | number:'1.2-2' }}</p>

<p>Completion: {{ completion | percent }}</p>

<h3>Date Pipe</h3>

<p>Default Date: {{ today | date }}</p>

<p>Formatted Date: {{ today | date:'dd/MM/yyyy' }}</p>

<p>Medium Date: {{ today | date:'medium' }}</p>

<h3>JSON Pipe</h3>

<pre>{{ customer | json }}</pre>

<h3>Chained Pipes</h3>

<p>{{ name | lowercase | titlecase }}</p>
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

You should see the original values transformed by the different pipes.
<br /><br />
<img width="3840" height="1664" alt="image" src="https://github.com/user-attachments/assets/97e69b68-dd19-4357-8451-bb0cfca525e3" />

# How Pipes Work

Consider:

```html
{{ name | uppercase }}
```

The value:

```text
siraj chaudhary
```

is passed to the `uppercase` pipe:

```text
siraj chaudhary
        ↓
    uppercase
        ↓
SIRAJ CHAUDHARY
```

The pipe transforms the value for display.

The original component property remains unchanged:

```typescript
name = 'siraj chaudhary';
```

# Pipe Parameters

Some pipes accept parameters.

For example:

```html
{{ price | currency:'INR' }}
```

Here:

```text
price
  ↓
currency pipe
  ↓
INR parameter
  ↓
formatted currency
```

Another example:

```html
{{ today | date:'dd/MM/yyyy' }}
```

The date format is passed as a parameter to the pipe.

# Pipe vs Component vs Service

| Component | Service | Pipe |
|---|---|---|
| Handles UI | Handles reusable logic | Transforms display values |
| Has a template | Normally no template | Used in templates |
| Uses `@Component` | Uses `@Injectable` | Uses `@Pipe` |
| Handles user interaction | Handles business/application logic | Handles presentation transformation |
| Example: `Customer` | Example: `CustomerService` | Example: `uppercase` |

# Built-in Pipes vs Custom Pipes

Angular provides many built-in pipes.

Examples:

```text
uppercase
lowercase
titlecase
currency
number
percent
date
json
```

You can also create your own custom pipe when the required transformation is not provided by Angular.

# Custom Pipes

A custom pipe can encapsulate a reusable presentation transformation.

For example, we could create a pipe that converts a customer name into a custom display format.

Create a pipe:

```bash
ng g pipe pipes/customer-name
```

The CLI creates:

```text
src/app/pipes/
├── customer-name.ts
└── customer-name.spec.ts
```

Open:

```text
src/app/pipes/customer-name.ts
```

Example:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerName'
})
export class CustomerNamePipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
```

Import the pipe into the standalone component:

```typescript
import { CustomerNamePipe } from '../pipes/customer-name';

@Component({
  selector: 'app-customer',
  imports: [CustomerNamePipe],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
  name = 'siraj chaudhary';
}
```

Use the custom pipe:

```html
<p>{{ name | customerName }}</p>
```

Output:

```text
SIRAJ CHAUDHARY
```

# Practical Project Structure

After implementing this lesson:

```text
my-angular-application/
├── public/
│
├── src/
│   ├── app/
│   │   ├── pipes/
│   │   │   ├── customer-name.ts
│   │   │   └── customer-name.spec.ts
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

| Pipe | Purpose | Angular Class | Example |
|---|---|---|---|
| `uppercase` | Uppercase text | `UpperCasePipe` | `{{ name \| uppercase }}` |
| `lowercase` | Lowercase text | `LowerCasePipe` | `{{ name \| lowercase }}` |
| `titlecase` | Title case text | `TitleCasePipe` | `{{ name \| titlecase }}` |
| `currency` | Format currency | `CurrencyPipe` | `{{ price \| currency:'INR' }}` |
| `number` | Format numbers | `DecimalPipe` | `{{ price \| number:'1.2-2' }}` |
| `percent` | Format percentages | `PercentPipe` | `{{ completion \| percent }}` |
| `date` | Format dates | `DatePipe` | `{{ today \| date:'dd/MM/yyyy' }}` |
| `json` | Display object as JSON | `JsonPipe` | `{{ customer \| json }}` |
| Custom pipe | Custom transformation | Custom pipe class | `{{ name \| customerName }}` |

# Key Takeaways

- Pipes transform values for display in Angular templates.
- Pipes do not normally change the original component property.
- Angular provides many built-in pipes.
- Pipes can accept parameters.
- Multiple pipes can be chained together.
- Custom pipes can be created for reusable presentation transformations.
- Standalone components import the pipes they use directly.
- The `number` pipe is provided by Angular's `DecimalPipe`.
- Pipes should generally focus on presentation transformation rather than business logic.
