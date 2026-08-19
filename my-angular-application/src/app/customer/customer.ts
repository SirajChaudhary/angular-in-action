import { Component } from '@angular/core';
import { HoverCard } from '../directives/hover-card';

@Component({
  selector: 'app-customer',
  imports: [HoverCard],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
}