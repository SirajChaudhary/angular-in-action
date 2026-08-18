import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  getCustomerName(): string {
    return 'Siraj';
  }

  getCustomerEmail(): string {
    return 'siraj@example.com';
  }
}