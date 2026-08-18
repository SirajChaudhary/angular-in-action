# Lesson 11 — Routing & Navigation

# What is Angular Routing

Angular Routing allows an application to display different components based on the current URL.

For example:

```text
/customers
/customers/1
/about
```

Each URL can be mapped to a different Angular component.

Routing allows Angular applications to behave like single-page applications while navigating between different views.

# Why Routing is Used

Routing is commonly used to:

- Navigate between application views.
- Create URLs for different features.
- Display different components based on the URL.
- Pass parameters through URLs.
- Support browser navigation.
- Enable programmatic navigation.

A typical Angular application can have:

```text
Application
├── Home
├── Customers
├── Customer Details
└── About
```

Each view can have its own route.

# Routes

A route defines the relationship between a URL path and a component.

Example:

```typescript
{
  path: 'customers',
  component: Customer
}
```

This means:

```text
/customers
      ↓
Customer component
```

# RouterOutlet

`RouterOutlet` is the location where Angular renders the component associated with the current route.

Example:

```html
<router-outlet></router-outlet>
```

If the current URL is:

```text
/customers
```

Angular renders the component configured for the `customers` route inside the `router-outlet`.

# RouterLink

`RouterLink` is used to navigate between routes from an Angular template.

Example:

```html
<a routerLink="/customers">Customers</a>
```

Clicking the link navigates to:

```text
/customers
```

Angular performs the navigation without requiring a full browser page reload.

# RouterLinkActive

`RouterLinkActive` can be used to apply a CSS class to the active navigation link.

Example:

```html
<a
  routerLink="/customers"
  routerLinkActive="active">
  Customers
</a>
```

When `/customers` is the active route, Angular applies:

```text
active
```

to the link.

# How to Implement Routing in the Current Application

Create/use **initial Angular project skeleton** and create the `home`, `customer`, and `about` components.

```bash
ng new my-angular-application
ng g c home
ng g c customer
ng g c about
```

Then implement routing step by step.

### Step 1: Open the Application Routes

Open:

```text
src/app/app.routes.ts
```

Update it:

```typescript
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Customer } from './customer/customer';
import { About } from './about/about';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'customers',
    component: Customer
  },
  {
    path: 'about',
    component: About
  }
];
```

The routes now define:

```text
/            → Home
/customers   → Customer
/about       → About
```

### Step 2: Configure the Root Component

Open:

```text
src/app/app.ts
```

Update it:

```typescript
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-application');
}
```

The standalone root component imports the routing features it uses.

### Step 3: Add RouterOutlet and Navigation Links

Open:

```text
src/app/app.html
```

Update it:

```html
<h1>My Angular Application</h1>

<nav>
  <a
    routerLink="/"
    routerLinkActive="active"
    [routerLinkActiveOptions]="{ exact: true }">
    Home
  </a>

  <a
    routerLink="/customers"
    routerLinkActive="active">
    Customers
  </a>

  <a
    routerLink="/about"
    routerLinkActive="active">
    About
  </a>
</nav>

<router-outlet></router-outlet>
```

The navigation links change the URL.

The `router-outlet` displays the component associated with the current route.

### Step 4: Add Home Content

Open:

```text
src/app/home/home.html
```

Add:

```html
<h2>Home</h2>

<p>Welcome to My Angular Application.</p>
```

### Step 5: Add Customer Content

Open:

```text
src/app/customer/customer.html
```

Add:

```html
<h2>Customers</h2>

<p>Customer list goes here.</p>
```

### Step 6: Add About Content

Open:

```text
src/app/about/about.html
```

Add:

```html
<h2>About</h2>

<p>This application demonstrates Angular routing.</p>
```

### Step 7: Add Active Link Styling

Open:

```text
src/app/app.css
```

Add:

```css
nav {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
}

nav a.active {
  font-weight: bold;
}
```

### Step 8: Run the Application

From the project root:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

Click:

```text
Home
Customers
About
```

