import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCard } from './customer-card';

describe('CustomerCard', () => {
  let component: CustomerCard;
  let fixture: ComponentFixture<CustomerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
