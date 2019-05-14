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

export type Content<T> = string | TemplateRef<T> | Type<T>;

@Injectable({
  providedIn: 'root'
})
export class NgxPrinterService {
  templateRef: TemplateRef<any>;
  componentRef: ComponentRef<any>;
  viewContainerRef: ViewContainerRef;
  dynamicElementRef: ElementRef;

  printOpenWindow = true;

  printWindowOpen = new BehaviorSubject<boolean>(false);
  $printWindowOpen = this.printWindowOpen.asObservable();

  constructor(
    @Optional() config: PrintServiceConfig,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    if (config) {
      this.printOpenWindow = config.printOpenWindow;
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
   * Prints the firt found
   */
  public printByClassName(className: string) {
    const elementToPrint = document.getElementsByClassName(className);

    if (elementToPrint && elementToPrint.length > 0) {
      this.print(<HTMLScriptElement>elementToPrint[0]);
    } else {
      console.log('element with id ${divID} not found..');
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
      document.body.appendChild(printContent);
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
    }, 1000);
  }

  /**
   * Print the whole current window
   */
  printCurrentWindow() {
    setTimeout(function() {
      this.printWindowOpen.next(true);
      window.print();
      window.close();
      this.printWindowOpen.next(false);
    }, 1000);
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

    /** Otherwise it's a component */
    const factory = this.resolver.resolveComponentFactory(content);

    const componentRef = factory.create(this.injector);
    componentRef.changeDetectorRef.detectChanges();
    return [[componentRef.location.nativeElement]];
  }
}
