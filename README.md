# Lesson 19 — Bootstrap Integration

# What Is Bootstrap

Bootstrap is an open-source frontend toolkit for building responsive web applications.

It provides ready-to-use CSS classes, layout utilities, and UI styles so developers can build common interfaces without writing all CSS from scratch.

### Key Points

- Originally created at Twitter in 2010.
- Publicly released as an open-source project in 2011.
- Developed and maintained as an open-source project.
- Licensed under the MIT License.
- Free to use for personal and commercial applications.
- Current stable major version is Bootstrap 5.
- Uses HTML, CSS, JavaScript and Sass.
- Provides a responsive grid system.
- Provides reusable CSS classes for common UI requirements.
- Can be used with Angular, React, Vue, or plain HTML applications.
- Bootstrap is not an Angular framework.
- Angular handles application behavior; Bootstrap primarily handles styling and layout.

# Bootstrap vs Other Popular Options for Angular

| Technology | Type | Angular Usage | Open Source | Main Strength |
|---|---|---|---|---|
| Bootstrap | CSS/UI toolkit | Excellent | Yes | Simple responsive UI and CSS utilities |
| Angular Material | Angular component library | Excellent | Yes | Angular-native Material Design components |
| PrimeNG | Angular component library | Excellent | Yes | Large collection of ready-made UI components |
| Tailwind CSS | Utility-first CSS framework | Excellent | Yes | Highly customizable UI using utility classes |
| NG-ZORRO | Angular component library | Excellent | Yes | Enterprise UI based on Ant Design |

Bootstrap is particularly useful when you want simple, familiar CSS classes and responsive layouts without adopting a complete Angular component library.

Angular Material and PrimeNG are more component-oriented, while Tailwind takes a utility-first approach.

# Integrating Bootstrap with Angular

In this example, we will add Bootstrap to an Angular application and use it to style a Registration component.

### Step 1 — Create the Registration Component


```bash
ng g c registration
```

### Step 2 — Install Bootstrap

```bash
npm install bootstrap
```

### Step 3 — Add Bootstrap CSS

Open:

```text
angular.json
```

Find the `styles` section and add Bootstrap before the application's own stylesheet:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
```

This makes Bootstrap's CSS available throughout the Angular application.

### Step 4 — Restart Angular

If the development server is running, stop it:

```text
Ctrl + C
```

Start it again:

```bash
ng serve
```

### Step 5 — Update the Registration Component

Open:

```text
src/app/registration/registration.ts
```

Use:

```typescript
import {
  Component
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {

  firstName = '';

  lastName = '';

  email = '';

  password = '';

  register(): void {

    console.log({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });

  }

}
```

### Step 6 — Create the Registration Form

Open:

```text
src/app/registration/registration.html
```

Use:

```html
<div class="container mt-5">

  <div class="row justify-content-center">

    <div class="col-md-8 col-lg-6">

      <div class="card shadow">

        <div class="card-body p-4">

          <h2 class="text-center mb-4">
            Registration
          </h2>

          <form
            (ngSubmit)="register()">

            <div class="row">

              <div class="col-md-6 mb-3">

                <label
                  for="firstName"
                  class="form-label">

                  First Name

                </label>

                <input
                  id="firstName"
                  type="text"
                  class="form-control"
                  name="firstName"
                  [(ngModel)]="firstName"
                  required
                />

              </div>

              <div class="col-md-6 mb-3">

                <label
                  for="lastName"
                  class="form-label">

                  Last Name

                </label>

                <input
                  id="lastName"
                  type="text"
                  class="form-control"
                  name="lastName"
                  [(ngModel)]="lastName"
                  required
                />

              </div>

            </div>

            <div class="mb-3">

              <label
                for="email"
                class="form-label">

                Email

              </label>

              <input
                id="email"
                type="email"
                class="form-control"
                name="email"
                [(ngModel)]="email"
                required
              />

            </div>

            <div class="mb-3">

              <label
                for="password"
                class="form-label">

                Password

              </label>

              <input
                id="password"
                type="password"
                class="form-control"
                name="password"
                [(ngModel)]="password"
                required
              />

            </div>

            <button
              type="submit"
              class="btn btn-primary w-100">

              Register

            </button>

          </form>

        </div>

      </div>

    </div>

  </div>

</div>
```

### Step 7 — Display the Registration Component

Open:

```text
src/app/app.ts
```

Import the component:

```typescript
import {
  Registration
} from './registration/registration';
```

Add it to the component imports:

```typescript
@Component({
  selector: 'app-root',
  imports: [Registration],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
```

### Step 8 — Add the Component to the Application

Open:

```text
src/app/app.html
```

Use:

```html
<app-registration></app-registration>
```

### Step 9 — Run the Application

Run:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

The Registration component should now display using Bootstrap styling.
<br /><br />
<img width="3840" height="1342" alt="image" src="https://github.com/user-attachments/assets/14407999-6129-4ec9-a4b8-b409d4501eb6" />

# What We Used From Bootstrap

The example uses only a few Bootstrap classes to demonstrate the integration.

```text
container
row
col-md-6
col-md-8
col-lg-6
card
card-body
form-label
form-control
btn
btn-primary
mt-5
mb-3
mb-4
p-4
w-100
```

The important point is that Angular does not know or care that these are Bootstrap classes.

Angular handles:

```html
[(ngModel)]="email"
```

and:

```html
(ngSubmit)="register()"
```

Bootstrap handles:

```html
class="form-control"
```

and:

```html
class="btn btn-primary"
```

So the relationship is:

```text
Angular
  ↓
Application behavior
Components
Forms
Data binding
Events

Bootstrap
  ↓
Styling
Layout
Responsive design
UI appearance
```

# Bootstrap Integration Flow

The basic process is:

```text
Create Angular Application
        ↓
Install Bootstrap
        ↓
Configure Bootstrap CSS
        ↓
Restart Angular
        ↓
Use Bootstrap classes
        ↓
Build Angular UI
```

# Key Takeaways

- Bootstrap is an open-source frontend toolkit.
- Bootstrap is free for commercial and personal use under the MIT License.
- Bootstrap is not an Angular-specific framework.
- It can be integrated into Angular through npm.
- Bootstrap provides responsive layouts and ready-to-use CSS classes.
- Angular continues to handle components, forms, events, data binding, routing, and application logic.
- Bootstrap handles styling and layout.
- The same Bootstrap classes can be used directly inside Angular templates.
- A Bootstrap integration does not require replacing Angular's component architecture.