import { NgxPrinterService } from './../../projects/ngx-printer/src/lib/ngx-printer.service';
import {
  Component,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ElementRef
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { LittleDummyComponent } from './little-dummy/little-dummy.component';
import { PrintItem } from 'projects/ngx-printer/src/lib/print-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('PrintTemplate')
  private PrintTemplateTpl: TemplateRef<any>;

  @ViewChild(LittleDummyComponent, {read: ElementRef})
  PrintComponent: ElementRef;

  title = 'ngx-printer-demo';

  printWindowSubscription: Subscription;
  $printItems: Observable<PrintItem[]>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private printerService: NgxPrinterService
  ) {
    this.printerService.viewContainerRef = this.viewContainerRef;

    this.printWindowSubscription = this.printerService.$printWindowOpen.subscribe(val => {
      console.log('Print window is open:', val);
    });

    this.$printItems = this.printerService.$printItems;
  }


  printDiv() {
    this.printerService.printDiv('printDiv');
  }

  printTemplate() {
    this.printerService.printAngular(this.PrintTemplateTpl);
  }

  printComponent() {
    this.printerService.printDiv('printDiv');
  }

  printItem(itemToPrint: PrintItem) {
    this.printerService.printPrintItem(itemToPrint);
  }

  printDivToCurrent() {
    this.printerService.printOpenWindow = true;
    this.printerService.printDiv('printDiv');
    this.printerService.printOpenWindow = false;
  }

  printHTMLElementToCurrent() {
    this.printerService.printOpenWindow = true;
    this.printerService.printHTMLElement(this.PrintComponent.nativeElement);
    this.printerService.printOpenWindow = false;
  }


  createComp() {
   //  this.printerService();
  }
}
