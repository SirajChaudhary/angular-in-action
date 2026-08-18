# Lesson 2 — TypeScript

# What is TypeScript

TypeScript is a strongly typed programming language developed by Microsoft and built on top of JavaScript.

- TypeScript is a superset of JavaScript.
- TypeScript code is compiled to JavaScript.
- Angular applications are primarily written in TypeScript.
- TypeScript provides static typing and modern language features.
- TypeScript helps identify many errors during development.

```text
TypeScript
    ↓
TypeScript Compiler
    ↓
JavaScript
    ↓
Browser
```

# TypeScript vs JavaScript

| Feature | TypeScript | JavaScript |
|---|---|---|
| Static typing | Yes | No |
| Type inference | Yes | Limited |
| Interfaces | Yes | No |
| Generics | Yes | No |
| Access modifiers | Yes | No |
| Compile-time checking | Yes | No |
| Runs directly in browser | No | Yes |
| Used by Angular | Yes | Yes |

# Type Annotations

A type annotation explicitly defines the type of a variable.

```typescript
let name: string = 'Siraj';
let age: number = 43;
let active: boolean = true;
```

# Type Inference

TypeScript can automatically determine the type from the assigned value.

```typescript
let name = 'Siraj';
let age = 43;
let active = true;
```

TypeScript infers:

```text
name   → string
age    → number
active → boolean
```

# Arrays

```typescript
let names: string[] = ['Siraj', 'Ahmed', 'John'];
let ids: number[] = [1, 2, 3];
```

Another syntax:

```typescript
let names: Array<string> = ['Siraj', 'Ahmed'];
```

# Objects

```typescript
let customer: {
  id: number;
  name: string;
  active: boolean;
} = {
  id: 1,
  name: 'Siraj',
  active: true
};
```

For reusable object structures, interfaces are preferred.

# Interfaces

An interface defines the structure of an object.

```typescript
interface Customer {
  id: number;
  name: string;
  email: string;
  active: boolean;
}
```

Use it:

```typescript
const customer: Customer = {
  id: 1,
  name: 'Siraj',
  email: 'siraj@example.com',
  active: true
};
```

Interfaces are commonly used in Angular for models and API response structures.

# Optional Properties

Use `?` when a property is optional.

```typescript
interface Customer {
  id: number;
  name: string;
  email?: string;
}
```

# Readonly Properties

`readonly` prevents reassignment after initialization.

```typescript
interface Customer {
  readonly id: number;
  name: string;
}
```

# Union Types

A union allows a value to have more than one possible type.

```typescript
let customerId: number | string;

customerId = 101;
customerId = 'CUS-101';
```

# Literal Types

A literal type restricts a value to specific values.

```typescript
let status: 'active' | 'inactive';

status = 'active';
```

# Type Aliases

A type alias gives a reusable name to a type.

```typescript
type CustomerId = number | string;
```

Use it:

```typescript
let id: CustomerId = 101;
let anotherId: CustomerId = 'CUS-101';
```

# Functions

TypeScript allows types for function parameters and return values.

```typescript
function getCustomerName(id: number): string {
  return 'Siraj';
}
```

# Optional Parameters

```typescript
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : name;
}
```

# Default Parameters

```typescript
function greet(name: string, country = 'India'): string {
  return `${name} from ${country}`;
}
```

# Arrow Functions

Angular code frequently uses arrow functions.

```typescript
const add = (a: number, b: number): number => {
  return a + b;
};
```

Short form:

```typescript
const add = (a: number, b: number): number => a + b;
```

# Classes

TypeScript supports classes.

```typescript
class Customer {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
```

Angular components and services are TypeScript classes.

# Access Modifiers

| Modifier | Accessibility |
|---|---|
| `public` | Accessible everywhere |
| `private` | Accessible only inside the class |
| `protected` | Accessible inside the class and subclasses |

Example:

```typescript
class Customer {
  public name = 'Siraj';
  private email = 'siraj@example.com';
  protected id = 101;
}
```

`public` is the default access modifier.

# readonly

`readonly` prevents reassignment.

```typescript
class Customer {
  readonly id = 101;
}
```

# Constructor Parameter Properties

TypeScript can create and initialize class properties directly from constructor parameters.

