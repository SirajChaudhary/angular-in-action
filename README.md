# Lesson 3 — Angular Environment Setup

# Prerequisites

| Tool | Purpose |
|---|---|
| Node.js | JavaScript runtime required by Angular CLI |
| NPM | Package manager for Angular dependencies |
| Angular CLI | Create and manage Angular applications |
| VS Code | Recommended code editor |
| Angular Language Service | Angular support in VS Code |
| Git | Source control |

# Node.js

Node.js provides the runtime required to run Angular CLI and other JavaScript-based development tools.

Check the installed version:

```bash
node --version
```

Example:

```text
v22.x.x
```

# NPM

NPM is installed with Node.js and is used to install Angular packages and other project dependencies.

Check the version:

```bash
npm --version
```

Example:

```text
10.x.x
```

# Angular CLI

Angular CLI is the command-line tool used to create and manage Angular applications.

Check whether Angular CLI is installed:

```bash
ng version
```

If Angular CLI is not installed:

```bash
npm install -g @angular/cli
```

Verify:

```bash
ng version
```

For this course, we use **Angular 21**.

# Verify Angular CLI

Run:

```bash
ng version
```

You should see information similar to:

```text
Angular CLI       : 21.x.x
Angular           : 21.x.x
Node.js           : 22.x.x
Package Manager   : npm
```

The exact patch versions may differ.

# VS Code

Visual Studio Code is the recommended editor for this course.

Recommended extensions:

| Extension | Purpose |
|---|---|
| Angular Language Service | Angular templates, navigation and diagnostics |
| ESLint | Code-quality and linting support |
| Prettier - Code formatter | Consistent code formatting |

# Angular Language Service

Angular Language Service provides Angular-specific editor support.

It helps with:

- Angular template syntax
- Code completion
- Template diagnostics
- Navigation
- Type information

Install from:

```text
VS Code → Extensions → Angular Language Service
```

# ESLint

ESLint helps identify potential problems and enforce coding rules.

It can help detect:

- Incorrect code patterns
- Unused code
- Potential errors
- Project-specific rule violations

# Prettier

Prettier is used to automatically format source code.

Benefits:

- Consistent formatting
- Easier code reviews
- Consistent coding style

# Git

Git is used for source control.

Check the installed version:

```bash
git --version
```

Example:

```text
git version 2.x.x
```

# Project Directory

Our Angular course repository and local project directory are:

```text
angular-in-action
```

Create and enter the directory:

```bash
mkdir angular-in-action
cd angular-in-action
```

# Verify the Environment

Run:

```bash
node --version
npm --version
ng version
git --version
```

Example:

```text
Node.js       → 22.x.x
NPM           → 10.x.x
Angular CLI   → 21.x.x
Git           → 2.x.x
```

# Useful Angular CLI Commands

| Command | Purpose |
|---|---|
| `ng version` | Display Angular and CLI versions |
| `ng help` | Display Angular CLI help |
| `ng new` | Create a new Angular application |
| `ng generate` | Generate Angular files |
| `ng serve` | Start development server |
| `ng build` | Build the application |
| `ng test` | Run tests |

# Environment Checklist

- [ ] Node.js installed
- [ ] NPM available
- [ ] Angular CLI 21 available
- [ ] Git installed
- [ ] VS Code installed
- [ ] Angular Language Service installed
- [ ] ESLint available when required
- [ ] Prettier available when required

# Quick Revision

| Command | Purpose |
|---|---|
| `node --version` | Check Node.js |
| `npm --version` | Check NPM |
| `ng version` | Check Angular CLI |
| `git --version` | Check Git |
| `ng help` | Angular CLI help |

# Key Takeaways

- Node.js is required for Angular development.
- NPM manages Angular packages and dependencies.
- Angular CLI is used to create and manage Angular applications.
- VS Code provides the development environment.
- Angular Language Service provides Angular-specific editor support.
- ESLint helps identify code-quality issues.
- Prettier provides consistent code formatting.
- Git manages source code and branches.
