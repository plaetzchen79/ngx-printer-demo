import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxPrinterComponent } from './ngx-printer.component';
import { PrintServiceConfig } from './print-service-config';
import { PrintItemDirective } from './print-item.directive';
import { PrintItemButtonDirective } from './print-item-button.directive';

@NgModule({
  declarations: [NgxPrinterComponent, PrintItemDirective, PrintItemButtonDirective],
  imports: [],
  exports: [NgxPrinterComponent, PrintItemDirective, PrintItemButtonDirective],
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
