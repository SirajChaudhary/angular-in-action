import {
  Component,
  inject
} from '@angular/core';

import {
  Customer,
  CustomerModel
} from '../services/customer';

@Component({
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers {

  private customerService =
    inject(Customer);

  customers:
    CustomerModel[] = [];

  loadCustomers(): void {

    this.customerService
      .getCustomers()
      .subscribe({
        next: customers => {

          this.customers =
            customers;

        },

        error: error => {

          console.error(
            'Failed to load customers:',
            error
          );

        }
      });

  }

}