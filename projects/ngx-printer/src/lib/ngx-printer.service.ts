import { PrintItem } from './print-item';
import {
  Injectable,
  TemplateRef,
  ComponentFactoryResolver,
  Injector,
  Optional,
  Type
} from '@angular/core';
import { NgxPrinterComponent } from './ngx-printer.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { PrintServiceConfig } from './print-service-config';

export type Content<T> = string | HTMLElement | TemplateRef<T> | Type<T>;

/**
 * Main print service
 */
@Injectable({
  providedIn: 'root'
})
export class NgxPrinterService {
  private printWindowOpen = new BehaviorSubject<boolean>(false);

  /**
   * @internal
   */
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
  eventadded = [];

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
  private setRootConfigOptions(config: PrintServiceConfig): void {
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
   * @example
   * this.printerService.printDiv('printDiv');
   */
  public printDiv(divID: string): void {
    const divToPrint = document.getElementById(divID);

    if (divToPrint) {
      this.print(divToPrint, this.printOpenWindow);
    } else {
      console.log('div with id ${divID} not found..');
    }
  }

  /***
   * Print an Element identified by its className using getElementsByClassName
   * Prints the first one found
   */
  public printByClassName(className: string): void {
    const elementToPrint = document.getElementsByClassName(className);

    if (elementToPrint && elementToPrint.length > 0) {
      this.print(<HTMLScriptElement>elementToPrint[0], this.printOpenWindow);
    } else {
      console.log('element with id ${className} not found..');
    }
  }

  /**
   * Print Angular TemplateRef or a Component or String
   * @param contentToPrint
   * @example
   * this.printerService.printAngular(this.PrintTemplateTpl);
   */
  public printAngular(contentToPrint: any): void {
    const nativeEl = this.createComponent(contentToPrint);

    this.print(nativeEl.nativeElement, this.printOpenWindow);
  }

  /**
   * Print single img
   * @example
   * this.printerService.printImg('assets/bratwurst.jpg');
   */
  public printImg(imgSrc: string): void {
    const compRef = this.createComponent(null, imgSrc);
    const openNewWindow = this.printOpenWindow;

    compRef.instance.completed.subscribe(val => {
      compRef.hostView.detectChanges();
      console.log('completed:', val);
      this.print(compRef.location.nativeElement, openNewWindow);
    });
  }

  /**
   * Print an native Element (HTML Element)
   * @param nativeElement
   * @example
   * this.printerService.printHTMLElement(this.PrintComponent.nativeElement);
   */
  public printHTMLElement(nativeElement: HTMLElement): void {
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
  private print(printContent: any, printOpenWindow: boolean): void {
    if (printOpenWindow === true) {
      const printContentClone = printContent.cloneNode(true);
      this.printInNewWindow(printContentClone);
    }
    if (printOpenWindow === false) {
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
  private printInNewWindow(divToPrint: HTMLElement): void {
    const printWindow = window.open('', 'PRINT');
    let title = document.title;

    printWindow.document.write(
      '<HTML><HEAD><TITLE>' + title + '</TITLE></HEAD><BODY></BODY></HTML>'
    );
    // printWindow.document.write(document.documentElement.innerHTML);

    const printWindowDoc = printWindow.document;
    printWindowDoc.body.style.margin = '0 0';
    printWindowDoc.body.appendChild(divToPrint);
    printWindow.document.close();
    // printWindowDoc.body.innerHTML = divToPrint.outerHTML;
    setTimeout(
      () => this.printTabWindow(printWindow, printWindowDoc),
      this.timeToWaitRender
    );
  }

  /**
   * Print window in new tab
   */
  private printTabWindow(printWindow: Window, printWindowDoc: Document): void {
    this.registerPrintEvent(printWindow, true);
    this.printWindowOpen.next(true);
    printWindow.focus(); // necessary for IE >= 10*/
    if (printWindowDoc.execCommand('print') === false) {
      printWindow.print();
    }
  }

  /**
   * Print the whole current window
   */
  public printCurrentWindow(): void {
    this.registerPrintEvent(window, false);
    setTimeout(() => {
      this.printWindowOpen.next(true);
      if (document.execCommand('print') === false) {
        window.print();
      }
    }, this.timeToWaitRender);
  }

  /**
   * Listen to print event of window
   * @param printWindow
   */
  private registerPrintEvent(printWindow: Window, printWithOpenInNewWindow: boolean) {
    const that = this;
    printWindow.focus(); // necessary for IE >= 10*/

    if (that.eventadded[printWindow.name]) {
      return;
    }
    printWindow.addEventListener('afterprint', () => {
      this.eventadded[printWindow.name] = true;
      // console.log('afterprint');
      if (printWithOpenInNewWindow) {
        that.eventadded[printWindow.name] = false;
      }
      that.cleanUp(printWindow, printWithOpenInNewWindow);
      that.printWindowOpen.next(false);
    });

/*
  let mediaQueryList: MediaQueryList = null; 

  if (window.matchMedia) {
      mediaQueryList = printWindow.matchMedia('print') as MediaQueryList;
        this.eventadded[printWindow.name] = true;
        mediaQueryList.addListener(function(mql) {
          console.log(mql);
          if (mql.matches) {
            console.log('webkit equivalent of onbeforeprint');
          }
          if (!mql.matches) {
            console.log('webkit equivalent of afterprint');
            if (printWithOpenInNewWindow) {
              that.eventadded[printWindow.name] = false;
            }
            that.cleanUp(printWindow, printWithOpenInNewWindow);
            that.printWindowOpen.next(false);
          }
        });
      } */
  }

  /**
   * Close tab or clean up dom
   * @internal
   */
  private cleanUp(printWindow: Window, printOpenWindow: boolean): void {
    if (printOpenWindow === true) {
      console.log('close print window');
      printWindow.close();
      setTimeout(() => {
        printWindow.close();
      }, 20);
    }
    if (printOpenWindow === false) {
        if (!this.openNgxPrinter) {
          return;
        }
        if (document.body.getElementsByTagName('ngx-printer').length === 0) {
          return;
        }
        document.body.removeChild(this.openNgxPrinter);
        this.openNgxPrinter = null;
    }
  }

  /**
   * Create node or angular component
   * @param content
   * @internal
   */
  private resolveNgContent<T>(content: Content<T>): any {
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
   * Used by directive
   * @internal
   * @param newPrintItem  HTML id
   */
  public addPrintItem(newPrintItem: PrintItem): void {
    const tmpItems = this._printItems.getValue();
    tmpItems.push(newPrintItem);
    this._printItems.next(tmpItems);
  }

  /**
   * Delete a print item from service
   * Used by directive
   * @internal
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
