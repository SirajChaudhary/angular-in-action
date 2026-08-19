import {
  Directive,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[appMouseTracker]'
})
export class MouseTracker {

  @Output()
  mouseStatus = new EventEmitter<string>();

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.mouseStatus.emit('Mouse entered the element');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.mouseStatus.emit('Mouse left the element');
  }
}