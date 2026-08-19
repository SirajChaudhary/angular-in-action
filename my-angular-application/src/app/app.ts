import { Component } from '@angular/core';
import { Customer } from './customer/customer';

@Component({
  selector: 'app-root',
  imports: [Customer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}