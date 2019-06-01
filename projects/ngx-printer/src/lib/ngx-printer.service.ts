import { PrintItem } from './print-item';
import {
  Injectable,
  TemplateRef,
  ComponentFactoryResolver,
  Injector,
  Optional,
  Type
} from '@angular/core';
import { ComponentRef } from '@angular/core/src/render3';
import { NgxPrinterComponent } from './ngx-printer.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { PrintServiceConfig } from './print-service-config';

export type Content<T> = string | HTMLElement  | TemplateRef<T> | Type<T>;

/**
 * Main print service
 */
@Injectable({
  providedIn: 'root'
})
export class NgxPrinterService {
  private printWindowOpen = new BehaviorSubject<boolean>(false);

  private _printItems = new BehaviorSubject<PrintItem[]>([]);
  $printItems = this._printItems.asObservable();

  private openNgxPrinter: HTMLElement;

  /**
   * Wait time to render before open print dialog in ms
   * Default is 200
   */
  timeToWaitRender = 200;

  /**
   * Class used in component when printing to current window
   */
  renderClass = 'default';

  /**
   * Open new window to print or not
   * Default is true
   */
  printOpenWindow = true;

  $printWindowOpen = this.printWindowOpen.asObservable();

  constructor(
    @Optional() config: PrintServiceConfig,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    this.setRootConfigOptions(config);
  }

  /**
   * Set config from forRoot
   * @param config 
   */
  private setRootConfigOptions(config: PrintServiceConfig) {
    if (config) {
      if (config.printOpenWindow) {
        this.printOpenWindow = config.printOpenWindow;
      }
      if (config.timeToWaitRender) {
        this.timeToWaitRender = config.timeToWaitRender;
      }
      if (config.renderClass) {
        this.renderClass = config.renderClass;
      }
    }
  }

  /***
   * Print a div identified by its id
   */
  public printDiv(divID: string) {
    const divToPrint = document.getElementById(divID);

    if (divToPrint) {
      this.print(divToPrint, this.printOpenWindow);
    } else {
      console.log('div with id ${divID} not found..');
    }
  }

  /***
   * Print an Element identified by its className
   * Prints the first found
   */
  public printByClassName(className: string) {
    const elementToPrint = document.getElementsByClassName(className);

    if (elementToPrint && elementToPrint.length > 0) {
      this.print(<HTMLScriptElement>elementToPrint[0], this.printOpenWindow);
    } else {
      console.log('element with id ${className} not found..');
    }
  }

  /**
   * Print Angular TemplateRef or Component or String
   * @param contentToPrint
   */
  public printAngular(contentToPrint: any) {
    const nativeEl = this.createComponent(contentToPrint);

    this.print(nativeEl.nativeElement, this.printOpenWindow);
  }

  /**
   * Print single img
   */
  public printImg(imgSrc: string) {
    const compRef = this.createComponent(null, imgSrc);
    const openNewWindow = this.printOpenWindow;

    compRef.instance.completed.subscribe((val) => {
      compRef.hostView.detectChanges();
      console.log('completed:', val);
      this.print(compRef.location.nativeElement, openNewWindow);
    });
  }

  /**
   * Print native Element (HTML Element)
   * @param nativeElement
   */
  public printHTMLElement(nativeElement: HTMLElement) {
    this.print(nativeElement, this.printOpenWindow);
  }

  /**
   * Create and render component
   * @param contentToRender
   */
  private createComponent(contentToRender: any, imgSrc?: string): any {
    // this.viewContainerRef.clear();
    const factory = this.resolver.resolveComponentFactory(NgxPrinterComponent);
    let componentRef: any;

    if (contentToRender) {
      const ngContent = this.resolveNgContent(contentToRender);
      componentRef = factory.create(this.injector, ngContent); // this.viewContainerRef.createComponent(factory);
    } else {
      componentRef = factory.create(this.injector);
    }
    componentRef.instance.renderClass = this.renderClass;
    if (imgSrc) {
      componentRef.instance.imgSrc = imgSrc;
      return componentRef;
    }

    componentRef.hostView.detectChanges();
    return componentRef.location; // location is native element
  }

  /**
   * Main print function
   * @param printContent 
   */
  private 
  print(printContent: any, printOpenWindow: boolean) {
    if (printOpenWindow) {
      this.printInNewWindow(printContent);
    } else {
      const printContentClone = printContent.cloneNode(true);
      const nativeEl = this.createComponent(printContentClone).nativeElement;
      this.openNgxPrinter = nativeEl;
      document.body.appendChild(this.openNgxPrinter);
      this.printCurrentWindow();
    }
  }

  /**
   * Print using a new window / tab
   * @param divToPrint
   */
  private printInNewWindow(divToPrint: HTMLElement) {
    const printWindow = window.open('', 'PRINT');
    let title = document.title;

    printWindow.document.write('<HTML><HEAD><TITLE>' + title + '</TITLE></HEAD><BODY></BODY></HTML>');
    // printWindow.document.write(document.documentElement.innerHTML);

    const printWindowDoc = printWindow.document;
    printWindowDoc.body.style.margin = '0 0';
    printWindowDoc.body.appendChild(divToPrint);
    // printWindowDoc.body.innerHTML = divToPrint.outerHTML;
    setTimeout(() => this.printWindow(printWindow, printWindowDoc), this.timeToWaitRender);
  }

  /**
   * Print window in new tab
   */
  private printWindow(printWindow: Window, printWindowDoc: Document) {
    this.printWindowOpen.next(true);
    printWindowDoc.close(); // necessary for IE >= 10
    printWindow.focus(); // necessary for IE >= 10*/
    printWindow.print();
    console.log('close print window');
    printWindow.close();
    setTimeout(() =>  { printWindow.close(); this.printWindowOpen.next(false); }, 20);
  }

  /**
   * Print the whole current window
   */
  printCurrentWindow() {
    setTimeout(() => {
      this.printWindowOpen.next(true);
      window.print();
      document.body.removeChild(this.openNgxPrinter);
      this.printWindowOpen.next(false);
    }, this.timeToWaitRender);
  }

  private resolveNgContent<T>(content: Content<T>) {
    if (typeof content === 'string') {
      const element = document.createTextNode(content);
      return [[element]];
    }

    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(null);
      return [viewRef.rootNodes];
    }

    if (content instanceof HTMLElement) {
      return [[content]];
    }

    /** Otherwise it's a component */
    const factory = this.resolver.resolveComponentFactory(content);

    const componentRef = factory.create(this.injector);
    componentRef.changeDetectorRef.detectChanges();
    return [[componentRef.location.nativeElement]];
  }

  /**
   * Add a new item to print
   * @param newPrintItem  HTML id
   */
  public addPrintItem(newPrintItem: PrintItem): void {
    const tmpItems = this._printItems.getValue();
    tmpItems.push(newPrintItem);
    this._printItems.next(tmpItems);
  }

  /**
   * Delete a print item from service
   * @param idOfItemToRemove 
   */
  public removePrintItem(idOfItemToRemove: string): void {
    const tmpItems = this._printItems.getValue();
    const newIitems = tmpItems.filter(item => item.id !== idOfItemToRemove);
    this._printItems.next(newIitems);
  }

  /**
   * Print a print Item
   * @param printItemToPrint 
   */
  public printPrintItem(printItemToPrint: PrintItem): void {
    this.printHTMLElement(printItemToPrint.nativeElement);
  }

}
