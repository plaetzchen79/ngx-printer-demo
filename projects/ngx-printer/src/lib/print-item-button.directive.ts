import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NgxPrinterService } from './ngx-printer.service';
import { PrintItem } from './print-item';

/**
 * Directly add function to a button to print an item
 */
@Directive({
    selector: '[ngxPrintItemButton]',
    standalone: false
})
export class PrintItemButtonDirective implements OnInit {

  /**
   * Id of print item to be printed
   */
  @Input()
  printItemId = '';

  /**
   * html id of div to be printed
   */
  @Input()
  divID = '';

  /**
   * print item by class name
   */
  @Input()
  className = '';

  /**
   * print current window
   */
  @Input()
  printWindow = 'false';


  constructor(
    private el: ElementRef,
    private printerService: NgxPrinterService
  ) {}

  ngOnInit() {
    if (this.el.nativeElement && this.checkInputs()) {
        this.el.nativeElement.addEventListener('click', () => {
        if (this.printItemId !== '') {
          this.prinPrintItem();
        }
        if (this.divID !== '') {
          this.printerService.printDiv(this.divID);
        }
        if (this.className !== '') {
          this.printerService.printByClassName(this.className);
        }
        if (this.printWindow !== 'false') {
          this.printerService.printCurrentWindow();
        }
      });
    }
  }

  /**
   * Check if at least one property is set
   */
  private checkInputs() {
    const check = !(this.printWindow === 'false' && this.printItemId === '' && this.divID === '' && this.className === '');
    return check;
  }

  /**
   * print item from print items
   */
  private prinPrintItem() {
    const itemToPrint = this.printerService.getPrintItem(this.printItemId);
    if (itemToPrint) {
      this.printerService.printPrintItem(itemToPrint);
    }
  }
}
