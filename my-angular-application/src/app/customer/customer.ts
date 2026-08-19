import {
  Component,
  inject
} from '@angular/core';

import {
  CustomerService,
  CustomerModel
} from '../services/customer.service';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  private customerService =
    inject(CustomerService);

  customers: CustomerModel[] = [];

  loadCustomers(): void {

    this.customerService
      .getCustomers()
      .subscribe({
        next: customers => {

          this.customers = customers;

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