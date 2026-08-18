import { Component, signal } from '@angular/core';
import { CustomerProfile } from './customer-profile/customer-profile';

@Component({
  selector: 'app-root',
  imports: [CustomerProfile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-application');
}