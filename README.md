# Lesson 12 — Forms & Form Validation

# What are Angular Forms

Angular Forms provide a way to collect, manage, and validate user input.

Forms are commonly used for:

- Login forms.
- Registration forms.
- Customer forms.
- Search forms.
- Profile forms.
- Data entry forms.

Angular provides two main approaches for building forms:

1. Template-driven forms
2. Reactive forms

# Template-driven Forms

Template-driven forms are primarily defined in the HTML template.

They are useful for simple forms where most of the form behavior can be expressed directly in the template.

Template-driven forms use:

```text
FormsModule
```

The `ngModel` directive connects form controls with component properties.

# Example 1 — User Registration Form

A user registration form is a practical example of a template-driven form.

It can collect:

- Full name.
- Email.
- Password.
- Confirm password.
- Terms and conditions.

Create/use **initial Angular project skeleton** and create the `registration` component.

```bash
ng new my-angular-application
ng g c registration
```

Then implement the registration form step by step.

### Step 1: Open the Registration Component

Open:

```text
src/app/registration/registration.ts
```

Update it:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;

  register(): void {
    console.log('Registration:', {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      acceptTerms: this.acceptTerms
    });
  }
}
```

### Step 2: Create the Registration Form

Open:

```text
src/app/registration/registration.html
```

Add:

```html
<h2>User Registration</h2>

<form #registrationForm="ngForm" (ngSubmit)="register()">

  <div>
    <label for="fullName">Full Name:</label>

    <input
      id="fullName"
      name="fullName"
      type="text"
      [(ngModel)]="fullName"
      #fullNameControl="ngModel"
      required
      minlength="3">

    @if (fullNameControl.touched &&
         fullNameControl.hasError('required')) {
      <p>Full name is required.</p>
    }

    @if (fullNameControl.touched &&
         fullNameControl.hasError('minlength')) {
      <p>Full name must contain at least 3 characters.</p>
    }
  </div>

  <div>
    <label for="email">Email:</label>

    <input
      id="email"
      name="email"
      type="email"
      [(ngModel)]="email"
      #emailControl="ngModel"
      required
      email>

    @if (emailControl.touched &&
         emailControl.hasError('required')) {
      <p>Email is required.</p>
    }

    @if (emailControl.touched &&
         emailControl.hasError('email')) {
      <p>Enter a valid email address.</p>
    }
  </div>

  <div>
    <label for="password">Password:</label>

    <input
      id="password"
      name="password"
      type="password"
      [(ngModel)]="password"
      #passwordControl="ngModel"
      required
      minlength="8">

    @if (passwordControl.touched &&
         passwordControl.hasError('required')) {
      <p>Password is required.</p>
    }

    @if (passwordControl.touched &&
         passwordControl.hasError('minlength')) {
      <p>Password must contain at least 8 characters.</p>
    }
  </div>

  <div>
    <label for="confirmPassword">Confirm Password:</label>

    <input
      id="confirmPassword"
      name="confirmPassword"
      type="password"
      [(ngModel)]="confirmPassword"
      #confirmPasswordControl="ngModel"
      required>

    @if (confirmPasswordControl.touched &&
         confirmPasswordControl.hasError('required')) {
      <p>Please confirm your password.</p>
    }
  </div>

  <div>
    <label class="checkbox-label">
      <input
        type="checkbox"
        name="acceptTerms"
        [(ngModel)]="acceptTerms"
        #termsControl="ngModel"
        required>

      I accept the terms and conditions.
    </label>

    @if (termsControl.touched &&
         termsControl.invalid) {
      <p>You must accept the terms and conditions.</p>
    }
  </div>

  <button
    type="submit"
    [disabled]="registrationForm.invalid">
    Register
  </button>

</form>
```

### Step 3: Add the Registration Component to the Root Component

Open:

```text
src/app/app.ts
```

Update it:

```typescript
import { Component, signal } from '@angular/core';
import { Registration } from './registration/registration';

