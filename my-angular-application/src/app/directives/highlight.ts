import {
  Directive,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

  @HostBinding('style.backgroundColor')
  backgroundColor = '';

  @HostBinding('style.color')
  color = '';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.backgroundColor = 'yellow';
    this.color = 'black';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.backgroundColor = '';
    this.color = '';
  }
}