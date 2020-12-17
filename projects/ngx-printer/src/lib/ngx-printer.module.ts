import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxPrinterComponent } from './ngx-printer.component';
import { PrintServiceConfig } from './print-service-config';
import { PrintItemDirective } from './print-item.directive';
import { PrintItemButtonDirective } from './print-item-button.directive';
import { PrintItemMarkerDirective } from './print-item-marker.directive';
import { NoPrintDirective } from './no-print.directive';

@NgModule({
  declarations: [NgxPrinterComponent, PrintItemDirective, PrintItemButtonDirective, PrintItemMarkerDirective, NoPrintDirective],
  imports: [],
  exports: [NgxPrinterComponent, PrintItemDirective, PrintItemButtonDirective, PrintItemMarkerDirective, NoPrintDirective],
  entryComponents: [NgxPrinterComponent]
})
export class NgxPrinterModule {
  static forRoot(config: PrintServiceConfig): ModuleWithProviders<NgxPrinterModule> {
    return {
      ngModule: NgxPrinterModule,
      providers: [{ provide: PrintServiceConfig, useValue: config }]
    };
  }
}