@Component({
  selector: 'app-root',
  imports: [Registration],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-application');
}
```

### Step 4: Render the Registration Form

Open:

```text
src/app/app.html
```

Add:

```html
<app-registration></app-registration>
```

### Step 5: Add CSS to the Registration Form

Open:

```text
src/app/registration/registration.css
```

Add:

```css
form {
  width: 400px;
}

form > div {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

input[type="checkbox"] {
  margin-right: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-weight: normal;
}

p {
  margin: 5px 0 0;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}
```

The CSS improves the alignment and spacing of the registration form while keeping the styling simple.

### Step 6: Run the Registration Form

From the project root:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

Try submitting the form with invalid values.

The validation messages should appear when the controls are touched.

The Register button remains disabled while the form is invalid.
<br /><br />
<img width="3840" height="1350" alt="image" src="https://github.com/user-attachments/assets/2d39cce1-293a-4d19-a03a-8749590dee85" />

# Reactive Forms

Reactive forms define the form model primarily in TypeScript.

They are particularly useful when forms contain:

- Multiple fields.
- Complex validation.
- Conditional validation.
- Dynamic fields.
- Programmatic updates.
- More complex form state.

Reactive forms use:

```text
ReactiveFormsModule
```

and commonly use:

```text
FormControl
FormGroup
Validators
```

# Example 2 — Customer Profile Form

A customer profile form is a practical example of a reactive form.

It can collect:

- Customer name.
- Email.
- Phone.
- Date of birth.
- Address.
- City.
- State.
- PIN code.

Create/use **initial Angular project skeleton** and create the `customer-profile` component.

```bash
ng new my-angular-application
ng g c customer-profile
```

Then implement the customer profile form step by step.

### Step 1: Open the Customer Profile Component

Open:

```text
src/app/customer-profile/customer-profile.ts
```

Update it:

```typescript
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.css'
})
export class CustomerProfile {

  customerForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]),

    dateOfBirth: new FormControl('', [
      Validators.required
    ]),

    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),

    city: new FormControl('', [
      Validators.required
    ]),

    state: new FormControl('', [
      Validators.required
    ]),

    pinCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/)
    ])
  });

  saveProfile(): void {
    if (this.customerForm.valid) {
      console.log('Customer Profile:', this.customerForm.value);
    }
  }
}
```

### Step 2: Create the Customer Profile Form

Open:

```text
src/app/customer-profile/customer-profile.html
```

Add:

```html
<h2>Customer Profile</h2>

