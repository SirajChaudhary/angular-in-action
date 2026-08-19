import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer';
import { Customer as CustomerModel } from '../models/customer';

@Component({
  selector: 'app-customer',
  imports: [FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer {

  private customerService = inject(CustomerService);

  customers: CustomerModel[] = [];

  selectedCustomer: CustomerModel | null = null;

  customerId = 1;

  newCustomer = {
    name: '',
    email: '',
    phone: '',
    city: ''
  };

  updateForm: CustomerModel = {
    id: 1,
    name: '',
    email: '',
    phone: '',
    city: ''
  };

  patchId = 1;
  patchEmail = '';

  deleteId = 1;

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: (error) => {
        console.error('Failed to load customers:', error);
      }
    });
  }

  loadCustomerById(): void {
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        this.selectedCustomer = customer;
      },
      error: (error) => {
        console.error('Failed to load customer:', error);
      }
    });
  }

  createCustomer(): void {
    this.customerService.createCustomer(this.newCustomer).subscribe({
      next: (customer) => {
        console.log('Created customer:', customer);
        this.newCustomer = {
          name: '',
          email: '',
          phone: '',
          city: ''
        };
        this.loadCustomers();
      },
      error: (error) => {
        console.error('Failed to create customer:', error);
      }
    });
  }

  updateCustomer(): void {
    this.customerService.updateCustomer(this.updateForm).subscribe({
      next: (customer) => {
        console.log('Updated customer:', customer);
        this.loadCustomers();
      },
      error: (error) => {
        console.error('Failed to update customer:', error);
      }
    });
  }

  patchCustomer(): void {
    this.customerService.patchCustomer(
      this.patchId,
      { email: this.patchEmail }
    ).subscribe({
      next: (customer) => {
        console.log('Patched customer:', customer);
        this.loadCustomers();
      },
      error: (error) => {
        console.error('Failed to patch customer:', error);
      }
    });
  }

  deleteCustomer(): void {
    this.customerService.deleteCustomer(this.deleteId).subscribe({
      next: () => {
        console.log('Customer deleted successfully.');
        this.loadCustomers();
      },
      error: (error) => {
        console.error('Failed to delete customer:', error);
      }
    });
  }

  checkCustomer(): void {
    this.customerService.checkCustomer(this.customerId).subscribe({
      next: () => {
        console.log('Customer resource exists.');
      },
      error: (error) => {
        console.error('HEAD request failed:', error);
      }
    });
  }

  getCustomerOptions(): void {
    this.customerService.getCustomerOptions().subscribe({
      next: (response) => {
        console.log('OPTIONS response:', response);
      },
      error: (error) => {
        console.error('OPTIONS request failed:', error);
      }
    });
  }
}