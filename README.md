# Lesson 5 — Components

# What is a Component

A component is the basic building block of an Angular application.

A component controls a portion of the application's user interface.

A component generally consists of:

| File | Purpose |
|---|---|
| `.ts` | Component logic and metadata |
| `.html` | Component template |
| `.css` | Component-specific styles |
| `.spec.ts` | Component tests |

Example:

```text
customer/
├── customer.ts
├── customer.html
├── customer.css
└── customer.spec.ts
```

# Component Architecture

```text
Component
├── TypeScript
│   ├── State
│   └── Business logic
│
├── HTML
│   └── User interface
│
├── CSS
│   └── Component styles
│
└── Tests
    └── Component tests
```

# Component Metadata

The `@Component` decorator provides Angular with information about the component.

```typescript
@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
```

| Property | Purpose |
|---|---|
| `selector` | Defines the HTML element used to render the component |
| `imports` | Defines dependencies used by the component |
| `templateUrl` | Points to the component HTML template |
| `styleUrl` | Points to the component stylesheet |

# Selector

The `selector` defines how the component is used in HTML.

```typescript
@Component({
  selector: 'app-customer'
})
export class Customer {
}
```

The component can then be rendered using:

```html
<app-customer></app-customer>
```

# Template

The template defines the component's UI.

## External Template

A template can be stored in a separate HTML file.

```typescript
@Component({
  selector: 'app-customer',
  templateUrl: './customer.html'
})
export class Customer {
  name = 'Siraj';
}
```

Template:

```html
<h2>Customer</h2>

<p>{{ name }}</p>
```

The component class provides the data and the template displays it.

## Inline Template

A template can also be defined directly inside the component.

```typescript
@Component({
  selector: 'app-customer',
  template: `
    <h2>Customer</h2>
    <p>{{ name }}</p>
  `
})
export class Customer {
  name = 'Siraj';
}
```

For larger components, an external HTML file is generally easier to maintain.

# Component Styles

Styles can be defined in a separate file.

```typescript
@Component({
  selector: 'app-customer',
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
}
```

Example:

```css
h2 {
  font-size: 24px;
}
```

## Inline Styles

Styles can also be defined directly inside the component.

```typescript
@Component({
  selector: 'app-customer',
  template: `<h2>Customer</h2>`,
  styles: `
    h2 {
      font-size: 24px;
    }
  `
})
export class Customer {
}
```

For larger components, external stylesheets are generally easier to maintain.

# Standalone Components

Modern Angular uses standalone components.

A standalone component does not need to be declared inside an `NgModule`.

Example:

```typescript
@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
}
```

Angular 21 applications use the modern standalone approach.

# Component Imports

A component can import Angular features or other standalone components directly.

Example:

```typescript
import { Component } from '@angular/core';
import { CustomerCard } from '../customer-card/customer-card';

@Component({
  selector: 'app-customer-list',
  imports: [CustomerCard],
  templateUrl: './customer-list.html'
})
export class CustomerList {
}
```

The imported component can then be used in the template:

```html
<app-customer-card></app-customer-card>
```

# Recommended Component Organization

For a small example, a component can be created directly under `src/app`.

For a real application, components should generally be organized by feature.

Recommended structure:

```text
src/app/
├── core/                       # Application-wide functionality
├── features/                   # Feature-specific functionality
│   └── customers/              # Customer feature
└── shared/                     # Reusable functionality
    └── components/             # Reusable components
```

Feature-specific components can be organized like:

```text
features/
└── customers/
    ├── customer-list/
    ├── customer-detail/
    └── customer-form/
```

Reusable components shared by multiple features should be placed under:

```text
shared/components/
```

# How to Create a Component in the Current Application

We will create a `customer` component and render it from the root component.

### Step 1: Create the Component

From the project root:

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

### Step 2: Add the Component to the Root Component

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

### Step 3: Render the Component

Open:

```text
src/app/app.html
```

Add:

```html
<h1>My Angular Application</h1>

<app-customer></app-customer>
```

### Step 4: Add Component Logic

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

  getCustomerName(): string {
    return this.name;
  }
}
```

### Step 5: Update the Component Template

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
```

### Step 6: Add Component Styles

Open:

```text
src/app/customer/customer.css
```

Add:

```css
h2 {
  margin-bottom: 8px;
}

p {
  margin: 4px 0;
}
```

### Step 7: Run the Application

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
My Angular Application

Customer Details
Name: Siraj
Email: siraj@example.com
Customer: Siraj
```

### Step 8: Verify the Structure

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
    └── customer.spec.ts
```

<img width="3840" height="676" alt="image" src="https://github.com/user-attachments/assets/1879209f-5e47-4d1e-8729-cc3ad3b28381" />

# Component Flow

The application now has this structure:

```text
App
 │
 └── Customer
      ├── customer.ts
      ├── customer.html
      └── customer.css
```

Rendering flow:

```text
app.html
   ↓
<app-customer>
   ↓
Customer component
   ↓
customer.html
   ↓
Customer template rendered
```

# Component Best Practices

- Use Angular CLI to generate components.
- Keep component files together in their component folder.
- Organize feature-specific components under `features/`.
- Place reusable components under `shared/components/`.
- Use meaningful component names.
- Prefer external templates and stylesheets for larger components.
- Keep component classes focused on UI-related behavior.
- Keep reusable or complex business logic in services.
- Keep component templates reasonably small.
- Use standalone components and direct `imports` in modern Angular applications.

# Quick Revision

| Concept | Example |
|---|---|
| Generate component | `ng g c customer` |
| Component class | `export class Customer {}` |
| Component decorator | `@Component({...})` |
| Selector | `app-customer` |
| External template | `templateUrl: './customer.html'` |
| Inline template | `template: \`...\`` |
| External styles | `styleUrl: './customer.css'` |
| Inline styles | `styles: \`...\`` |
| Component imports | `imports: [CustomerCard]` |
| Render component | `<app-customer></app-customer>` |
| Standalone component | Modern Angular component |

# Key Takeaways

- Components are the basic building blocks of Angular applications.
- A component contains TypeScript, a template and styles.
- `@Component` defines Angular component metadata.
- The selector determines how a component is rendered.
- Templates can be external or inline.
- Styles can be external or inline.
- External templates and stylesheets are generally easier to maintain for larger components.
- Modern Angular uses standalone components.
- Standalone components can directly import other components and Angular features.
- Feature-specific components should be organized under `features/`.
- Reusable components should be placed under `shared/components/`.