<form [formGroup]="customerForm" (ngSubmit)="saveProfile()">

  <div>
    <label for="fullName">Full Name:</label>

    <input
      id="fullName"
      type="text"
      formControlName="fullName">

    @if (customerForm.controls.fullName.touched &&
         customerForm.controls.fullName.hasError('required')) {
      <p>Full name is required.</p>
    }

    @if (customerForm.controls.fullName.touched &&
         customerForm.controls.fullName.hasError('minlength')) {
      <p>Full name must contain at least 3 characters.</p>
    }
  </div>

  <div>
    <label for="email">Email:</label>

    <input
      id="email"
      type="email"
      formControlName="email">

    @if (customerForm.controls.email.touched &&
         customerForm.controls.email.hasError('required')) {
      <p>Email is required.</p>
    }

    @if (customerForm.controls.email.touched &&
         customerForm.controls.email.hasError('email')) {
      <p>Enter a valid email address.</p>
    }
  </div>

  <div>
    <label for="phone">Phone:</label>

    <input
      id="phone"
      type="tel"
      formControlName="phone">

    @if (customerForm.controls.phone.touched &&
         customerForm.controls.phone.hasError('required')) {
      <p>Phone number is required.</p>
    }

    @if (customerForm.controls.phone.touched &&
         customerForm.controls.phone.hasError('pattern')) {
      <p>Enter a valid 10-digit phone number.</p>
    }
  </div>

  <div>
    <label for="dateOfBirth">Date of Birth:</label>

    <input
      id="dateOfBirth"
      type="date"
      formControlName="dateOfBirth">

    @if (customerForm.controls.dateOfBirth.touched &&
         customerForm.controls.dateOfBirth.hasError('required')) {
      <p>Date of birth is required.</p>
    }
  </div>

  <div>
    <label for="address">Address:</label>

    <textarea
      id="address"
      formControlName="address">
    </textarea>

    @if (customerForm.controls.address.touched &&
         customerForm.controls.address.hasError('required')) {
      <p>Address is required.</p>
    }

    @if (customerForm.controls.address.touched &&
         customerForm.controls.address.hasError('minlength')) {
      <p>Address must contain at least 10 characters.</p>
    }
  </div>

  <div>
    <label for="city">City:</label>

    <input
      id="city"
      type="text"
      formControlName="city">

    @if (customerForm.controls.city.touched &&
         customerForm.controls.city.hasError('required')) {
      <p>City is required.</p>
    }
  </div>

  <div>
    <label for="state">State:</label>

    <input
      id="state"
      type="text"
      formControlName="state">

    @if (customerForm.controls.state.touched &&
         customerForm.controls.state.hasError('required')) {
      <p>State is required.</p>
    }
  </div>

  <div>
    <label for="pinCode">PIN Code:</label>

    <input
      id="pinCode"
      type="text"
      formControlName="pinCode">

    @if (customerForm.controls.pinCode.touched &&
         customerForm.controls.pinCode.hasError('required')) {
      <p>PIN code is required.</p>
    }

    @if (customerForm.controls.pinCode.touched &&
         customerForm.controls.pinCode.hasError('pattern')) {
      <p>Enter a valid 6-digit PIN code.</p>
    }
  </div>

  <button
    type="submit"
    [disabled]="customerForm.invalid">
    Save Profile
  </button>

</form>
```

### Step 3: Add the Customer Profile Component to the Root Component

Open:

```text
src/app/app.ts
```

Update it:

```typescript
import { Component, signal } from '@angular/core';
import { CustomerProfile } from './customer-profile/customer-profile';

