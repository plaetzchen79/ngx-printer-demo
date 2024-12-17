import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { NgxPrinterService } from './ngx-printer.service';
import { PrintItem } from './print-item';

/**
 * A directive to mark and store an HTML-Element as an item which
 * can be printed
 * An id has to be set
 */
@Directive({
    selector: '[ngxPrintItem]',
    standalone: false
})
export class PrintItemDirective implements OnInit, OnDestroy {

  /**
   * Optional name to be shown in an component
   */
  @Input()
  printName: string;

  constructor(private el: ElementRef, private printerService: NgxPrinterService) {
  }

  ngOnInit() {
    if (this.el.nativeElement.id) {
      const tmpPrintItem = new PrintItem();
      tmpPrintItem.id = this.el.nativeElement.id;
      tmpPrintItem.nativeElement = this.el.nativeElement;

      this.printerService.addPrintItem(tmpPrintItem);
    }
  }

  ngOnDestroy() {
    if (this.el.nativeElement.id) {
      this.printerService.removePrintItem( this.el.nativeElement.id);
    }
  }

}
