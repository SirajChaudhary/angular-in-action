import {
  Directive,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[appCardStyle]'
})
export class CardStyle {

  @HostBinding('style.border')
  border = '2px solid steelblue';

  @HostBinding('style.padding')
  padding = '20px';

  @HostBinding('style.borderRadius')
  borderRadius = '8px';

  @HostBinding('style.backgroundColor')
  backgroundColor = '#f5f9ff';
}