The URL and displayed component should change without a full page reload.
<br /><br />
<img width="3840" height="686" alt="image" src="https://github.com/user-attachments/assets/408bb18b-03be-4094-965d-7ea87e8d254a" />

# Route Parameters

Routes can contain parameters.

For example:

```typescript
{
  path: 'customers/:id',
  component: Customer
}
```

The `:id` represents a route parameter.

Examples:

```text
/customers/1
/customers/2
/customers/10
```

All of these URLs match the same route.

The value of `id` changes.

# How to Add a Route Parameter

Open:

```text
src/app/app.routes.ts
```

Update the customer route:

```typescript
{
  path: 'customers/:id',
  component: Customer
}
```

The route now expects a customer ID.

For example:

```text
/customers/101
```

matches:

```text
customers/:id
```

with:

```text
id = 101
```

# Reading Route Parameters

Angular provides `ActivatedRoute` for accessing route information.

Open:

```text
src/app/customer/customer.ts
```

Example:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer implements OnInit {

  customerId = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
```

The parameter can then be displayed in the template:

```html
<h2>Customer Details</h2>

<p>Customer ID: {{ customerId }}</p>
```

For:

```text
/customers/101
```

the output is:

```text
Customer ID: 101
```

# Programmatic Navigation

Angular also allows navigation from TypeScript code.

Use the `Router` service.

Example:

```typescript
import { Router } from '@angular/router';
```

Inject it:

```typescript
constructor(private router: Router) {
}
```

Navigate programmatically:

```typescript
this.router.navigate(['/customers']);
```

For a customer ID:

```typescript
this.router.navigate(['/customers', 101]);
```

This navigates to:

```text
/customers/101
```

# Navigation Flow

Angular routing works conceptually like this:

```text
User clicks link
       ↓
RouterLink
       ↓
Angular Router
       ↓
Route matching
       ↓
Component
       ↓
RouterOutlet
```

For programmatic navigation:

```text
Component
    ↓
Router
    ↓
Route matching
    ↓
RouterOutlet
```

# Route vs RouterLink vs RouterOutlet

| Feature | Purpose | Example |
|---|---|---|
| Route | Maps URL to component | `path: 'customers'` |
| RouterLink | Navigates from template | `routerLink="/customers"` |
| RouterOutlet | Displays routed component | `<router-outlet>` |
| RouterLinkActive | Styles active route | `routerLinkActive="active"` |
| Router | Navigates from TypeScript | `router.navigate()` |
| ActivatedRoute | Reads route information | `route.snapshot.paramMap` |

# Practical Project Structure

After implementing this lesson:

```text
my-angular-application/
├── public/
│
├── src/
│   ├── app/
│   │   ├── home/
│   │   │   ├── home.ts
│   │   │   ├── home.html
│   │   │   ├── home.css
│   │   │   └── home.spec.ts
│   │   │
│   │   ├── customer/
│   │   │   ├── customer.ts
│   │   │   ├── customer.html
│   │   │   ├── customer.css
│   │   │   └── customer.spec.ts
│   │   │
│   │   ├── about/
│   │   │   ├── about.ts
│   │   │   ├── about.html
│   │   │   ├── about.css
│   │   │   └── about.spec.ts
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
| Route | Maps URL to component | `path: 'customers'` |
| RouterOutlet | Displays routed component | `<router-outlet>` |
| RouterLink | Template navigation | `routerLink="/customers"` |
| RouterLinkActive | Active link styling | `routerLinkActive="active"` |
| Route parameter | Passes values through URL | `customers/:id` |
| ActivatedRoute | Reads route information | `paramMap.get('id')` |
| Router | Programmatic navigation | `router.navigate()` |

# Key Takeaways

- Angular Router maps URLs to components.
- `Routes` defines the application's routes.
- `RouterOutlet` displays the active routed component.
- `RouterLink` provides navigation from templates.
- `RouterLinkActive` identifies the active navigation link.
- Route parameters allow values to be passed through URLs.
- `ActivatedRoute` can be used to read route parameters.
- `Router` can be used for programmatic navigation.
- Angular routing allows navigation between views without a full page reload.
