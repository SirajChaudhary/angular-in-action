# Lesson 4 — Project Structure

# Create an Angular 21 Application

Use Angular CLI to create a new Angular application.

```bash
ng new my-angular-application
```

Recommended choices:

| Option | Choice |
|---|---|
| Routing | Yes |
| Stylesheet | CSS |
| SSR/SSG | No |

Keep the other options at their Angular CLI defaults unless we specifically need to change them.

Angular CLI creates the workspace and initial application structure.

# Run the Application

Move into the application directory:

```bash
cd my-angular-application
```

Start the development server:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

# Project Structure

```text
my-angular-application/
├── public/                         # Static assets served directly by the application
│
├── src/                            # Application source code
│   ├── app/                        # Angular components, configuration and application logic
│   │   ├── app.ts                  # Root application component
│   │   ├── app.html                # Root component template
│   │   ├── app.css                 # Root component styles
│   │   ├── app.config.ts           # Application-wide configuration and providers
│   │   └── app.routes.ts           # Application routing configuration
│   │
│   ├── index.html                  # Main HTML page loaded by the browser
│   ├── main.ts                     # Angular application entry point
│   └── styles.css                  # Global application styles
│
├── .editorconfig                   # Editor formatting settings
├── .gitignore                      # Files and folders ignored by Git
├── angular.json                    # Angular CLI workspace configuration
├── package.json                    # Project metadata, scripts and NPM dependencies
├── package-lock.json               # Exact dependency versions installed by NPM
├── tsconfig.json                   # Base TypeScript configuration
├── tsconfig.app.json               # Application TypeScript configuration
├── tsconfig.spec.json              # Test TypeScript configuration
└── README.md                       # Project documentation
```

# public

```text
public/
```

- Contains static assets served directly by the application.
- Files placed here do not require Angular compilation.

Example:

```text
public/
└── favicon.ico
```

# src

```text
src/
```

- Contains the application's source code.
- Most Angular development takes place inside this directory.

# src/app

```text
src/app/
```

- Contains Angular components, application configuration and application-specific logic.
- As the application grows, this directory will contain folders such as `core`, `features` and `shared`.

# app.ts

```text
src/app/app.ts
```

- Defines the root application component.
- Contains the component metadata and TypeScript logic.

Example:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
```

# app.html

```text
src/app/app.html
```

- Contains the HTML template rendered by the root `App` component.

The root component is connected to the browser through:

```html
<app-root></app-root>
```

# app.css

```text
src/app/app.css
```

- Contains styles specific to the root `App` component.

# app.config.ts

```text
src/app/app.config.ts
```

- Contains application-wide Angular configuration and providers.
- Used to configure features such as routing, HTTP and other providers.

# app.routes.ts

```text
src/app/app.routes.ts
```

- Defines the application's routing configuration.
- Contains routes that map URLs to Angular components.

Example:

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [];
```

# index.html

```text
src/index.html
```

- Main HTML document loaded by the browser.
- Contains the root Angular element.

Example:

```html
<body>
  <app-root></app-root>
</body>
```

Angular renders the root `App` component inside `<app-root>`.

# main.ts

```text
src/main.ts
```

- Application entry point.
- Bootstraps the root Angular component.

Typical structure:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

Application startup flow:

```text
main.ts
   ↓
bootstrapApplication()
   ↓
App
   ↓
app.html
```

# styles.css

```text
src/styles.css
```

- Contains global application styles.
- Styles defined here can be used across the application.

# angular.json

```text
angular.json
```

- Contains Angular CLI workspace configuration.
- Controls settings related to building, serving, testing and other CLI operations.

# package.json

```text
package.json
```

- Contains project metadata.
- Defines NPM dependencies and development dependencies.
- Contains project scripts.

