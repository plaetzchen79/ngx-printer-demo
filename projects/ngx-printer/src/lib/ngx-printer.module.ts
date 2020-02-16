import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxPrinterComponent } from './ngx-printer.component';
import { PrintServiceConfig } from './print-service-config';
import { PrintItemDirective } from './print-item.directive';

@NgModule({
  declarations: [NgxPrinterComponent, PrintItemDirective],
  imports: [],
  exports: [NgxPrinterComponent, PrintItemDirective],
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
