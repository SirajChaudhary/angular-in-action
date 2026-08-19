import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/customers';

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${this.apiUrl}/${customer.id}`,
      customer
    );
  }

  patchCustomer(
    id: number,
    changes: Partial<Customer>
  ): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.apiUrl}/${id}`,
      changes
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  checkCustomer(id: number): Observable<void> {
    return this.http.head<void>(`${this.apiUrl}/${id}`);
  }

  getCustomerOptions(): Observable<any> {
    return this.http.options<any>(this.apiUrl);
  }
}