import { Component } from '@angular/core';
import { Highlight } from '../directives/highlight';

@Component({
  selector: 'app-customer',
  imports: [Highlight],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
}