# Lesson 1 — Angular Theory & Fundamentals

# What is Angular

Angular is a TypeScript-based web application framework developed and maintained by Google.

- Used to build modern web applications.
- Primarily used for Single Page Applications (SPAs).
- Provides a complete application development framework.
- Uses a component-based architecture.
- Provides built-in support for routing, forms, dependency injection, HTTP, testing and more.
- Angular applications are mainly written in TypeScript.

# Angular History

| Version | Year | Major changes |
|---|---:|---|
| AngularJS 1.x | 2010 | Original Angular framework based on JavaScript |
| Angular 2 | 2016 | Complete rewrite; introduced modern component-based architecture and TypeScript |
| Angular 4 | 2017 | Continued modern Angular evolution; smaller and faster framework |
| Angular 5 | 2017 | Build Optimizer and improved tooling |
| Angular 6 | 2018 | Angular Elements, improved CLI and workspace support |
| Angular 7 | 2018 | Virtual scrolling, drag and drop, CLI improvements |
| Angular 8 | 2019 | Dynamic imports, differential loading and improved lazy loading |
| Angular 9 | 2020 | Ivy became the default rendering and compilation engine |
| Angular 10 | 2020 | Improved compiler, CLI and TypeScript support |
| Angular 11 | 2020 | Faster builds and improved development experience |
| Angular 12 | 2021 | Ivy-only applications and removal of View Engine |
| Angular 13 | 2021 | View Engine removed; modern Angular compilation |
| Angular 14 | 2022 | Standalone components introduced; typed reactive forms |
| Angular 15 | 2022 | Standalone APIs improved and stable |
| Angular 16 | 2023 | Signals introduced; improved reactivity |
| Angular 17 | 2023 | New control flow, improved build system and modern Angular direction |
| Angular 18 | 2024 | Continued improvements to signals, control flow and application development |
| Angular 19 | 2024 | Standalone-first development and further reactive improvements |
| Angular 20 | 2025 | Continued modernization and performance improvements |
| Angular 21 | 2025 | Further improvements to modern Angular APIs and developer experience |

# Angular 21

This repository uses Angular 21.

- Modern Angular APIs are preferred.
- Standalone components are used instead of NgModule-based application structure.
- Modern control flow such as `@if` and `@for` is preferred.
- Signals are covered as a modern Angular reactive state mechanism.
- Older Angular approaches are mentioned only when useful for understanding existing applications.

# Angular as a Framework

Angular provides most of the capabilities required to build a complete web application.

| Angular capability | Purpose |
|---|---|
| Components | Build reusable UI |
| Templates | Define component UI |
| Data Binding | Connect component data with UI |
| Directives | Add behavior or control rendering |
| Pipes | Transform data for display |
| Services | Encapsulate reusable logic |
| Dependency Injection | Provide and manage dependencies |
| Routing | Navigate between application views |
| Forms | Handle user input and validation |
| Signals | Manage reactive state |
| HttpClient | Communicate with backend APIs |
| RxJS | Handle asynchronous/reactive operations |
| Guards | Control route navigation |
| Interceptors | Process HTTP requests/responses |
| Testing | Test application code |
| Angular CLI | Create, develop, test and build applications |

# Single Page Application

SPA means Single Page Application.

In a traditional web application:

```text
Browser
  ↓
Request page
  ↓
Server
  ↓
New HTML page
```

In an Angular SPA:

```text
Browser
  ↓
Angular Application
  ↓
Angular Router
  ↓
Component changes
```

- The Angular application is initially loaded in the browser.
- Angular Router handles navigation between application views.
- Angular can change the displayed component without a complete browser page reload.
- Different URLs can represent different application views.

Example:

```text
/home
/about
/contact
```

Each URL can display a different Angular component while the Angular application remains loaded.

# Component-Based Architecture

Angular applications are built using components.

Example:

```text
Application
├── Header
├── Navigation
├── ProductList
│   └── ProductCard
├── Cart
└── Footer
```

A component generally contains:

| Part | Purpose |
|---|---|
| TypeScript | Component logic and state |
| HTML | Component template/UI |
| CSS | Component styling |

Benefits:

- Reusable UI
- Separation of responsibilities
- Easier maintenance
- Easier testing
- Better application organization

Components are covered in detail in Lesson 5.

# Angular Features

