import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxPrinterModule, ngxPrintMarkerPosition } from 'projects/ngx-printer/src/public_api';
import { LittleDummyComponent } from './little-dummy/little-dummy.component';

@NgModule({
  declarations: [
    AppComponent,
    LittleDummyComponent
  ],
  imports: [
    BrowserModule,
    NgxPrinterModule.forRoot({printOpenWindow: true})
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
