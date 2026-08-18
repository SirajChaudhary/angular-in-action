import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfile } from './customer-profile';

describe('CustomerProfile', () => {
  let component: CustomerProfile;
  let fixture: ComponentFixture<CustomerProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
