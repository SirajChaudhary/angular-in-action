import { Component } from '@angular/core';
import { CustomerService } from '../services/customer';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  constructor(private customerService: CustomerService) {
  }

  getCustomerName(): string {
    return this.customerService.getCustomerName();
  }

  getCustomerEmail(): string {
    return this.customerService.getCustomerEmail();
  }
}