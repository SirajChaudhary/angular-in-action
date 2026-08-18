import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;

  register(): void {
    console.log('Registration:', {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      acceptTerms: this.acceptTerms
    });
  }
}