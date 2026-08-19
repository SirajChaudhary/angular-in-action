import {
  Directive,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appHoverCard]'
})
export class HoverCard {

  @HostBinding('style.backgroundColor')
  backgroundColor = '#f5f5f5';

  @HostBinding('style.padding')
  padding = '20px';

  @HostBinding('style.border')
  border = '1px solid #999';

  @HostBinding('style.borderRadius')
  borderRadius = '8px';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.backgroundColor = '#fff3cd';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.backgroundColor = '#f5f5f5';
  }
}