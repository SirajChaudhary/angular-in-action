import {
  Component
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {

  firstName = '';

  lastName = '';

  email = '';

  password = '';

  register(): void {

    console.log({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });

  }

}