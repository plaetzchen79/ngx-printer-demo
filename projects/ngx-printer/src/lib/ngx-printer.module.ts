import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxPrinterComponent } from './ngx-printer.component';
import { PrintServiceConfig } from './print-service-config';

@NgModule({
  declarations: [NgxPrinterComponent],
  imports: [
  ],
  exports: [NgxPrinterComponent],
  entryComponents: [NgxPrinterComponent]
})
export class NgxPrinterModule { 
  static forRoot(config: PrintServiceConfig): ModuleWithProviders {
    return {
      ngModule: NgxPrinterModule,
      providers: [
        {provide: PrintServiceConfig, useValue: config }
      ]
    };
  }
}
