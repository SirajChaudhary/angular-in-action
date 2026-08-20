import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

export interface CustomerModel {

  id: number;

  name: string;

  email: string;

}

@Injectable({
  providedIn: 'root'
})
export class Customer {

  private http =
    inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/customers';

  getCustomers():
    Observable<CustomerModel[]> {

    return this.http.get<
      CustomerModel[]
    >(this.apiUrl);

  }

  createCustomer(
    customer: Omit<CustomerModel, 'id'>
  ): Observable<CustomerModel> {

    return this.http.post<CustomerModel>(
      this.apiUrl,
      customer
    );

  }

}