import {
  Component,
  inject
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Customer,
  CustomerModel
} from '../services/customer';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {

  private customerService =
    inject(Customer);

  name = '';

  email = '';

  message = '';

  register(): void {

    const customer:
      Omit<CustomerModel, 'id'> = {

      name: this.name,

      email: this.email

    };

    this.customerService
      .createCustomer(customer)
      .subscribe({
        next: customer => {

          console.log(
            'Customer registered:',
            customer
          );

          this.message =
            'Customer registered successfully.';

          this.name = '';

          this.email = '';

        },

        error: error => {

          console.error(
            'Registration failed:',
            error
          );

          this.message =
            'Registration failed.';

        }
      });

  }

}