@Component({
  selector: 'app-root',
  imports: [CustomerProfile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-application');
}
```

### Step 4: Render the Customer Profile Form

Open:

```text
src/app/app.html
```

Add:

```html
<app-customer-profile></app-customer-profile>
```

### Step 5: Add CSS to the Customer Profile Form

Open:

```text
src/app/customer-profile/customer-profile.css
```

Add:

```css
form {
  width: 400px;
}

form > div {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"],
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

textarea {
  min-height: 80px;
  resize: vertical;
}

p {
  margin: 5px 0 0;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}
```

The CSS provides consistent spacing, input widths, and alignment for the customer profile form.

### Step 6: Run the Customer Profile Form

From the project root:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

Enter the customer information and click:

```text
Save Profile
```

The form values will be available through:

```typescript
this.customerForm.value
```

<img width="3840" height="1988" alt="image" src="https://github.com/user-attachments/assets/03997030-9d18-4ce5-bf93-d2362791f520" />

# Form State

Angular tracks the state of forms and controls.

Important states include:

```text
valid
invalid
touched
untouched
dirty
pristine
```

For example:

```text
customerForm.valid
```

checks whether the entire reactive form is valid.

For a template-driven form:

```text
customerForm.invalid
```

checks whether the form is invalid.

# touched and untouched

A control is `untouched` when the user has not interacted with it.

After the user interacts with the control, it becomes `touched`.

Example:

```text
customerForm.controls.name.touched
```

This is useful when displaying validation messages only after the user interacts with the field.

# dirty and pristine

A control is `pristine` when its value has not been changed.

It becomes `dirty` when the user changes its value.

Example:

```text
customerForm.controls.name.dirty
```

The opposite is:

```text
customerForm.controls.name.pristine
```

# Built-in Validators

Common Angular validators include:

| Validator | Purpose | Example |
|---|---|---|
| `required` | Field must contain a value | `Validators.required` |
| `minLength` | Minimum number of characters | `Validators.minLength(3)` |
| `maxLength` | Maximum number of characters | `Validators.maxLength(50)` |
| `email` | Valid email format | `Validators.email` |
| `min` | Minimum numeric value | `Validators.min(18)` |
| `max` | Maximum numeric value | `Validators.max(100)` |
| `pattern` | Value must match a pattern | `Validators.pattern(...)` |

# Form vs FormControl vs FormGroup

| Concept | Purpose | Example |
|---|---|---|
| Form | Collects user input | `<form>` |
| FormControl | Represents one field | `new FormControl()` |
| FormGroup | Groups controls | `new FormGroup()` |
| Validator | Validates input | `Validators.required` |
| FormsModule | Enables template-driven forms | `FormsModule` |
| ReactiveFormsModule | Enables reactive forms | `ReactiveFormsModule` |

# Template-driven vs Reactive Forms

| Template-driven Forms | Reactive Forms |
|---|---|
| Uses `FormsModule` | Uses `ReactiveFormsModule` |
| Uses `ngModel` | Uses `FormControl` and `FormGroup` |
| Form model is created mainly by the template | Form model is created explicitly in TypeScript |
| Validation is defined mainly in the template | Validation is defined mainly in TypeScript |
| Simple forms | Complex forms |
| Less explicit | More explicit |
| Easy to get started | More control and scalability |
| Example: User Registration | Example: Customer Profile |

# Practical Project Structure

After implementing this lesson:

```text
my-angular-application/
├── public/
│
├── src/
│   ├── app/
│   │   ├── registration/
│   │   │   ├── registration.ts
│   │   │   ├── registration.html
│   │   │   ├── registration.css
│   │   │   └── registration.spec.ts
│   │   │
│   │   ├── customer-profile/
│   │   │   ├── customer-profile.ts
│   │   │   ├── customer-profile.html
│   │   │   ├── customer-profile.css
│   │   │   └── customer-profile.spec.ts
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
| Template-driven form | Form defined mainly in template | `[(ngModel)]` |
| Reactive form | Form defined mainly in component | `FormGroup` |
| `FormControl` | Represents one form field | `new FormControl()` |
| `FormGroup` | Groups form controls | `new FormGroup()` |
| `Validators` | Provides validation rules | `Validators.required` |
| `valid` | Form/control passes validation | `form.valid` |
| `invalid` | Form/control fails validation | `form.invalid` |
| `touched` | User interacted with control | `control.touched` |
| `dirty` | User changed the value | `control.dirty` |
| `ngModel` | Template-driven binding | `[(ngModel)]="name"` |
| `formControlName` | Connects reactive control to template | `formControlName="name"` |
| `ngSubmit` | Handles form submission | `(ngSubmit)="submit()"` |

# Key Takeaways

- Angular provides template-driven and reactive forms.
- Template-driven forms use `FormsModule` and `ngModel`.
- Reactive forms use `ReactiveFormsModule`, `FormControl`, and `FormGroup`.
- Template-driven forms are useful for simpler forms such as user registration.
- Reactive forms provide more explicit control for complex forms such as customer profiles.
- `FormControl` represents an individual form field.
- `FormGroup` groups multiple form controls.
- Angular provides built-in validators through `Validators`.
- `valid` and `invalid` indicate validation state.
- `touched` and `dirty` help determine user interaction.
- `ngSubmit` handles form submission.
- Modern Angular control flow such as `@if` can be used to display validation messages.
- CSS can be used to improve form alignment and readability without changing the Angular form logic.
- Template-driven forms are easier to get started with.
- Reactive forms provide greater control and scalability for complex forms.
