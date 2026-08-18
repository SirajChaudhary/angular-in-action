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