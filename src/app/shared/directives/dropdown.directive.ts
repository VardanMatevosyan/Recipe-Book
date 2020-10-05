import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elemRef: ElementRef) { }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event): void {
    this.isOpen = this.elemRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
