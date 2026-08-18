# Lesson 8 — Directives

# What are Directives

Directives are classes that add behavior to elements or components.

Angular directives can be used to:

- Change the appearance of an element.
- Add behavior to an element.
- Manipulate element properties.
- Respond to user interactions.
- Reuse UI behavior across multiple elements.

# Types of Directives

1. Attribute directives
2. Structural directives
3. Component directives

| Type | Purpose | Example |
|---|---|---|
| Attribute directive | Change appearance or behavior | `ngClass`, `ngStyle` |
| Structural directive | Add/remove/repeat template content | `*ngIf`, `*ngFor` |
| Component | Directive with its own template | `@Component` |

Angular 21 also provides the modern built-in control-flow syntax such as:

```text
@if
@for
@switch
```

These are the modern replacement for many common structural-directive use cases.

# 1. Attribute Directives

Attribute directives change the behavior or appearance of an existing element.

Examples include:

```html
<div [ngClass]="..."></div>
```

and:

```html
<div [ngStyle]="..."></div>
```

An attribute directive does not normally create its own template.

It operates on an existing element.

# 2. Structural Directives

Structural directives change the structure of the DOM by adding or removing elements.

Traditional Angular examples include:

```html
<div *ngIf="isActive">
  Active Customer
</div>
```

and:

```html
<div *ngFor="let customer of customers">
  {{ customer.name }}
</div>
```

However, modern Angular applications use the built-in control-flow syntax:

```html
@if (isActive) {
  <div>Active Customer</div>
}
```

and:

```html
@for (customer of customers; track customer.id) {
  <div>{{ customer.name }}</div>
}
```

For new Angular 21 applications, prefer the modern control-flow syntax.

# 3. Component Directives

A component is a specialized type of directive that has its own template.

Example:

```typescript
@Component({
  selector: 'app-customer',
  templateUrl: './customer.html'
})
export class Customer {
}
```

A component represents a reusable UI feature, while an attribute directive enhances an existing element or component.

# How to Implement a Custom Directive in the Current Application

Create/use **initial Angular project skeleton** and create the `highlight` directive.

```bash
ng new my-angular-application
ng g directive directives/highlight
```

The CLI creates:

```text
src/app/directives/
├── highlight.ts
└── highlight.spec.ts
```

Then implement the directive step by step.

### Step 1: Open the Highlight Directive

Open:

```text
src/app/directives/highlight.ts
```

Update it:

```typescript
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {
  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.elementRef.nativeElement.style.backgroundColor = '';
  }
}
```

The selector:

```typescript
selector: '[appHighlight]'
```

means the directive can be used as an HTML attribute:

```html
<p appHighlight>
  Customer
</p>
```

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

### Step 3: Import the Directive

Open:

```text
src/app/customer/customer.ts
```

Update it:

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
}
```

Because this is a standalone component, the directive is imported directly into the component.

### Step 4: Use the Directive

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Directives</h2>

<p appHighlight>
  Move the mouse over this text.
</p>

<button appHighlight>
  Move the mouse over this button.
</button>
```

The same directive can now be reused on different elements.

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

Move the mouse over:

```text
Move the mouse over this text.
```

The background should change to yellow.

Move the mouse away and the background should return to normal.

<img width="3840" height="498" alt="Directive highlight example" src="https://github.com/user-attachments/assets/166ea015-a546-45ed-842e-a910786d1896" />

# How the Custom Directive Works

The directive:

```typescript
@Directive({
  selector: '[appHighlight]'
})
```

defines the directive.

The selector:

```text
[appHighlight]
```

matches elements containing the `appHighlight` attribute.

For example:

```html
<p appHighlight>
```

Angular attaches the directive to that `<p>` element.

# HostListener

The directive uses:

```typescript
@HostListener('mouseenter')
```

to listen for the host element's `mouseenter` event.

When the event occurs:

```typescript
onMouseEnter(): void {
  this.elementRef.nativeElement.style.backgroundColor = 'yellow';
}
```

When the mouse leaves:

```typescript
@HostListener('mouseleave')
```

Angular calls:

```typescript
onMouseLeave(): void {
  this.elementRef.nativeElement.style.backgroundColor = '';
}
```

# ElementRef

`ElementRef` provides access to the DOM element associated with the directive.

Example:

```typescript
constructor(private elementRef: ElementRef) {}
```

The host element can then be accessed through:

```typescript
this.elementRef.nativeElement
```

For example:

```typescript
this.elementRef.nativeElement.style.backgroundColor = 'yellow';
```

For simple DOM behavior this demonstrates the concept clearly, although Angular's template bindings and renderer-based approaches are generally preferable to direct DOM manipulation when practical.

# Directive vs Component

| Component | Directive |
|---|---|
| Has its own template | Does not require its own template |
| Defines a UI component | Adds behavior or appearance |
| Uses `@Component` | Uses `@Directive` |
| Usually represents a UI feature | Usually enhances an existing element |
| Example: `Customer` | Example: `Highlight` |

A component is technically a specialized type of directive that has a template.

# Directive Selector

Our directive uses:

```typescript
selector: '[appHighlight]'
```

Therefore:

```html
<p appHighlight>
```

works.

The square brackets in the selector indicate that Angular is matching an attribute.

A directive can also use other selector forms, but attribute selectors are commonly used for custom behavior directives.

# Reusing a Directive

One of the main benefits of a directive is reuse.

The same directive can be applied to multiple elements:

```html
<p appHighlight>
  Customer Name
</p>

<p appHighlight>
  Customer Email
</p>

<button appHighlight>
  Select Customer
</button>
```

All three elements use the same directive implementation.

# Practical Project Structure

After implementing this lesson:

```text
my-angular-application/
├── public/
│
├── src/
│   ├── app/
│   │   ├── directives/
│   │   │   ├── highlight.ts
│   │   │   └── highlight.spec.ts
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
| Attribute directive | Change behavior/appearance | `[ngClass]` |
| Structural directive | Change template structure | `*ngIf`, `*ngFor` |
| Modern control flow | Modern template control flow | `@if`, `@for` |
| Custom directive | Create reusable behavior | `[appHighlight]` |
| `@Directive` | Define a directive | `@Directive({...})` |
| `selector` | Define where directive applies | `[appHighlight]` |
| `HostListener` | Listen to host events | `@HostListener('mouseenter')` |
| `ElementRef` | Access host element | `elementRef.nativeElement` |

# Key Takeaways

- Directives add behavior or appearance to existing elements.
- Attribute directives work with existing elements.
- Structural directives change the structure of the DOM.
- Angular 21 provides modern control flow such as `@if` and `@for`.
- Custom directives are created using `@Directive`.
- A directive is reusable across multiple elements.
- Standalone components import the directives they use directly.
- `@HostListener` can be used to respond to host element events.
- `ElementRef` provides access to the directive's host element.
