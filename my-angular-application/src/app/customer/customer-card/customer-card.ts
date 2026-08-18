import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-customer-card',
  imports: [],
  templateUrl: './customer-card.html',
  styleUrl: './customer-card.css'
})
export class CustomerCard {
  name = input<string>('');
  email = input<string>('');

  customerSelected = output<string>();

  selectCustomer(): void {
    this.customerSelected.emit(this.name());
  }
}