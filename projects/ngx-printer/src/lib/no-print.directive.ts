import { Directive, ElementRef, Renderer2 } from '@angular/core';

/**
 * Directive to mark an element so that it should NOT be printed
 */
@Directive({
    selector: '[ngxNoPrint]',
    standalone: false
})
export class NoPrintDirective {

  constructor(private el: ElementRef, private renderer2: Renderer2) {
    if (this.el) {
      this.renderer2.addClass(this.el.nativeElement, 'no_print_indicator');
    }
   }
}