Example:

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test"
  }
}
```

# package-lock.json

```text
package-lock.json
```

- Records the exact dependency versions installed by NPM.
- Helps ensure consistent dependency installation.

# tsconfig.json

```text
tsconfig.json
```

- Base TypeScript compiler configuration.
- Provides common TypeScript settings used by the application and test configurations.

# tsconfig.app.json

```text
tsconfig.app.json
```

- Contains TypeScript compiler settings specific to application code.

# tsconfig.spec.json

```text
tsconfig.spec.json
```

- Contains TypeScript compiler settings used for test files.

# .gitignore

```text
.gitignore
```

- Specifies files and directories that Git should not track.

Common examples include:

```text
node_modules/
dist/
```

# .editorconfig

```text
.editorconfig
```

- Defines common editor settings.
- Helps maintain consistent formatting across different editors.

# README.md

```text
README.md
```

- Contains project documentation.
- Can describe the application, setup instructions, commands and project information.

# Recommended Angular Application Organization

As the application grows, organize code by **feature and responsibility**.

```text
src/
└── app/
    ├── core/                       # Application-wide services, guards, interceptors and configuration
    │   ├── guards/                 # Route guards used across the application
    │   ├── interceptors/           # HTTP interceptors used across the application
    │   └── services/               # Application-wide services
    │
    ├── features/                   # Business features and feature-specific functionality
    │   ├── customers/              # Customer feature
    │   ├── products/               # Product feature
    │   └── orders/                 # Order feature
    │
    ├── shared/                     # Reusable functionality shared across features
    │   ├── components/             # Reusable UI components
    │   ├── directives/             # Reusable custom directives
    │   ├── pipes/                  # Reusable custom pipes
    │   └── models/                 # Shared interfaces and type definitions
    │
    ├── app.ts                      # Root application component
    ├── app.html                    # Root component template
    ├── app.css                     # Root component styles
    ├── app.config.ts               # Application-wide configuration and providers
    └── app.routes.ts               # Application routing configuration
```

# core

```text
core/
```

- Contains application-wide functionality used across multiple features.

Typical structure:

```text
core/
├── guards/                         # Route guards used across the application
├── interceptors/                   # HTTP interceptors used across the application
└── services/                       # Application-wide services
```

Examples:

- Authentication services
- Route guards
- HTTP interceptors
- Application-wide services

# features

```text
features/
```

- Contains functionality organized by business or application feature.

Example:

```text
features/
├── customers/                      # Customer-related functionality
├── products/                       # Product-related functionality
└── orders/                         # Order-related functionality
```

A customer feature can contain its related components:

```text
features/
└── customers/
    ├── customer-list/              # Customer list functionality
    ├── customer-detail/            # Customer detail functionality
    └── customer-form/              # Customer form functionality
```

# shared

```text
shared/
```

- Contains reusable functionality shared by multiple features.

Example:

```text
shared/
├── components/                     # Reusable UI components
├── directives/                     # Reusable custom directives
├── pipes/                          # Reusable custom pipes
└── models/                         # Shared interfaces and type definitions
```

# Naming Conventions

Use consistent naming throughout the application.

| Item | Convention | Example |
|---|---|---|
| Component | kebab-case | `customer-list` |
| Service | kebab-case | `customer-service` |
| Directive | kebab-case | `highlight` |
| Pipe | kebab-case | `full-name` |
| Guard | kebab-case | `auth-guard` |
| Interceptor | kebab-case | `auth-interceptor` |
| Folder | kebab-case | `customer-list` |
| Class | PascalCase | `CustomerService` |
| Interface | PascalCase | `Customer` |

Examples:

```text
customer-list/
customer-service.ts
auth-guard.ts
auth-interceptor.ts
full-name.ts
```

# Quick Revision

| Item | Purpose |
|---|---|
| `public/` | Static assets |
| `src/` | Application source code |
| `src/app/` | Angular application code |
| `app.ts` | Root component |
| `app.html` | Root component template |
| `app.css` | Root component styles |
| `app.config.ts` | Application configuration |
| `app.routes.ts` | Routing configuration |
| `main.ts` | Application entry point |
| `index.html` | Main browser HTML |
| `styles.css` | Global styles |
| `angular.json` | Angular CLI configuration |
| `package.json` | Project metadata and dependencies |
| `package-lock.json` | Exact dependency versions |
| `tsconfig.json` | Base TypeScript configuration |
| `core/` | Application-wide functionality |
| `features/` | Feature-specific functionality |
| `shared/` | Reusable functionality |

# Key Takeaways

- `src/` contains the application source code.
- `src/app/` contains Angular application code.
- `main.ts` is the application entry point.
- `app.ts` is the root component.
- `app.config.ts` contains application-wide configuration.
- `app.routes.ts` contains routing configuration.
- `features/` organizes business features.
- `core/` contains application-wide functionality.
- `shared/` contains reusable functionality.
- Consistent naming and organization make Angular applications easier to maintain.