| Feature | Purpose |
|---|---|
| Component-based architecture | Build applications using reusable components |
| Data binding | Connect component data with templates |
| Directives | Add behavior or control rendering |
| Pipes | Transform data for display |
| Services | Share reusable application logic |
| Dependency Injection | Manage and provide dependencies |
| Routing | Navigate between views |
| Forms | Build and validate forms |
| Signals | Manage reactive state |
| HttpClient | Call backend APIs |
| RxJS | Handle asynchronous operations |
| Guards | Control route navigation |
| Interceptors | Process HTTP communication globally |
| Angular CLI | Manage Angular applications |
| Testing | Test application behavior |

# Angular Use Cases

Angular is commonly used for:

- Enterprise applications
- Banking applications
- Admin dashboards
- E-commerce applications
- SaaS applications
- CRM applications
- Healthcare applications
- Business applications
- Large internal applications
- Applications with complex business requirements

Angular is particularly suitable when an application requires a structured and consistent architecture.

# Angular Architecture Overview

A simplified Angular application can be viewed as:

```text
Angular Application
├── Components
├── Templates
├── Directives
├── Pipes
├── Services
├── Dependency Injection
├── Routing
├── Forms
├── Signals
├── HttpClient
└── RxJS
```

A common application flow is:

```text
User
  ↓
Component
  ↓
Service
  ↓
HttpClient
  ↓
REST API
  ↓
Response
  ↓
Component State
  ↓
Template
  ↓
Updated UI
```

# Angular vs React vs Vue

| Feature | Angular | React | Vue |
|---|---|---|---|
| Type | Framework | UI library | Framework |
| Primary language | TypeScript | JavaScript/TypeScript | JavaScript/TypeScript |
| Maintained by | Google | Meta | Vue core team/community |
| Architecture | Opinionated | Flexible | Progressive |
| Components | Yes | Yes | Yes |
| Routing | Built-in | Usually separate | Vue Router |
| Forms | Built-in | Usually ecosystem libraries | Built-in capabilities |
| Dependency Injection | Built-in | Not core | Different approach |
| HTTP | HttpClient | Usually external | Usually external |
| State | Signals, RxJS, etc. | Ecosystem options | Composition API/ecosystem |
| CLI | Angular CLI | Tooling ecosystem | Vite ecosystem |
| Typical use | Large structured applications | Flexible UI/applications | Progressive applications |

Key point:

Angular is a complete application framework, while React primarily focuses on the UI layer.

# Angular Ecosystem

Important technologies commonly used with Angular:

```text
Angular
├── Angular CLI
├── TypeScript
├── RxJS
├── Angular Router
├── Angular Forms
├── HttpClient
├── Angular DevTools
└── Testing tools
```

We will learn each Angular-related technology when it becomes relevant.

# NPM

NPM is the package manager commonly used by Angular applications.

- Installs and manages project dependencies.
- Dependencies are recorded in `package.json`.
- Packages are installed into `node_modules`.

Common commands:

```bash
npm install
npm install <package>
npm install -g <package>
npm uninstall <package>
```

NPM provides a dependency-management role similar to Maven in Java projects.

# Angular CLI

Angular CLI is the command-line tool used to create and manage Angular applications.

| Command | Purpose |
|---|---|
| `ng new my-angular-application` | Create an Angular application |
| `ng serve` | Run the development server |
| `ng generate component user` | Generate a component |
| `ng generate service user` | Generate a service |
| `ng build` | Build the application |
| `ng test` | Run tests |
| `ng version` | Display Angular and CLI versions |

Angular CLI is covered practically in Lesson 3.

# Angular 21 Development Flow

A simplified Angular application flow:

```text
User Action
    ↓
Component
    ↓
Service
    ↓
HttpClient
    ↓
REST API
    ↓
Response
    ↓
State
    ↓
Template
    ↓
Updated UI
```

Example:

```text
User clicks Search
        ↓
Angular Component
        ↓
Angular Service
        ↓
HttpClient
        ↓
REST API
        ↓
Response
        ↓
Signal / Component State
        ↓
Template updates
```

# Key Takeaways

- Angular is a TypeScript-based web application framework.
- Angular applications use component-based architecture.
- Angular supports Single Page Applications.
- Angular provides routing, forms, dependency injection, HTTP, testing and other application capabilities.
- Angular 21 is the version used in this repository.
- Modern Angular uses standalone components, signals and modern control flow.
- Components are responsible for UI and component behavior.
- Services are commonly used for reusable application logic.
- Dependency Injection provides required dependencies.
- Angular CLI manages application creation, development, testing and builds.
- NPM manages Angular project packages and dependencies.
