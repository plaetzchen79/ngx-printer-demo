import { PrintItem } from './print-item';
import {
  Injectable,
  TemplateRef,
  Renderer2,
  ComponentFactoryResolver,
  ViewContainerRef,
  Injector,
  ElementRef,
  Optional,
  Type
} from '@angular/core';
import { ComponentRef } from '@angular/core/src/render3';
import { NgxPrinterComponent } from './ngx-printer.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { PrintServiceConfig } from './print-service-config';

export type Content<T> = string | HTMLElement  | TemplateRef<T> | Type<T>;

@Injectable({
  providedIn: 'root'
})
export class NgxPrinterService {
  private printWindowOpen = new BehaviorSubject<boolean>(false);

  private _printItems = new BehaviorSubject<PrintItem[]>([]);
  $printItems = this._printItems.asObservable();

  private openNgxPrinter: HTMLElement;

  templateRef: TemplateRef<any>;
  componentRef: ComponentRef<any>;
  viewContainerRef: ViewContainerRef;
  dynamicElementRef: ElementRef;

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
      this.print(divToPrint);
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
      this.print(<HTMLScriptElement>elementToPrint[0]);
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

    this.print(nativeEl.nativeElement);
  }

  /**
   * Print native Element (HTML Element)
   * @param nativeElement
   */
  public printHTMLElement(nativeElement: HTMLElement) {
    this.print(nativeElement);
  }

  /**
   * Create and render component
   * @param contentToRender
   */
  private createComponent(contentToRender: any): any {
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
    componentRef.hostView.detectChanges();

    return componentRef.location; // location is native element
  }

  /**
   *
   * @param printContent Main print function
   */
  private print(printContent: any) {
    if (this.printOpenWindow) {
      this.printInNewWindow(printContent);
    } else {
      const nativeEl = this.createComponent(printContent).nativeElement;
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
    printWindow.document.write(document.documentElement.innerHTML);

    const printWindowDoc = printWindow.document;

    setTimeout(() => {
      this.printWindowOpen.next(true);
      printWindowDoc.body.style.margin = '0 0';
      printWindowDoc.body.innerHTML = divToPrint.outerHTML;
      printWindowDoc.close(); // necessary for IE >= 10
      printWindow.focus(); // necessary for IE >= 10*/
      printWindow.print();
      this.printWindowOpen.next(false);
      console.log('close print window');
      printWindow.close();
    }, this.timeToWaitRender);
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
