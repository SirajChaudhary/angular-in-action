import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  imports: [FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {
  name = 'Siraj';
  email = 'siraj@example.com';

  isDisabled = true;

  imageUrl = 'http://www.sirajchaudhary.com/assets/img/sirajchaudhary.jpg';

  columnSpan = 2;

  selectCustomer(): void {
    console.log('Customer selected:', this.name);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    console.log('Input value:', input.value);
  }
}