import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  Customer
} from './customer';

describe('Customer', () => {

  let component: Customer;

  let fixture:
    ComponentFixture<Customer>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [Customer]
    }).compileComponents();

    fixture =
      TestBed.createComponent(Customer);

    component =
      fixture.componentInstance;

    await fixture.whenStable();

  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();

  });

  it('should have the correct customer name', () => {

    expect(component.customerName).toBe('Siraj');
  });

  it('should display the customer name', () => {

    const element = fixture.nativeElement as HTMLElement;
    
    expect(element.textContent).toContain('Siraj');
    
  });

});