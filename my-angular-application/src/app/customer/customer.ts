import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
  name = 'Siraj';
  email = 'siraj@example.com';

  getCustomerName(): string {
    return this.name;
  }
}
