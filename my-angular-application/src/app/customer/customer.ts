import { Component } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  JsonPipe,
  LowerCasePipe,
  PercentPipe,
  TitleCasePipe,
  UpperCasePipe
} from '@angular/common';

@Component({
  selector: 'app-customer',
  imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    JsonPipe,
    LowerCasePipe,
    PercentPipe,
    TitleCasePipe,
    UpperCasePipe
  ],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
  name = 'siraj chaudhary';
  email = 'siraj@example.com';

  price = 5000;
  completion = 0.75;

  today = new Date();

  customer = {
    id: 1,
    name: 'Siraj',
    email: 'siraj@example.com'
  };
}