```typescript
class Customer {

  constructor(
    private name: string,
    private email: string
  ) {
  }

}
```

This is commonly seen in Angular applications.

# Inheritance

A class can extend another class.

```typescript
class Person {
  name = 'Siraj';
}

class Customer extends Person {
  customerId = 101;
}
```

# Generics

Generics allow reusable code while preserving type safety.

```typescript
function getValue<T>(value: T): T {
  return value;
}
```

Usage:

```typescript
const name = getValue<string>('Siraj');
const id = getValue<number>(101);
```

Generics are common in Angular and RxJS APIs.

# Enum

Enums define a set of named constants.

```typescript
enum CustomerStatus {
  Active,
  Inactive,
  Blocked
}
```

Usage:

```typescript
const status = CustomerStatus.Active;
```

For many modern TypeScript applications, union types are often preferred when a simple set of string values is sufficient.

# any

`any` disables most type checking for a value.

```typescript
let value: any = 'Siraj';

value = 100;
value = true;
```

Avoid `any` unless there is a specific reason to use it.

# unknown

`unknown` is safer than `any` when the type is not known.

```typescript
let value: unknown = 'Siraj';
```

Before using it as a specific type, TypeScript requires type checking.

```typescript
if (typeof value === 'string') {
  console.log(value.toUpperCase());
}
```

# Type Assertion

A type assertion tells TypeScript how you want a value to be treated.

```typescript
const value: unknown = 'Siraj';

const name = value as string;
```

Type assertion does not perform runtime conversion.

# Null Safety

With strict TypeScript settings, `null` and `undefined` are treated carefully.

```typescript
let name: string | null = null;

name = 'Siraj';
```

# Modules and Imports

TypeScript supports modules using `export` and `import`.

Export:

```typescript
export interface Customer {
  id: number;
  name: string;
}
```

Import:

```typescript
import { Customer } from './customer';
```

# TypeScript in Angular

Angular uses TypeScript throughout the application.

Example:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  template: `<h2>{{ name }}</h2>`
})
export class Customer {

  name: string = 'Siraj';

}
```

| TypeScript concept | Angular usage |
|---|---|
| Class | Component/service |
| Interface | Model/API response |
| Type | Application types |
| Function | Component/service methods |
| Access modifier | Control property visibility |
| Generics | Framework and application APIs |
| Import/export | Organize application code |
| Decorator | Angular metadata |

# TypeScript Configuration

Angular projects use TypeScript configuration files.

Common files:

```text
tsconfig.json
tsconfig.app.json
tsconfig.spec.json
```

Important compiler options include:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022"
  }
}
```

`strict: true` enables stronger type checking and is recommended for Angular applications.

# TypeScript Best Practices for Angular

- Prefer explicit types when they improve readability.
- Use type inference when the type is obvious.
- Avoid `any`.
- Prefer `unknown` when a value's type is not known.
- Use interfaces or type aliases for reusable data structures.
- Use `readonly` for values that should not be reassigned.
- Keep classes focused on a clear responsibility.
- Use access modifiers appropriately.
- Prefer strict type checking.
- Use meaningful type and interface names.
- Keep shared models in an appropriate application folder.

# Quick Revision

| Concept | Example |
|---|---|
| Type annotation | `name: string` |
| Type inference | `name = 'Siraj'` |
| Array | `string[]` |
| Interface | `interface Customer {}` |
| Type alias | `type CustomerId = number` |
| Union | `number | string` |
| Optional property | `email?: string` |
| Readonly | `readonly id` |
| Function | `(id: number): string` |
| Class | `class Customer {}` |
| Private | `private name` |
| Protected | `protected id` |
| Generic | `Array<Customer>` |
| Type assertion | `value as string` |
| Module | `export` / `import` |

# Key Takeaways

- TypeScript is the primary programming language used by Angular.
- TypeScript adds static typing to JavaScript.
- Interfaces and type aliases define reusable data structures.
- Classes are used extensively for Angular components and services.
- Generics provide reusable and type-safe code.
- Union types allow multiple valid types.
- Access modifiers control class member visibility.
- `readonly` prevents reassignment.
- Avoid `any` when possible.
- Strict type checking improves application reliability.
- Understanding TypeScript is essential for effective Angular development.
