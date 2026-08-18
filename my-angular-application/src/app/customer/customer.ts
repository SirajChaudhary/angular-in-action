import { Component } from '@angular/core';
import { CustomerCard } from './customer-card/customer-card';

@Component({
  selector: 'app-customer',
  imports: [CustomerCard],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
  name = 'Siraj';
  email = 'siraj@example.com';

  getCustomerName(): string {
    return this.name;
  }

  onCustomerSelected(name: string): void {
    console.log('Selected customer:', name);
  }
}