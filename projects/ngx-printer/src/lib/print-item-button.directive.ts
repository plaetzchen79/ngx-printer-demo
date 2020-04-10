import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NgxPrinterService } from './ngx-printer.service';
import { PrintItem } from './print-item';

/**
 * Directly add functio to a button to print an item
 */
@Directive({
  selector: '[ngxPrintItemButton]'
})
export class PrintItemButtonDirective implements OnInit {

  @Input()
  printItemId = '';

  constructor(
    private el: ElementRef,
    private printerService: NgxPrinterService
  ) {}

  ngOnInit() {
    if (this.el.nativeElement && this.printItemId !== '') {
        this.el.nativeElement.addEventListener('click', () => {
        const itemToPrint = this.printerService.getPrintItem(
          this.printItemId
        );

        if (itemToPrint) {
          this.printerService.printPrintItem(itemToPrint);
        }
      });
    }
  }
}
