import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Customer {

  getCustomerName(): string {

    return 'Siraj';

  }

}