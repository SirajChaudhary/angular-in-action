import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-customer-details',
  imports: [],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css'
})
export class CustomerDetails {

  @Input()
  name = '';

  @Output()
  selected = new EventEmitter<string>();

  selectCustomer(): void {
    this.selected.emit(this.name);
  }
}